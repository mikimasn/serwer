const apiEndpoint = 'http://localhost:2137/authorize'
/*const commandData = {
login:"test",
pass:"uku",
email:"test@test.pl",
publickey:"js"
}
*/
const commandData = {
  token:"kMmi5zDNNhJiygWJRi1OFrMmxaLiwXF8bz2WSAWAvdFSpZSy8nYDXcodHNJdKDnEYXBgE85DPytS9ZnKklofhlVOlbPAPrBggMSynsWrvxpT5UQrM364Ir1zW4z2ammQ",
  utoken:"ugpMZNwOxtCEJVgc2HDAzLZ9QLVgaEtHfESoDdpo5Tv795w5XQde9cmtjYgR9iJT9Bde24DHIjgKe81wrxh27LJAa2vDCL0OhsWGtkWQm8IWV6vK5lVV7mBOtNV3QbWj",
  uid:6,
  sid:8
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