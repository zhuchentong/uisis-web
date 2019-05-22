import { Component, OnInit, ViewChild } from '@angular/core'
import { STColumn, STComponent } from '@delon/abc'
import { SFComponent, SFSchema } from '@delon/form'
import { PageService } from '@core/http'
import { DictPipe } from '@shared/pipes/dict.pipe'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { plainToClass } from 'class-transformer'
import { LaboratoryRiskLevelService } from 'app/services/laboratory-risk-level.service'
import { LaboratoryRiskLevelModel } from 'app/model/laboratory-risk-level.model'
import { Model } from 'app/model'
import { Store } from '@ngxs/store'
import { of } from 'rxjs'
import { DictState } from 'app/store/state/dict.state'
import { DictType } from 'app/config/enum.config'

@Component({
  selector: 'app-laboratory-risk-level',
  templateUrl: './risk-level.component.html',
  providers: [LaboratoryRiskLevelService, PageService, DictPipe]
})
export class LaboratoryRiskLevelComponent implements OnInit {
  public dataSet: any
  public formData = {}
  @ViewChild('st') st: STComponent

  @ViewChild('sf') sf: SFComponent

  @ViewChild('riskLevelFormComponent') riskLevelFormComponent: any

  public schema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '等级名称'
      },
      monthCheckTimes: {
        type: 'integer',
        title: '每月检查次数',
        maximum: 30,
        minimum: 0
      },
      monthSelfCheckTimes: {
        type: 'integer',
        title: '每月自查次数',
        maximum: 30,
        minimum: 0
      },
      selfCheckEveryDay: {
        type: 'boolean',
        title: '每天自查'
      },
      reminderDays: {
        type: 'integer',
        title: '提前提醒天数',
        maximum: 30,
        minimum: 0
      },
      checkTypes: {
        type: 'string',
        title: '检查类型',
        ui: {
          widget: 'checkbox',
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
      },
      description: {
        type: 'string',
        title: '等级说明',
        ui: {
          widget: 'textarea',
          autosize: { minRows: 3, maxRows: 6 }
        }
      }
    },
    required: ['name', 'description']
  }

  public columns: STColumn[] = [
    { title: '等级名称', index: 'name', width: 100 },
    { title: '每月检查次数', index: 'monthCheckTimes', width: 100 },
    { title: '每月自查次数', index: 'monthSelfCheckTimes', width: 100 },
    { title: '每天自查', index: 'selfCheckEveryDay', width: 100, type: 'yn' },
    { title: '等级说明', index: 'description', render: 'description' },
    {
      title: '操作',
      width: 100,
      fixed: 'right',
      buttons: [
        { text: '修改', type: 'modal', click: x => this.modify(x) },
        { text: '删除', type: 'modal', click: x => this.delete(x) }
      ]
    }
  ]

  constructor(
    private dictPipe: DictPipe,
    private laboratoryRiskLevelService: LaboratoryRiskLevelService,
    private modalService: NzModalService,
    private pageService: PageService,
    private messageService: NzMessageService,
    private store: Store
  ) {}

  ngOnInit() {
    this.query()
  }

  /**
   * 查询操作
   */
  public query() {
    this.laboratoryRiskLevelService.query(this.pageService).subscribe(data => {
      this.dataSet = data
    })
  }

  /**
   * 创建操作
   */
  public create() {
    this.formData = {}
    this.modalService.create({
      nzTitle: '创建实验室安全等级',
      nzContent: this.riskLevelFormComponent,
      nzOnOk: () => {
        if (!this.sf.valid) {
          this.messageService.error('请确认输入信息正确')
          return false
        }
        const model = Model.from(LaboratoryRiskLevelModel, this.sf.value)
        console.log(this.sf.value)
        this.laboratoryRiskLevelService.create(model).subscribe(() => {
          this.query()
          this.messageService.success('创建成功')
        })
      }
    })
  }

  /**
   * 修改操作
   */
  public modify(data) {
    this.formData = data
    this.modalService.create({
      nzTitle: '编辑实验室分类',
      nzContent: this.riskLevelFormComponent,
      nzOnOk: () => {
        if (!this.sf.valid) {
          this.messageService.error('请确认输入信息正确')
          return false
        }
        const model = Model.from(LaboratoryRiskLevelModel, this.sf.value)
        // 获取参数
        this.laboratoryRiskLevelService.modify(model).subscribe(() => {
          this.query()
          this.messageService.success('更新成功')
        })
      }
    })
  }

  /**
   * 删除操作
   */
  public delete(data) {
    this.modalService.confirm({
      nzTitle: '<i>操作确认</i>',
      nzContent: '<b>是否确认删除该条数据?</b>',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.laboratoryRiskLevelService.delete(data.id).subscribe(() => {
          this.query()
          this.messageService.success('删除成功')
        })
      }
    })
  }
}
