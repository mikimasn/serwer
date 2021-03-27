const apiEndpoint = 'http://localhost:2137/authorize'
/*const commandData = {
login:"test",
pass:"uku",
email:"test@test.pl",
publickey:"js"
}
*/
const commandData = {
  token:"TchEDS6v5wFo29GQ51DltD5IOezRGY0n4vRT7gMjLDva6QraGVcmnp46vM0VLZ3Zjphu3FaZYjGbi4mtr16wYbcGMfogEctHDf91gpEfNoVihjbrDLZCMaUXAtmVGYlL",
  utoken:"ugpMZNwOxtCEJVgc2HDAzLZ9QLVgaEtHfESoDdpo5Tv795w5XQde9cmtjYgR9iJT9Bde24DHIjgKe81wrxh27LJAa2vDCL0OhsWGtkWQm8IWV6vK5lVV7mBOtNV3QbWj",
  uid:6,
  sid:16
  }
async function main (num) {
  const fetch = require('node-fetch')
  

  const response = await fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(commandData),
    headers: {
      "content-type": "application/json",
    }
  })
  const json = await response.json()
  console.log(json)
}
main()