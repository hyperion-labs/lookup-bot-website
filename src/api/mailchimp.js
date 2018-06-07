// variables
const mailchimpApiKey = process.env.MAILCHIMP_API;

// libraries
const axios = require('axios');

/* Mailchimp ==================================================================== */
const apiUrl = 'https://us18.api.mailchimp.com/3.0/lists/2736d9fccb/members/';

const subscribe = (email) => {
  const request = axios.post(apiUrl, {
    email_address: email,
    status: 'subscribed',
  }, {
    headers: {
      Authorization: `apikey ${mailchimpApiKey}`,
    },
  });
  return request;
};

module.exports = {
  subscribe,
};

