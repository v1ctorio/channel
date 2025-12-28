//TODO: Remove all logs and unnecessary stream reads

const Headers = (t: string) => ({
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": `Bearer ${t}`
})


async function slackPOSTRequest(endpoint:string, payload: object, xoxb: string) {
  const body = JSON.stringify(payload)
  const headers = Headers(xoxb)
  const URL = endpoint.startsWith("https") ? endpoint : `https://slack.com/api/${endpoint}`

  const res = await fetch(URL, {
    headers,
    body,
    method: "POST"
  })

  const data = await res.json()

  if (!data.ok) {
    console.errror(data)
    return false
  }

  console.log(data)
  return data
  
}

export async function unfurlById(unfurl_id: string, source: 'conversations_history' | 'composer', urlToUnfurl: string, {mrkdwn, buttonCaption}: {buttonCaption: string, mrkdwn: string }, xoxb: string) {
  
  const body={
      unfurl_id,
      source,
      user_auth_required: false,
      unfurls: {
        [urlToUnfurl]: {
          blocks:[
                            {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": mrkdwn
                    },
                  },
                  {
                    "type": 'actions',
                    "elements": [
                      {
                        "type":"button",
                        "action_id": "the-click-button",
                        "text": {
                          "type": "plain_text",
                          "text": buttonCaption
                        },
                        style: "primary"
                      }
                    ]
                  }
          ]
        }
      }
    }  
  const _res = await slackPOSTRequest('https://slack.com/api/chat.unfurl',body, xoxb)
  console.info("unfurled, ", _res)
      

}


export async function replyInteractionEphemeral(response_url: string, text: string, xoxb: string) {
    const body = {
        text
    }

    const _res = await slackPOSTRequest(response_url, body, xoxb)
}


export async function postMessage(channel:string, content: string | object, xoxb: string): Promise<string> {
    const body = {
        blocks: typeof content == "object" ? content : undefined,
        markdown_text: typeof content == "string" ? content : undefined,
        channel
    }

    const j = await slackPOSTRequest("chat.postMessage", body, xoxb)

    return j["channel"] ? j["channel"] : ""
}

export async function inviteUser(channel:string, user: string, xoxb: string): Promise<boolean> {
  console.log(`Adding ${user} to ${channel}`)
  const body = {
    channel,
    users: user
  }
  
  const res = await slackPOSTRequest("conversations.invite", body, xoxb)

  return res.ok as boolean

}

export async function deleteMessage(channel:string, message_ts: string, xoxb: string) {
  const body = {
    channel,
    ts: message_ts
  }

  await slackPOSTRequest('chat.delete', body, xoxb)

  console.log("Tried to delete ", message_ts)
}
// here the channel ID for some reason can't be an user id AAAAAAA // nvm ts didn't end up being that annoying
export async function updateMessage(channel:string, message_ts:string,content: object | string, xoxb: string) {

  const body = {
    channel,
    ts: message_ts,
    blocks: typeof content == 'object' ? content : undefined,
    markdown_text: typeof content == 'string' ? content : undefined
  }

  return await slackPOSTRequest("chat.update", body, xoxb)

  
}
