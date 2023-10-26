var CryptoJS = require("crypto-js");
// require("dotenv").config();

async function okx() {


  const SecretKey = ""
  const apiKey = ""
  const passphrase = ""

  // sig = 
  const timestamp = new Date().toISOString()

  const url = 'https://www.okx.com/api/v5/dex/aggregator/all-tokens?chainId=1'
  const requestPath = "/api/v5/dex/aggregator/all-tokens?chainId=1"
  // url = 'https://www.okx.com/api/v5/dex/aggregator/approve-transaction?chainId=1&tokenContractAddress=0x6f9ffea7370310cd0f890dfde5e0e061059dcfd9&approveAmount=1000000'
  // requestPath = '/api/v5/dex/aggregator/approve-transaction?chainId=1&tokenContractAddress=0x6f9ffea7370310cd0f890dfde5e0e061059dcfd9&approveAmount=1000000'

  const sign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp + 'GET' + requestPath, SecretKey))
  console.log(sign, "signature");

  fetch(url, {
    method: 'GET',
    headers: {
      "OK-ACCESS-KEY": apiKey,
      "OK-ACCESS-SIGN": sign,
      "OK-ACCESS-TIMESTAMP": timestamp,
      "OK-ACCESS-PASSPHRASE": passphrase
    }
  })
    .then((response) => response.json())
    .then((json) => console.log("result ..........", json));

  //   console.log(new Date().toISOString());



}

export default okx
