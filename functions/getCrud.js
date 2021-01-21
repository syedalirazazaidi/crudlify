const axios = require("axios")
require("dotenv").config()
const { GET_ALLINKS } = require("./utils/getLinkQueries.js")
const sendQuery = require("./utils/sendQueries")
const formattedResponse = require("./utils/formattedRes")
exports.handler = async event => {
  console.log(event.body, "EVENT-GET")
  try {
    const res = await sendQuery(GET_ALLINKS)
    const data = res.allCrud.data
    return formattedResponse(200, data)
  } catch (err) {
    console.error(err)
    return formattedResponse(500, { err: "Something went wrong" })
  }
}
