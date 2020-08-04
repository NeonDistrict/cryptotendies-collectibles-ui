import humps from 'humps'

export default ({ req, $axios }) => {
  $axios.setHeader('Content-Type', 'application/json', ['post'])

  $axios.onRequest((config) => {
    if (process.server) {
      const isLocalhost = req.headers.host.startsWith('localhost:')
      const https = isLocalhost ? 'http' : 'https'
      config.baseURL = `${https}://${req.headers.host}`
    }
    if (process.client) {
      config.baseURL = '/'
    }
    config.data = humps.decamelizeKeys(config.data)
  })

  $axios.onResponse((response) => {
    response.data = humps.camelizeKeys(response.data)
  })
}
