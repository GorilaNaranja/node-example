const request = require("async-request");

async function saySomethingKaney() {
  let respuesta = await request("https://api.kanye.rest/?format=text");
  return respuesta.body;
}

module.exports = { saySomethingKaney };
