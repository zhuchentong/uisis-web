import { Component, OnInit, ViewChild } from '@angular/core'
import { STColumn, STComponent } from '@delon/abc'
import { SFComponent, SFSchema } from '@delon/form'
import { PageService } from '@core/http'
import { DictPipe } from '@shared/pipes/dict.pipe'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { CheckLabService } from 'app/services/check-lab.service'
import { CheckRecordModel } from 'app/model/check-record.model'
import { Model } from 'app/model'
import { DatePipe } from '@angular/common'
import { CheckRecordDetailComponent } from '../record-detail/record-detail.component'
import { of } from 'rxjs'
import { Store } from '@ngxs/store'
import { DictState } from 'app/store/state/dict.state'
import { DictType } from 'app/config/enum.config'

@Component({
  selector: 'app-check-record',
  templateUrl: './record.component.html',
  providers: [CheckLabService, PageService, DictPipe]
})
export class CheckRecordComponent implements OnInit {
  public dataSet: any
  public formData = {}
  @ViewChild('st') st: STComponent

  @ViewChild('sf') sf: SFComponent

  @ViewChild('typeFormComponent') typeFormComponent
  searchSchema: SFSchema = {
    properties: {
      checkRecordState: {
        type: 'string',
        title: '检查状态',
        ui: {
          width: 200,
          widget: 'select',
          span: 8,
          allowClear: true,
          asyncData: () =>
            of(
              this.store.selectSnapshot(DictState.getDict(DictType.CheckRecordState)).map(x => ({
                label: x.name,
                value: x.code
              }))
            ),
          default: []
        }
      },
      checkType: {
        type: 'string',
        title: '检查类型',
        ui: {
          widget: 'select',
          width: 200,
          allowClear: true,
          span: 8,
          asyncData: () =>
            of(
              this.store.selectSnapshot(DictState.getDict(DictType.CheckType)).map(x => ({
                label: x.name,
                value: x.code
              }))
            ),
          default: []
        }
      }
    }
  }

  public columns: STColumn[] = [
    { title: '实验室', index: 'laboratory.name' },
    { title: '状态', index: 'checkRecordState', format: x => this.dictPipe.transform(x.checkRecordState) },
    { title: '检查类型', index: 'checkType', format: x => this.dictPipe.transform(x.checkType) },

    { title: '创建人', index: 'creator.realName' },

    { title: '创建时间', index: 'createTime', format: x => this.datePipe.transform(x.createTime, 'yyyy-MM-dd HH:mm') },

    { title: '更新人', index: 'updater.realName' },

    { title: '更新时间', index: 'updateTime', format: x => this.datePipe.transform(x.createTime, 'yyyy-MM-dd HH:mm') },

    {
      title: '操作',
      fixed: 'right',
      buttons: [
        {
          text: '查看',
          type: 'modal',
          params: x => ({ id: x.id }),
          paramsName: 'id',
          component: CheckRecordDetailComponent
        }
        // { text: '删除', type: 'modal', click: x => this.delete(x) }
      ]
    }
  ]

  constructor(
    private dictPipe: DictPipe,
    private datePipe: DatePipe,
    private checkLabService: CheckLabService,
    private modalService: NzModalService,
    public pageService: PageService,
    private messageService: NzMessageService,
    private store: Store
  ) {}

  ngOnInit() {
    this.query()
  }

  public query() {
    this.checkLabService.queryDanger(this.sf.value, { page: this.pageService }).subscribe(data => {
      this.dataSet = data
    })
  }

  public change(e) {
    if (this.pageService.change(e)) {
      this.query()
    }
  }
}
