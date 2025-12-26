

import rawConfig from '../joinchannel.config.json' with { type: 'json' } 

const config: JoinChannelConfig = rawConfig

interface JoinChannelConfig {
  channel_id: string;
  title: string;
  body: string;
  confirmationMessage: string;
  actionButtonCaption: string;
  approvalMessage: {
  channel: string;
  text: string;
  approveButtonCaption: string;
  deleteButtonCaption: string;
  };
}

export type EnvT = {SLACK_SINGING_SECRET: string, SLACK_XOXB_TOKEN: string, HCA_CLIENT_ID: string, HCA_CLIENT_SECRET: string, HCA_REDIRECT_URI: string }


export default config