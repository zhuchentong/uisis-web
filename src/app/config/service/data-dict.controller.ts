const controller = 'dataDictController'

export const dataDictController = {
  /**
   * 获取字典hash
   */
  getHash: {
    controller,
    action: 'DataDictHashCode',
    method: 'GET'
  },
  /**
   * 获取字典数据
   */
  getAll: {
    controller,
    action: 'getAll',
    method: 'GET'
  }
}
