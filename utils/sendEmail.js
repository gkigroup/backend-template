const axios = require('axios');

const obj = {
  subject: 'SendGrid Template Demo',
  heading: 'Welcome',
  description: 'Hello World',
  image:
    'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1225&q=80',
};

let htmlTemplate = `
        <!DOCTYPE html>
          <html>
            <body>
              <h1>${obj.heading}</h1>
              <a href="default.asp">
                <img src=${obj.image} alt="HTML tutorial" style="width:200px;height:200px;border:0">
              </a>
              <p>${obj.description}</p>
            </body>
          </html>
`;

const sendEmail = (name, email) => {
  axios({
    method: 'post',
    url: 'https://api.sendgrid.com/v3/mail/send',
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    },
    data: {
      personalizations: [
        {
          to: [
            {
              email,
              name,
            },
          ],
          subject: `${obj.subject}`,
        },
      ],
      from: {
        email: 'support@cozyflow.com',
        name: 'GKI Group',
      },
      // content: [{ type: 'text/html', value: htmlTemplate }],
      template_id: process.env.TEMPLATE_ID,
    },
  }).then(
    (response) => console.log('Email Sent Succussfully'),
    (error) => console.log('Error while sending email')
  );
};

module.exports = sendEmail;
