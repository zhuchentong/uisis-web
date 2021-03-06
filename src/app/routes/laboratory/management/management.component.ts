import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, NgZone } from '@angular/core'
import { NzModalRef, NzMessageService, NzTreeComponent, NzModalService } from 'ng-zorro-antd'
import { _HttpClient } from '@delon/theme'
import { STColumn } from '@delon/abc'
import { LaboratoryService } from 'app/services/laboratory.service'
import { SFSchema, SFComponent } from '@delon/form'
import { OrganizationService } from 'app/services/organization.service'
import { LaboratoryModel } from 'app/model/laboratory.model'
import { OrganizationModel } from 'app/model/organization.model'
import { NgTemplateOutlet } from '@angular/common'
import { Model } from 'app/model'
import { PageService } from '@core/http'
import { LaboratoryTypeService } from 'app/services/laboratory-type.service'
import { map } from 'rxjs/operators'
import { OperatorService } from 'app/services/operator.service'
import { classToPlain } from 'class-transformer'
import { LaboratoryRiskLevelModel } from 'app/model/laboratory-risk-level.model'
import { LaboratoryRiskLevelService } from 'app/services/laboratory-risk-level.service'
import { saveAs } from 'file-saver'
import * as printJS from 'print-js'
@Component({
  selector: 'app-laboratory-managenment',
  templateUrl: './management.component.html',
  providers: [
    LaboratoryService,
    OrganizationService,
    PageService,
    LaboratoryRiskLevelService,
    LaboratoryTypeService,
    OperatorService
    // NgZone
  ]
})
export class LaboratoryManagementComponent implements OnInit {
  @ViewChild('nzTreeComponent')
  tree: NzTreeComponent

  @ViewChild('laboratoryFormComponent')
  laboratoryFormComponent: TemplateRef<any>

  @ViewChild('sf')
  sf: SFComponent
  // 节点数据
  public treeData = []
  // 列表
  public dataSet: any
  // 当前节点
  public selectedCheckPath: OrganizationModel

  // 表格结构
  public columns: STColumn[] = [
    { title: '编号', index: 'code', width: 120, className: 'text-center' },
    { title: '名称', index: 'name', render: 'name', width: 250 },
    { title: '类型', index: 'laboratoryType.name', width: 150, className: 'text-center' },
    { title: '风险等级', index: 'laboratoryRiskLevel.name', width: 200 },
    // { title: '管理员', index: 'laboratoryRiskLevel.name', render: 'riskLevelTile' },
    {
      title: '操作',
      fixed: 'right',
      width: 200,
      className: 'text-center',
      buttons: [
        {
          text: '二维码',
          type: 'none',
          children: [
            {
              text: '打印',
              click: x => {
                this.qrConfig.value = `lab:${x.id}`
                setTimeout(() => {
                  printJS('qrcode', 'html')
                })
              }
            },
            {
              text: '下载',
              click: x => {
                this.qrConfig.value = `lab:${x.id}`
                setTimeout(() => {
                  const printContent = document.querySelector('#qrcode img') as CanvasImageSource
                  const canvas = document.createElement('canvas')
                  canvas.width = this.qrConfig.size
                  canvas.height = this.qrConfig.size
                  const ctx = canvas.getContext('2d')
                  ctx.drawImage(printContent, 0, 0)
                  canvas.toBlob(blob => {
                    saveAs(blob, 'pretty image.png')
                  })
                })
              }
            }
          ]
        },
        { text: '修改', type: 'none', click: x => this.onModify(x) },
        { text: '删除', type: 'del', click: x => this.onDelete(x.id) }
      ]
    }
  ]

  public qrConfig = {
    value: '',
    background: '#fff',
    backgroundAlpha: 1.0,
    foreground: '#000',
    foregroundAlpha: 1.0,
    level: 'L',
    mime: 'image/png',
    padding: 10,
    size: 220
  }

  // 表单默认数据
  public formData = {}

