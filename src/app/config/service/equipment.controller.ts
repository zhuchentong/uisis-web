const controller = 'equipmentController'

export const equipmentController = {
  createEquipment: {
    controller,
    action: 'create',
    method: 'POST'
  },
  getEquipments: {
    controller,
    action: 'query',
    method: 'GET'
  },
  updateEquipment: {
    controller,
    action: 'modify',
    method: 'POST'
  }
}
