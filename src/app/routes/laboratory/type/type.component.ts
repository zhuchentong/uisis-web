import { Component, OnInit, ViewChild } from '@angular/core'
import { STColumn, STComponent } from '@delon/abc'
import { SFComponent, SFSchema } from '@delon/form'
import { PageService } from '@core/http'
import { DictPipe } from '@shared/pipes/dict.pipe'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { plainToClass } from 'class-transformer'
import { LaboratoryTypeService } from 'app/services/laboratory-type.service'
import { LaboratoryTypeModel } from 'app/model/laboratory-type.model'

@Component({
  selector: 'app-laboratory-type',
  templateUrl: './type.component.html',
  providers: [LaboratoryTypeService, PageService, DictPipe]
})
export class LaboratoryTypeComponent implements OnInit {
  public laboratoryTypeDataSet: any
  public formData = {}
  @ViewChild('st') st: STComponent

  @ViewChild('sf') sf: SFComponent

  @ViewChild('laboratoryTypeFormComponent') laboratoryTypeFormComponent: any

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
    { title: '名称', index: 'name', width: 100 },
    { title: '描述', index: 'description', width: 200 },
    {
      title: '操作',
      width: 100,
      fixed: 'right',
      buttons: [{ text: '修改', type: 'modal', click: x => this.modify(x) }]
    }
  ]

  constructor(
    private dictPipe: DictPipe,
    private laboratoryTypeService: LaboratoryTypeService,
    private modalService: NzModalService,
    private pageService: PageService,
    private messageService: NzMessageService
  ) {}

  ngOnInit() {
    this.query()
  }

  public query() {
    this.laboratoryTypeService.query(this.pageService).subscribe(data => {
      this.laboratoryTypeDataSet = data
      console.log(data)
    })
  }

  public create() {
    this.formData = {}
    this.modalService.create({
      nzTitle: '创建实验室分类',
      nzContent: this.laboratoryTypeFormComponent,
      nzOnOk: () => {
        if (!this.sf.valid) {
          this.messageService.error('请确认输入信息正确')
          return false
        }

        this.laboratoryTypeService.create(this.sf.value).subscribe(() => {
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
      nzContent: this.laboratoryTypeFormComponent,
      nzOnOk: () => {
        if (!this.sf.valid) {
          this.messageService.error('请确认输入信息正确')
          return false
        }
        const model = plainToClass(LaboratoryTypeModel, this.sf.value)
        // 获取参数
        this.laboratoryTypeService.modify(model).subscribe(() => {
          this.query()
          this.messageService.error('编辑提交成功')
        })
      }
    })
  }
}
