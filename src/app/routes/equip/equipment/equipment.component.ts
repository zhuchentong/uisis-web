import { Component, OnInit, ViewChild } from '@angular/core'
import { _HttpClient, ModalHelper } from '@delon/theme'
import { STColumn, STComponent } from '@delon/abc'
import { SFSchema, FormProperty, PropertyGroup, SFComponent } from '@delon/form'
import { EquipmentService } from 'app/services/equipment.service'
import { PageService } from '@core/http'
import { DictPipe } from '@shared/pipes/dict.pipe'
import { NzModalService, NzMessageService } from 'ng-zorro-antd'
import { plainToClass } from 'class-transformer'
import { EquipmentModel } from 'app/model/equipment.model'
import { Model } from 'app/model'

@Component({
  selector: 'app-equip-equipment',
  templateUrl: './equipment.component.html',
  providers: [EquipmentService, PageService, DictPipe]
})
export class EquipEquipmentComponent implements OnInit {
  public equipmentDataSet
  public formData = {}
  @ViewChild('st') st: STComponent

  @ViewChild('sf') sf: SFComponent

  @ViewChild('equipmentFormComponent') equipmentFormComponent

  public schema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '设备名称'
      },
      code: {
        type: 'string',
        title: '设备编号'
      },
      model: {
        type: 'string',
        title: '设备型号'
      }
    },
    required: ['name', 'code', 'model']
  }

  public columns: STColumn[] = [
    { title: '设备名称', index: 'name' },
    { title: '设备编号', index: 'code' },
    { title: '设备型号', index: 'model' },
    {
      title: '操作',
      buttons: [
        { text: '修改', type: 'modal', click: x => this.onUpdate(x) },
        { text: '删除', type: 'modal', click: x => this.onDelete(x) }
      ]
    }
  ]

  constructor(
    private dictPipe: DictPipe,
    private equipmentService: EquipmentService,
    private modalService: NzModalService,
    private pageService: PageService,
    private messageService: NzMessageService
  ) {}

  ngOnInit() {
    this.getEquipmentList()
  }

  /**
   * 获取设备信息列表
   */
  public getEquipmentList() {
    this.equipmentService.getEquipments(this.pageService).subscribe(data => {
      this.equipmentDataSet = data
    })
  }

  /**
   * 创建设备信息
   */
  public onCreate() {
    this.formData = {}
    this.modalService.create({
      nzTitle: '创建设备信息',
      nzContent: this.equipmentFormComponent,
      nzOnOk: () => {
        if (!this.sf.valid) {
          this.messageService.error('请确认输入信息正确')
          return false
        }

        this.equipmentService.createEquipment(this.sf.value).subscribe(() => {
          this.getEquipmentList()
          this.messageService.success('创建设备信息成功')
        })
      }
    })
  }

  /**
   * 更新设备信息
   */
  public onUpdate(data) {
    this.formData = data
    this.modalService.create({
      nzTitle: '修改设备信息',
      nzContent: this.equipmentFormComponent,
      nzOnOk: () => {
        if (!this.sf.valid) {
          this.messageService.error('请确认输入信息正确')
          return false
        }
        const model = Model.from(EquipmentModel, this.sf.value)
        // 获取参数
        this.equipmentService.updateEquipment(model).subscribe(() => {
          this.getEquipmentList()
          this.messageService.success('更新设备信息成功')
        })
      }
    })
  }

  public onDelete(data) {
    this.modalService.confirm({
      nzTitle: '<i>操作确认</i>',
      nzContent: '<b>是否确认删除该条数据?</b>',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.equipmentService.deleteEquipment(data.id).subscribe(() => {
          this.messageService.success('删除成功')
          this.getEquipmentList()
        })
      }
    })
  }
}
