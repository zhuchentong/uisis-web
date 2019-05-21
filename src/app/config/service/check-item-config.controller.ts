const controller = 'checkItemConfigController'

export const checkItemConfigController = {
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
  },
  findByParentId: {
    controller,
    action: 'findByParentId',
    method: 'GET'
  }
}
