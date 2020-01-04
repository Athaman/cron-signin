'use strict';

const fetch = require('node-fetch');

module.exports.checkin = async event => {
  // sign into flying lines 
  // base url
  const baseUrl = 'https://www.flying-lines.com';
  const loginPath = '/user/login';
  const checkinPath = '/score/signIn'
  const query = '?accessToken=';

  let url = baseUrl + loginPath;

  const user = {
    email: 'keonemartin@gmail.com',
    password: 'whargarbl'
  }

  const login = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  const response = await login.json();
  const data = response.data;
  const accessToken = data.accessToken;

  // poll the checkin endpoint using the accesstoken as a query string param
  url = baseUrl + checkinPath + query + accessToken;

  const checkin = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: null
  });

  console.log(await checkin.json());


  return {
    statusCode: 200
  };

};
