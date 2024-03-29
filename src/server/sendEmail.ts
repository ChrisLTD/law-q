import type Mail from 'nodemailer/lib/mailer'
export async function sendEmail(options: Mail.Options) {
  if (!options.html)
    options.html = `
<html>
<body dir="rtl">
<div >
${options.text
  ?.toString()
  .split('\n')
  .map((x) => `<div>${x}</div>`)
  .join('\n')}
  </div>
  </body>
  </html>
  `
  //options.to = 'noam.honig@gmail.com'
  //options.bcc = 'noam.honig@gmail.com'
  const { createTransport } = await import('nodemailer')
  const user = process.env['EMAIL_ADDRESS']
  const host = process.env['EMAIL_SERVER']
  const pass = process.env['EMAIL_PASSWORD']
  if (!user) {
    const message = 'email user not defined'
    console.log(message)
    return message
  }
  if (!options.from) options.from = `לשכת עורכי הדין  <${user}>`
  const connectionOptions = !host
    ? {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user,
          pass,
        },
      }
    : {
        host,
        port: 25,
        secure: false,
        auth: {
          user,
          pass,
        },
      }
  const transport = createTransport(connectionOptions)
  try {
    return await new Promise<string>((res) => {
      transport.sendMail(options, (error, info) => {
        if (error) res(error.message)
        else if (info.response.includes(' OK ')) res('OK')
        else res(info.response)
        console.log({ error, info })
      })
    })
  } finally {
    transport.close()
  }
}
