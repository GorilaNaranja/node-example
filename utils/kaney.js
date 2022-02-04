const axios = require('axios');

async function saySomethingKaney() {
  let respuesta = await axios.get("https://api.kanye.rest/?format=text")
  return respuesta.body;
}

module.exports = { saySomethingKaney };
