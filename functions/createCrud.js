const axios = require("axios")
require("dotenv").config()
const { CREATE_LINK } = require("./utils/getLinkQueries.js")
const sendQuery = require("./utils/sendQueries")
const formattedResponse = require("./utils/formattedRes")
exports.handler = async event => {
  console.log(event, "EVENT")
  const { text } = JSON.parse(event.body)
  console.log(text, "TEXT")
  const variables = { text, archived: false }
  try {
    const { createCrud: createdCrud } = await sendQuery(CREATE_LINK, variables)

    return formattedResponse(200, createdCrud)
  } catch (err) {
    console.error(err)
    return formattedResponse(500, { err: "Something went wrong" })
  }
}
