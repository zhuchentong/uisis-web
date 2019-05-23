import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core'
import { _HttpClient, ModalHelper } from '@delon/theme'
import { STColumn, STComponent } from '@delon/abc'
import { SFSchema, SFComponent } from '@delon/form'
import { OrganizationService } from 'app/services/organization.service'
import { NzTreeComponent, NzModalService, NzMessageService } from 'ng-zorro-antd'
import { OrganizationModel } from 'app/model/organization.model'
import { FormGroup, FormBuilder, RequiredValidator, Validators } from '@angular/forms'
import { CdkConnectedOverlay } from '@angular/cdk/overlay'
@Component({
  selector: 'app-system-organization',
  templateUrl: './organization.component.html',
  providers: [OrganizationService]
})
export class SystemOrganizationComponent implements OnInit {
  @ViewChild('nzTreeComponent')
  nzTreeComponent: NzTreeComponent

  @ViewChild('organizationCreateForm')
  organizationCreateForm: TemplateRef<any>

  @ViewChild('sf')
  sf: SFComponent

  public treeData = []
  public createForm: FormGroup
  public organizationName = ''
  public origanizationDataSet = []

  public schema: SFSchema = {
    properties: {
      id: {
        type: 'string',
        ui: {
          hidden: true
        }
      },
      name: {
        type: 'string',
        title: '名称'
      },
      code: {
        type: 'string',
        title: '编号',
        minimum: 1
      },
      createTime: {
        type: 'string',
        title: '创建时间',
        format: 'date',
        ui: {
          widget: 'text'
        }
      },
      creator: {
        type: 'string',
        title: '创建人',
        ui: {
          widget: 'text'
        }
      },
      description: {
        type: 'string',
        title: '描述',
        ui: {
          widget: 'textarea',
          autosize: { minRows: 3, maxRows: 6 }
        }
      }
    }
  }

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

  public formData

  constructor(
    private messageService: NzMessageService,
    private organizationService: OrganizationService,
    private modalService: NzModalService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getOrganizationList()
    this.createForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
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
    this.createForm.reset()
    const node = this.getSelectNode()
    const organization = new OrganizationModel()
    parent = node ? node.id : ''
    console.log(parent)
    this.modalService.create({
      nzTitle: '创建组织',
      nzContent: this.organizationCreateForm,
      nzOnOk: () => {
        if (!this.createForm.valid) {
          this.messageService.error('请输入组织名称')
          return false
        }
        this.organizationService
          .create({
            ...this.createForm.value,
            parent
          })
          .subscribe(() => {
            this.messageService.success('创建成功')
            this.getOrganizationList()
          })
      }
    })
  }

  /**
   * 修改机构
   */
  public onUpdate() {
    const node = this.sf.value
    console.log(node)

    this.organizationService
      .modify({
        id: node.id,
        code: node.code,
        name: node.name,
        description: node.description
      })
      .subscribe(() => {
        this.messageService.success('修改成功')
        this.getOrganizationList()
      })
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
      this.formData = Object.assign({}, node.origin, {
        creator: node.origin.creator.realName
      })
      console.log(this.formData)
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
