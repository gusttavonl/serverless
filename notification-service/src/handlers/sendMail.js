import AWS from 'aws-sdk';

const ses = new AWS.SES({ region: 'sa-east-1' });

async function sendMail(event, context) {
  const params = {
    Source: 'gustavonoronha0@hotmail.com',
    Destination: {
      ToAddresses: ['gustavonoronha0@hotmail.com'],
    },
    Message: {
      Body: {
        Text: {
          Data: 'Hello from Gustavo Noronha!',
        },
      },
      Subject: {
        Data: 'Test Mail',
      },
    },
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export const handler = sendMail;