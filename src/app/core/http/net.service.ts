import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { map, finalize } from 'rxjs/operators'
import { appConfig } from 'app/config/app.config'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { Model } from 'app/model'
import { classToPlain, plainToClass } from 'class-transformer'
import { PageService, IRequestOption } from 'app/core/http'
import * as qs from 'qs'
import { _HttpClient } from '@delon/theme'

@Injectable({
  providedIn: 'root'
})
export class NetService {
  // 请求头部信息
  private headers = new HttpHeaders()
  constructor(private http: HttpClient) {}

  /**
   * 发送网络通讯请求
   * @param options 请求选项
   */
  public send(options: IRequestOption): Observable<any> {
    // 生成请求URL
    const requestUrl: string = this.generateRequestUrl(options.service, options.append)
    // 生成请求METHOD
    const requestMethod: string = options.service.method

    this.generateRequestLoading(options)
    return this.http
      .request(requestMethod, requestUrl, {
        body: this.generateRequestBody(options),
        headers: this.generateRequestHeader(options),
        observe: 'response',
        responseType: 'json',
        params: this.generateRequestParams(options)
      })
      .pipe(
        // 取body数据
        map(response => {
          let body = response.body
          // 更新分页数据
          if (options.page) {
            const data = response.body as any
            body = data.content
          }

          return options.model ? plainToClass(options.model, body) : body
        }),
        finalize(() => {})
      )
  }

  /**
   * 根据服务配置生成通讯地地址
   * @param options 请求选项
   */
  private generateRequestUrl(options: any, append: string[] = []): string {
    return [appConfig.server, options.controller, options.action, ...append].filter(x => x).join('/')
  }

  /**
   * 根据服务配置返回Search参数
   * @param options 请求选项
   */
  private generateRequestParams(options): HttpParams {
    if (!['GET', 'DELETE'].includes(options.service.method)) {
      return null
    }

    // TODO:分页处理
    let params = options.params

    if (options.params instanceof Model) {
      params = classToPlain(options.params)
    }

    if (options.page) {
      params = Object.assign(params || {}, this.getPageParams(options.page))
    }

    return new HttpParams({
      fromString: qs.stringify(params)
    })
  }

  /**
   * 根据服务配置返回Body参数
   * @param options 请求选项
   */
  private generateRequestBody(options): object {
    if (!['POST', 'PUT'].includes(options.service.method)) {
      return null
    }

    // 如果参数继承Model
    if (options.params instanceof Model) {
      return classToPlain(options.params, { excludeExtraneousValues: true })
    }

    if (options.page) {
      Object.assign(options.params, this.getPageParams(options.page))
    }

    return options.params
  }

  private getPageParams(page: PageService) {
    return {
      pageIndex: page.pageIndex,
      pageSize: page.pageSize
    }
  }

  /**
   * 生成头部信息
   */
  private generateRequestHeader(options): HttpHeaders {
    // TODO:自定义header
    return this.headers
  }

  /**
   * 生成请求实的Loading
   * @param options 请求选项
   */
  private generateRequestLoading(options): any {
    if (!options || !options.loading) {
      return
    }
  }
}
