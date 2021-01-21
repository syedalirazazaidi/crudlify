const axios = require("axios")
require("dotenv").config()
const { UPDATE_LINK } = require("./utils/getLinkQueries.js")
const sendQuery = require("./utils/sendQueries")
const formattedResponse = require("./utils/formattedRes")
exports.handler = async event => {
  if (event.httpMethod !== "PUT") {
    return formattedResponse(405, { err: "Method not supported" })
  }
  const { text, _id: id, archived } = JSON.parse(event.body)
  const variables = { text, archived, id }
  try {
    const { updateCrud: updatedCrud } = await sendQuery(UPDATE_LINK, variables)

    return formattedResponse(200, updatedCrud)
  } catch (err) {
    console.error(err)
    return formattedResponse(500, { err: "Something went wrong" })
  }
}
