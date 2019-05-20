const controller = 'organizationController'

export const organizationController = {
  create: {
    controller,
    action: 'create',
    method: 'POST'
  },
  delete: {
    controller,
    action: 'delete',
    method: 'DELETE'
  },
  getAll: {
    controller,
    action: 'getAll',
    method: 'GET'
  },
  modify: {
    controller,
    action: 'modify',
    method: 'POST'
  }
}
