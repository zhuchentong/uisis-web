import { Component, OnInit, ViewChild } from '@angular/core'
import { _HttpClient, ModalHelper } from '@delon/theme'
import { STColumn, STComponent } from '@delon/abc'
import { SFSchema } from '@delon/form'
import { OrganizationService } from 'app/services/organization.service'
import { NzTreeComponent, NzModalService, NzMessageService } from 'ng-zorro-antd'
import { OrganizationModel } from 'app/model/organization.model'
@Component({
  selector: 'app-system-organization',
  templateUrl: './organization.component.html',
  providers: [OrganizationService]
})
export class SystemOrganizationComponent implements OnInit {
  @ViewChild('nzTreeComponent')
  nzTreeComponent: NzTreeComponent

  @ViewChild('organizationNameInput')
  organizationNameInput

  public treeData = []
  public organizationName = ''
  public origanizationDataSet = []

  public columns: STColumn[] = [
    { title: '序号', type: 'no' },
    { title: '组织名称', index: 'name' },
    { title: '创建者', index: 'creator.realName' },
    { title: '创建事件', index: 'createTime', type: 'date' },
    {
      title: '操作',
      buttons: [
        // { text: '修改姓名', type: 'static', component: FormEditComponent, click: 'reload' },
        // { text: '修改状态', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ]

  public formData = {}

  constructor(
    private messageService: NzMessageService,
    private organizationService: OrganizationService,
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
   * 创建组织
   */
  public onCreate() {
    this.organizationName = ''
    const node = this.getSelectNode()
    const organization = new OrganizationModel()
    organization.parent = node ? node.id : ''

    this.modalService.create({
      nzTitle: '创建组织',
      nzContent: this.organizationNameInput,
      nzOnOk: () => {
        if (!this.organizationName) {
          this.messageService.error('请输入组织名称')
          return false
        }
        organization.name = this.organizationName
        this.organizationService.create(organization).subscribe(() => {
          this.messageService.success('创建成功')
          this.getOrganizationList()
        })
      }
    })
  }

  /**
   * 修改机构
   */
  public onUpdate(node) {
    if (!node) {
      node = this.getSelectNode()
    }

    if (node) {
      this.organizationName = node.name
      this.modalService.create({
        nzTitle: '创建组织',
        nzContent: this.organizationNameInput,
        nzOnOk: () => {
          if (!this.organizationName) {
            this.messageService.error('请输入组织名称')
            return false
          }
          this.organizationService
            .modify({
              id: node.id,
              code: node.code,
              parent: node.parent.id,
              name: this.organizationName
            })
            .subscribe(() => {
              this.messageService.success('修改成功')
              this.getOrganizationList()
            })
        }
      })
    }
  }

  /**
   * 删除机构
   */
  public onDelete(node) {
    if (!node) {
      node = this.getSelectNode()
    }
    if (node) {
      this.organizationService.delete(node.id).subscribe(() => {
        this.messageService.success('删除成功')
        this.getOrganizationList()
      })
    }
  }

  public onSelectNode({ node }) {
    if (node.origin) {
      this.origanizationDataSet = node.origin.children
    }
  }

  /**
   * 获取选择节点
   */
  private getSelectNode() {
    const nodes = this.nzTreeComponent.getSelectedNodeList()
    return nodes.length ? nodes[0].origin : null
  }
}