  // 表单结构
  public schema: SFSchema = {
    properties: {
      id: {
        type: 'string',
        ui: {
          hidden: true
        }
      },
      organization: {
        type: 'string',
        ui: {
          hidden: true
        }
      },
      code: {
        type: 'string',
        title: '实验室编号'
      },
      name: {
        type: 'string',
        title: '实验室名称'
      },
      laboratoryType: {
        type: 'string',
        title: '实验室类型',
        ui: {
          widget: 'select',
          asyncData: () =>
            this.laboratoryTypeService.getAll().pipe(
              map(data =>
                data.map(x => ({
                  label: x.name,
                  value: x.id
                }))
              )
            )
        }
      },
      laboratoryRiskLevel: {
        type: 'string',
        title: '实验室安全等级',
        ui: {
          widget: 'select',
          asyncData: () =>
            this.laboratoryRiskLevelService.getAll().pipe(
              map(data =>
                data.map(x => ({
                  label: x.name,
                  value: x.id
                }))
              )
            )
        }
      },
      managers: {
        type: 'string',
        title: '管理员',
        ui: {
          widget: 'select',
          mode: 'multiple',
          showSearch: false,
          maxTagCount: 5,
          asyncData: () =>
            this.operatorService.queryByOrganization(this.selectedCheckPath.id).pipe(
              map(data =>
                data.map(x => ({
                  label: x.realName,
                  value: x.id
                }))
              )
            )
        }
      }
    },
    required: ['name', 'code']
  }

  constructor(
    public pageService: PageService,
    private laboratoryService: LaboratoryService,
    private organizationService: OrganizationService,
    private messageService: NzMessageService,
    private modalService: NzModalService,
    private laboratoryTypeService: LaboratoryTypeService,
    private operatorService: OperatorService,
    private laboratoryRiskLevelService: LaboratoryRiskLevelService // private zone: NgZone
  ) {}

  ngOnInit() {
    this.getOrganizationList()
  }

  /**
   * 获取组织列表
   */
  public getOrganizationList() {
    this.organizationService.getAll().subscribe(data => {
      const generateTree = node => {
        node.title = node.name
        node.key = node.id
        const children = data.filter(x => x.parent && x.parent.id === node.id)
        if (children && children.length) {
          node.children = children
          node.children.forEach(generateTree)
        } else {
          node.isLeaf = true
        }
      }

      const rootList = data.filter(x => !x.parent)

      rootList.forEach(generateTree)
      this.treeData = [...rootList]
    })
  }

  /**
   * 获取节点选择项
   */
  public getLaboratory() {
    this.laboratoryService
      .query(
        {
          organization: this.selectedCheckPath.id
        },
        {
          page: this.pageService
        }
      )
      .subscribe(data => {
        this.dataSet = data
      })
  }

  /**
   * 更新选择节点
   */
  public onSelectNode({ node }) {
    if (!node || !node.origin) {
      return
    }
    this.selectedCheckPath = node.origin

    this.getLaboratory()
  }

  /**
   * 添加数据
   */
  public onCreate() {
    this.formData = {}
    this.modalService.create({
      nzTitle: '创建实验室',
      nzContent: this.laboratoryFormComponent,
      nzOnOk: () => {
        if (!this.sf.valid) {
          this.messageService.error('请确认输入信息正确')
          return false
        }
        this.laboratoryService
          .create({
            ...this.sf.value,
            organization: this.selectedCheckPath.id
          })
          .subscribe(() => {
            this.getLaboratory()
            this.messageService.success('创建成功')
          })
      }
    })
  }

  /**
   * 修改数据
   */
  public onModify(node) {
    this.formData = classToPlain(node)
    this.modalService.create({
      nzTitle: '编辑实验室',
      nzContent: this.laboratoryFormComponent,
      nzOnOk: () => {
        if (!this.sf.valid) {
          this.messageService.error('请确认输入信息正确')
          return false
        }
        this.laboratoryService.modify(this.sf.value).subscribe(() => {
          this.getLaboratory()
          this.messageService.success('更新成功')
        })
      }
    })
  }

  /**
   * 删除数据
   */
  public onDelete(id?) {
    id = id || this.selectedCheckPath.id
    this.laboratoryService.delete(id).subscribe(() => {
      this.getLaboratory()
      this.messageService.success('删除成功')
    })
  }
}
