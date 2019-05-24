import { Component, OnInit, ViewChild } from '@angular/core'
import { STColumn, STComponent } from '@delon/abc'
import { SFComponent, SFSchema } from '@delon/form'
import { PageService } from '@core/http'
import { DictPipe } from '@shared/pipes/dict.pipe'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { CheckLabService } from 'app/services/check-lab.service'
import { CheckRecordModel } from 'app/model/check-record.model'
import { Model } from 'app/model'

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
    { title: '编号', index: 'checkItemConfigSnapshot.itemNumber' },
    { title: '风险等级', index: 'checkItemConfigSnapshot.risk_level' },
    {
      title: '操作',
      fixed: 'right',
      buttons: [
        // { text: '修改', type: 'modal', click: x => this.modify(x) },
        // { text: '删除', type: 'modal', click: x => this.delete(x) }
      ]
    }
  ]

  constructor(
    private dictPipe: DictPipe,
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
      console.log(222, this.dataSet)
    })
  }
}
