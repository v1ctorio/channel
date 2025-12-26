import "@std/dotenv/load"
import { Hono } from 'hono'
import slack from './lib/slack/router.ts'
import auth from './lib/auth.tsx'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!') 
})



app.route('/slack', slack)
app.route('/auth', auth)


Deno.serve(app.fetch)
