import { Component, OnInit, ViewChild } from '@angular/core'
import { _HttpClient, ModalHelper } from '@delon/theme'
import { STColumn, STComponent } from '@delon/abc'
import { SFSchema, FormProperty, PropertyGroup, SFComponent } from '@delon/form'
import { EquipmentService } from 'app/services/equipment.service'
import { PageService } from '@core/http'
import { DictPipe } from '@shared/pipes/dict.pipe'
import { NzModalService, NzMessageService } from 'ng-zorro-antd'
import { plainToClass, Transform, classToClass, classToPlain } from 'class-transformer'
import { EquipmentModel } from 'app/model/equipment.model'
import { Model } from 'app/model'
import { OrganizationService } from 'app/services/organization.service'
import { map } from 'rxjs/operators'
import { LaboratoryService } from 'app/services/laboratory.service'
import { zip, Observable, of } from 'rxjs'
import { UploadComponent } from '@shared/components/upload/upload.component'

@Component({
  selector: 'app-equip-equipment',
  templateUrl: './equipment.component.html',
  providers: [EquipmentService, OrganizationService, LaboratoryService, PageService, DictPipe]
})
export class EquipEquipmentComponent implements OnInit {
  public equipmentDataSet
  public formData = {}
  public organizationList = []
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
      },
      laboratory: {
        type: 'string',
        title: '实验室',
        ui: {
          widget: 'tree-select',
          asyncData: () => this.getTreeList(),
          default: []
        }
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
        { text: '修改', type: 'none', click: x => this.onUpdate(x) },
        { text: '删除', type: 'del', click: x => this.onDelete(x) }
      ]
    }
  ]

  constructor(
    private dictPipe: DictPipe,
    private equipmentService: EquipmentService,
    private modalService: NzModalService,
    public pageService: PageService,
    private messageService: NzMessageService,
    private organizationService: OrganizationService,
    private laboratoryService: LaboratoryService,
    private modalHelper: ModalHelper
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
   * 获取组织列表
   */
  public getRootList() {
    return this.organizationService.getAll().pipe(
      map(data => {
        const generateTreeNode = node => {
          node.title = node.name
          node.key = node.id
          node.expend = true
          node.type = 'organization'
          node.selectable = false
          const children = data.filter(x => x.parent && x.parent.id === node.id)
          if (!children || !children.length) {
            node.leaf = true
          }
          return node
        }

        this.organizationList = data.map(generateTreeNode)

        return this.organizationList.filter(x => !x.parent)
      })
    )
  }

  public getTreeList() {
    return zip(this.organizationService.getAll(), this.laboratoryService.getAll()).pipe(
      map(([organizationlist, laboratoryList]) => {
        laboratoryList.forEach(node => {
          node.title = node.name
          node.key = node.id
          node.isLeaf = true
        })

        const generateTree = node => {
          node.title = node.name
          node.key = node.id
          node.selectable = false
          const children = organizationlist.filter(x => x.parent && x.parent.id === node.id)

          if (children && children.length) {
            node.children = children
            node.children.forEach(generateTree)
          } else {
            const labs = laboratoryList.filter(x => x.organization.id === node.id)
            node.children = labs
          }
        }

        const rootList = organizationlist.filter(x => !x.parent)
        rootList.forEach(generateTree)
        return rootList
      })
    )
  }

  /**
   * 更新设备信息
   */
  public onUpdate(data) {
    this.formData = classToPlain(data)
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
    // this.modalHelper
    //   .createStatic(UploadComponent)
    //   .subscribe((fileList) => {
    //     console.log(fileList)
    //   })

    this.equipmentService.deleteEquipment(data.id).subscribe(() => {
      this.messageService.success('删除成功')
      this.getEquipmentList()
    })
  }
}
