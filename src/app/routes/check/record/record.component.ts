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
      no: {
        type: 'string',
        title: '编号'
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
        { text: '查看', type: 'modal' }
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
    private messageService: NzMessageService
  ) {}

  ngOnInit() {
    this.query()
  }

  public query() {
    this.checkLabService.queryDanger(this.pageService).subscribe(data => {
      this.dataSet = data
    })
  }

  public change(e) {
    if (this.pageService.change(e)) {
      this.query()
    }
  }
}
