import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core'
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { NoticeItem, NoticeIconList } from '@delon/abc'
import { MessageService } from 'app/services/message.service'
import { PageService } from '@core/http'
import { DictPipe } from '@shared/pipes/dict.pipe'
import { MessageType, DictType } from 'app/config/enum.config'
import { Store } from '@ngxs/store'
import { DictState } from 'app/store/state/dict.state'
import { ActivatedRoute, Router } from '@angular/router'

/**
 * 菜单通知
 */
@Component({
  selector: 'header-notify',
  template: `
    <notice-icon
      [data]="data"
      [count]="count"
      [loading]="loading"
      btnClass="alain-default__nav-item"
      btnIconClass="alain-default__nav-item-icon"
      (select)="select($event)"
      (clear)="clear($event)"
      (popoverVisibleChange)="loadData()"
    ></notice-icon>
    <ng-template #messageTemplate>
      <sv-container [labelWidth]="120" [col]="1" *ngIf="currentMessage">
        <sv label="标题">{{ currentMessage.title }}</sv>
        <sv label="发送人">{{ currentMessage.sender }}</sv>
        <sv label="发送时间">{{ currentMessage.datetime }}</sv>
        <sv label="内容">{{ currentMessage.content }}</sv>
      </sv-container>
    </ng-template>
  `,
  providers: [MessageService, PageService, DictPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderNotifyComponent {
  @ViewChild('messageTemplate')
  messageTemplate: TemplateRef<any>
  public currentMessage
  data: NoticeItem[] = [
    {
      title: '通知',
      list: [],
      emptyText: '你已查看所有通知',
      emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
      clearText: '清空通知'
    },
    {
      title: '提醒',
      list: [],
      emptyText: '您已读完所有消息',
      emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg',
      clearText: '清空消息'
    },
    {
      title: '待办任务',
      list: [],
      emptyText: '你已完成所有待办',
      emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg',
      clearText: '清空待办'
    }
  ]
  count = 0
  loading = false

  constructor(
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private pageService: PageService,
    private dictPipe: DictPipe,
    private store: Store,
    private router: Router,
    private modalService: NzModalService
  ) {}

  private updateNoticeData(notices: any[]): NoticeItem[] {
    const data = this.data.slice()
    data.forEach(i => (i.list = []))

    notices.forEach(item => {
      const newItem = { ...item }
      if (newItem.datetime)
        newItem.datetime = distanceInWordsToNow(item.datetime, {
          locale: (window as any).__locale__
        })
      if (newItem.extra && newItem.status) {
        newItem.color = {
          todo: undefined,
          processing: 'blue',
          urgent: 'red',
          doing: 'gold'
        }[newItem.status]
      }
      data.find(w => w.title === newItem.type).list.push(newItem)
    })
    return data
  }

  loadData() {
    if (this.loading) return
    this.loading = true
    this.messageService.query({}, { page: this.pageService }).subscribe(data => {
      this.data = this.updateNoticeData(
        data.map((x: any) => ({
          id: x.id,
          title: x.title,
          datetime: x.sendTime,
          content: x.content,
          sender: x.sender,
          type: this.dictPipe.transform(x.type)
        }))
      )
      console.log(data)
      this.loading = false
      this.count = data.length
      this.cdr.detectChanges()
    })
  }

  clear(type: string) {
    console.log(type)
    console.log(this.store.selectSnapshot(DictState.getDict(DictType.MessageType)))
    const typeItem = this.store.selectSnapshot(DictState.getDict(DictType.MessageType)).find(x => x.name === type)
    if (typeItem) {
      this.messageService.clear(typeItem.code).subscribe(() => {
        this.msg.success(`清空了 ${type}`)
        this.loadData()
      })
    }
  }

  select(res: any) {
    this.currentMessage = res.item
    console.log(res)
    if (res.title === '待办任务') {
      this.router.navigate(['/check/record'])
    } else {
      this.modalService.create({
        nzTitle: '消息提醒',
        nzContent: this.messageTemplate,
        nzCancelText: null
      })
    }
  }
}
