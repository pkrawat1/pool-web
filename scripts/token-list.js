"use strict";

const fs = require("fs");
const https = require('https')

const url = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/tokenlist.json";

https.get(url, res => {
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    data = JSON.parse(data);
    const tokenList = data.tokens.reduce((acc, token) => {
      acc[token.address.toLowerCase()] = token.address;
      return acc;
    }, {});
    console.log(tokenList);
    fs.writeFileSync("./lib/token-list.json", JSON.stringify(tokenList));
  })
}).on('error', err => {
  console.log(err.message);
});
