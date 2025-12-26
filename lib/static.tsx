
import type { FC } from 'hono/jsx'
import { Hono } from "hono";
import { serveStatic } from "hono/serve-static"

const router = new Hono();

const slackButton: FC = (props) => {
    return (<button>Log in with Slack</button>)
}



router.use("*", serveStatic({root: "../assets"}))