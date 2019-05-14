import { Injectable } from '@angular/core';

@Injectable()
export class PageService {
  public pageIndex = 1;
  public total: number;
  public pageSize = 10;
  public loading: boolean;
  public totalPage: number;
  public complete = false;

  constructor() {
    this.pageIndex = 1;
    this.total = 0;
    this.pageSize = 10;
    this.loading = false;
  }

  /**
   * 获取分页配置信息
   */
  public getConfig() {
    return {
      pageIndex: this.pageIndex - 1,
      pageSize: this.pageSize,
    };
  }

  public next() {
    if (!this.complete) {
      this.pageIndex += 1;
      this.checkComplete();
    }
  }

  public reset() {
    this.pageIndex = 1;
    this.loading = false;
    this.complete = false;
  }

  /**
   * 更新分页配置信息
   * @param total 数据总数
   */
  public update(total) {
    this.total = total;
    this.totalPage = Math.ceil(this.total / this.pageSize);
    this.checkComplete();
  }

  private checkComplete() {
    if (this.pageIndex >= this.totalPage) {
      this.complete = true;
    }
  }
}
