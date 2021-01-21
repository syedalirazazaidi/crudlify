const axios = require("axios")
require("dotenv").config()
const { DELETE_LINK } = require("./utils/getLinkQueries.js")
const sendQuery = require("./utils/sendQueries")
const formattedResponse = require("./utils/formattedRes")
exports.handler = async event => {
  if (event.httpMethod !== "DELETE") {
    return formattedResponse(405, { err: "Method not supported" })
  }

  const { id } = JSON.parse(event.body)
  const variables = { id }
  try {
    const { deleteCrud: deletedCrud } = await sendQuery(DELETE_LINK, variables)

    return formattedResponse(200, deletedCrud)
  } catch (err) {
    console.error(err)
    return formattedResponse(500, { err: "Something went wrong" })
  }
}
