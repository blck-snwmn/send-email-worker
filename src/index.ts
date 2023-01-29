export interface Env {
  FROM: string
  TO: string
}
export default {
  async fetch(request: Request, env: Env) {
    const req = new Request('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: env.TO, name: 'Test Recipient' }],
          },
        ],
        from: {
          email: env.FROM,
          name: 'Workers - MailChannels integration',
        },
        subject: 'Look! No servers',
        content: [
          {
            type: 'text/plain',
            value: 'And no email service accounts and all for free too!',
          },
        ],
      }),
    })
    const resp = await fetch(req)
    const body = await resp.text()
    console.log(body)
    return new Response("Hello world")
  }
}