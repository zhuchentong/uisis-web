import { environment } from '../../environments/environment'

export const appConfig = {
  name: '',
  version: '',
  server: environment.SERVER_URL,
  attach: environment.ATTACH_URL,
  timeout: 99999 // 超时时间
}
