const GET_ALLINKS = `
# Write your query or mutation here
query{
    allCrud{
      data{
        text
        _id
        archived
      }
    }
  }
`

const CREATE_LINK = `
    mutation($text: String! ) {
        createCrud( data: { text:$text,  archived: false }) {
            text
            _id
            archived
        }
    }
`

const UPDATE_LINK = `
  mutation($id: ID!, $archived: Boolean!, $text: String!  ) {
        updateCrud( id: $id, data: { text:$text, archived: $archived }) {
            text
            _id
            archived
        }
    }
`

const DELETE_LINK = `
  mutation($id: ID!) {
        deleteCrud( id: $id) {
            _id
        }
    }
`

module.exports = {
  GET_ALLINKS,
  CREATE_LINK,
  UPDATE_LINK,
  DELETE_LINK,
}
