import { Component, OnInit, ViewChild } from '@angular/core'
import { STColumn, STComponent } from '@delon/abc'
import { SFComponent, SFSchema } from '@delon/form'
import { PageService } from '@core/http'
import { DictPipe } from '@shared/pipes/dict.pipe'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { plainToClass } from 'class-transformer'
import { LaboratoryRiskLevelService } from 'app/services/laboratory-risk-level.service'
import { LaboratoryRiskLevelModel } from 'app/model/laboratory-risk-level.model'

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

  @ViewChild('laboratoryRiskLevelFormComponent') laboratoryRiskLevelFormComponent: any

  public schema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '名称',
        minLength: 3
      },
      description: {
        type: 'string',
        title: '描述',
        minLength: 3
      }
    }
  }
  public columns: STColumn[] = [
    { title: '等级名称', index: 'name', width: 100 },
    { title: '每月检查次数', index: 'monthCheckTimes', width: 100 },
    { title: '每月自查次数', index: 'monthSelfCheckTimes', width: 100 },
    { title: '每天自查', index: 'selfCheckEveryDay', width: 100, type: 'yn' },

    { title: '等级说明', index: 'description', width: 200 },
    {
      title: '操作',
      width: 100,
      fixed: 'right',
      buttons: [{ text: '修改', type: 'modal', click: x => this.modify(x) }]
    }
  ]

  constructor(
    private dictPipe: DictPipe,
    private laboratoryRiskLevelService: LaboratoryRiskLevelService,
    private modalService: NzModalService,
    private pageService: PageService,
    private messageService: NzMessageService
  ) {}

  ngOnInit() {
    this.query()
  }

  public query() {
    this.laboratoryRiskLevelService.query(this.pageService).subscribe(data => {
      this.dataSet = data
      console.log(data)
    })
  }

  public create() {
    this.formData = {}
    this.modalService.create({
      nzTitle: '创建实验室安全等级',
      nzContent: this.laboratoryRiskLevelFormComponent,
      nzOnOk: () => {
        if (!this.sf.valid) {
          this.messageService.error('请确认输入信息正确')
          return false
        }

        this.laboratoryRiskLevelService.create(this.sf.value).subscribe(() => {
          this.query()
          this.messageService.error('创建成功')
        })
      }
    })
  }

  public modify(data) {
    this.formData = data
    this.modalService.create({
      nzTitle: '编辑实验室分类',
      nzContent: this.laboratoryRiskLevelFormComponent,
      nzOnOk: () => {
        if (!this.sf.valid) {
          this.messageService.error('请确认输入信息正确')
          return false
        }
        const model = plainToClass(LaboratoryRiskLevelModel, this.sf.value)
        // 获取参数
        this.laboratoryRiskLevelService.modify(model).subscribe(() => {
          this.query()
          this.messageService.error('编辑提交成功')
        })
      }
    })
  }
}
