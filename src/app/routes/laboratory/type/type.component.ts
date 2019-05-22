import { Component, OnInit, ViewChild } from '@angular/core'
import { STColumn, STComponent } from '@delon/abc'
import { SFComponent, SFSchema } from '@delon/form'
import { PageService } from '@core/http'
import { DictPipe } from '@shared/pipes/dict.pipe'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { plainToClass } from 'class-transformer'
import { LaboratoryTypeService } from 'app/services/laboratory-type.service'
import { LaboratoryTypeModel } from 'app/model/laboratory-type.model'
import { Model } from 'app/model'

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

  @ViewChild('typeFormComponent') typeFormComponent

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
        ui: {
          widget: 'textarea',
          autosize: { minRows: 3, maxRows: 6 }
        },
        minLength: 3
      },
      sortNo: {
        type: 'integer',
        title: '序号',
        minimum: 1
      }
    },
    required: ['name', 'description', 'sortNo']
  }

  public columns: STColumn[] = [
    { title: '名称', index: 'name', width: 100 },
    { title: '描述', render: 'description' },
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
    })
  }

  public create() {
    this.formData = {}
    this.modalService.create({
      nzTitle: '创建实验室分类',
      nzContent: this.typeFormComponent,
      nzOnOk: () => {
        if (!this.sf.valid) {
          this.messageService.error('请确认输入信息正确')
          return false
        }

        this.laboratoryTypeService.create(this.sf.value).subscribe(() => {
          this.query()
          this.messageService.success('创建成功')
        })
      }
    })
  }

  public modify(data) {
    this.formData = data
    this.modalService.create({
      nzTitle: '编辑实验室分类',
      nzContent: this.typeFormComponent,
      nzOnOk: () => {
        if (!this.sf.valid) {
          this.messageService.error('请确认输入信息正确')
          return false
        }
        // 获取类型实体
        const model = Model.from(LaboratoryTypeModel, this.sf.value)
        // 获取参数
        this.laboratoryTypeService.modify(model).subscribe(() => {
          this.query()
          this.messageService.success('更新成功')
        })
      }
    })
  }

  public delete(data) {
    this.modalService.confirm({
      nzTitle: '<i>操作确认</i>',
      nzContent: '<b>是否确认删除该条数据?</b>',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.laboratoryTypeService.delete(data.id).subscribe(() => {
          this.messageService.success('删除成功')
          this.query()
        })
      }
    })
  }
}
