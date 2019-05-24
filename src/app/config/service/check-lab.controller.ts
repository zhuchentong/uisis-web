const controller = 'checkLabController'

export const checkLabController = {
  queryDanger: {
    controller,
    action: 'queryDanger',
    method: 'GET'
  },
  next: {
    controller,
    action: 'next',
    method: 'POST'
  },
  getRecord: {
    controller,
    action: 'getRecord',
    method: 'GET'
  },
  getRecordContent: {
    controller,
    action: 'getRecordContent',
    method: 'GET'
  }
}
