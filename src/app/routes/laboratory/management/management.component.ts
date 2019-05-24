import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core'
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

@Component({
  selector: 'app-laboratory-managenment',
  templateUrl: './management.component.html',
  providers: [LaboratoryService, OrganizationService, PageService]
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
    { title: '名称', index: 'name', render: 'name', width: '100px' },
    { title: '类型', index: 'laboratoryType.name', render: 'typeName', width: 120, className: 'text-center' },
    { title: '风险等级', index: 'laboratoryRiskLevel.name', render: 'riskLevelTile' },
    {
      title: '操作',
      fixed: 'right',
      width: 200,
      className: 'text-center',
      buttons: [
        { text: '修改', type: 'none', click: x => this.onModify(x) },
        { text: '删除', type: 'del', click: x => this.onDelete(x.id) }
      ]
    }
  ]

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
      }
    },
    required: ['name', 'code']
  }

  constructor(
    public pageService: PageService,
    private laboratoryService: LaboratoryService,
    private organizationService: OrganizationService,
    private messageService: NzMessageService,
    private modalService: NzModalService
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
  public onCreate() {}

  /**
   * 修改数据
   */
  public onModify(node) {}

  /**
   * 删除数据
   */
  public onDelete(id?) {
    id = id || this.selectedCheckPath.id
    this.laboratoryService.delete(id).subscribe(() => {
      this.refreshCheck()
      this.messageService.success('删除成功')
    })
  }

  /**
   * 刷新数据
   */
  public refreshCheck() {}
}
