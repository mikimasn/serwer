const apiEndpoint = 'http://localhost:2137/login'
const commandData = {
login:"aha",
pass:"uku",
email:"srak@aha.pl"
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