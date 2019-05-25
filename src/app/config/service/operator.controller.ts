const controller = 'operator'

export const operatorController = {
  login: {
    controller,
    action: 'login',
    method: 'POST'
  },
  createOperator: {
    controller,
    action: 'createOperator',
    method: 'POST'
  },
  getOperators: {
    controller,
    action: 'getOperators',
    method: 'GET'
  },
  updateOperator: {
    controller,
    action: 'updateOperator',
    method: 'POST'
  },
  queryByOrganization: {
    controller,
    action: 'queryByOrganization',
    method: 'GET'
  },
  changeOperatorPassword: {
    controller,
    action: 'changeOperatorPassword',
    method: 'POST'
  }
}
