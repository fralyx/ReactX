const fetch = require('node-fetch')
const API_URL = 'https://api.spacexdata.com/v3'

const resolvers =
{
  Query:
  {
    rocket: async (_, {id}) =>
    {
      const response = await fetch(`${API_URL}/rockets/${id}`)
      return response.json()
    },
    rockets: async (_) =>
    {
      const response = await fetch(`${API_URL}/rockets`)
      return response.json()
    },

    mission: async (_, {id}) =>
    {
      const response = await fetch(`${API_URL}/missions/${id}`)
      return response.json()
    },
    missions: async (_) =>
    {
      const response = await fetch(`${API_URL}/missions`)
      return response.json()
    }
  }
}

module.exports = resolvers