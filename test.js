const apiEndpoint = 'http://localhost:2137/authorize'
/*const commandData = {
login:"test",
pass:"uku",
email:"test@test.pl",
publickey:"js"
}
*/
const commandData = {
  token:"yjPLUyX6jdJWu3CcNu3nlaAAxAAsldw1MooJGzPBwYQhR2VLzUko80ip7yVK3eW6oC24v5mZ5enmJQmdiu93oGjhKaOxwWtD3H5VhV1c8WiUmSUoA0bA2LrlYqScgE2T",
  utoken:"ugpMZNwOxtCEJVgc2HDAzLZ9QLVgaEtHfESoDdpo5Tv795w5XQde9cmtjYgR9iJT9Bde24DHIjgKe81wrxh27LJAa2vDCL0OhsWGtkWQm8IWV6vK5lVV7mBOtNV3QbWj",
  uid:0,
  sid:3
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
  /*
  console.log(json.session.id)
  console.log(json.session.uid)
  console.log(json.session.token)
  */
}
main()