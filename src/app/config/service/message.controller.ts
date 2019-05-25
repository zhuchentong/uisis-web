const controller = 'messageController'

export const messageController = {
  query: {
    controller,
    action: 'query',
    method: 'GET'
  },
  clear: {
    controller,
    action: 'clear',
    method: 'DELETE'
  }
}
