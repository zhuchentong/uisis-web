const controller = 'laboratoryTypeController'

export const laboratoryTypeController = {
  create: {
    controller,
    action: 'create',
    method: 'POST'
  },
  query: {
    controller,
    action: 'query',
    method: 'GET'
  },
  modify: {
    controller,
    action: 'modify',
    method: 'POST'
  },
  delete: {
    controller,
    action: 'delete',
    method: 'DELETE'
  },
  findById: {
    controller,
    action: 'findById',
    method: 'GET'
  },
  getAll: {
    controller,
    action: 'getAll',
    method: 'GET'
  }
}
