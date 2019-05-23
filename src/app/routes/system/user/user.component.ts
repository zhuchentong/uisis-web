import { Component, OnInit, ViewChild } from '@angular/core'
import { _HttpClient, ModalHelper } from '@delon/theme'
import { STColumn, STComponent } from '@delon/abc'
import { SFSchema, FormProperty, PropertyGroup, SFComponent } from '@delon/form'
import { OperatorService } from 'app/services/operator.service'
import { PageService } from '@core/http'
import { DictPipe } from '@shared/pipes/dict.pipe'
import { NzModalService, NzMessageService, NzTreeComponent } from 'ng-zorro-antd'
import { OrganizationService } from 'app/services/organization.service'
import { DictState } from 'app/store/state/dict.state'
import { of } from 'rxjs'
import { DictType, CommonState } from 'app/config/enum.config'
import { Store } from '@ngxs/store'
import { Model } from 'app/model'
import { UserModel } from 'app/model/user.model'
import { OrganizationModel } from 'app/model/organization.model'
import { states } from 'app/store'
@Component({
  selector: 'app-system-user',
  templateUrl: './user.component.html',
  providers: [OperatorService, PageService, DictPipe, OrganizationService]
})
export class SystemUserComponent implements OnInit {
  public userDataSet
  public treeData = []
  public formData
  public currentOrganizationId
  @ViewChild('st') st: STComponent
  @ViewChild('sf') sf: SFComponent
  @ViewChild('addUserComponent') addUserComponent
  @ViewChild('nzTreeComponent') nzTreeComponent: NzTreeComponent
  public schema: SFSchema = {
    properties: {
      username: {
        type: 'string',
        title: '用户名',
        minLength: 3
      },
      realName: {
        type: 'string',
        title: '姓名',
        minLength: 3
      },
      roles: {
        type: 'string',
        title: '用户角色',
        ui: {
          widget: 'checkbox',
          span: 8,
          asyncData: () =>
            of(
              this.store.selectSnapshot(DictState.getDict(DictType.Role)).map(x => ({
                label: x.name,
                value: x.code
              }))
            ),
          default: []
        }
      }
    }
  }

  public columns: STColumn[] = [
    { title: '用户名', index: 'username' },
    { title: '姓名', index: 'realName' },
    { title: '状态', index: 'state', render: 'state' },
    {
      title: '操作',
      buttons: [
        { text: '修改', type: 'none', click: x => this.onModify(x) }
        // { text: '删除', type: 'del', click: x => this.onDelete(x) }
      ]
    }
  ]

  constructor(
    private dictPipe: DictPipe,
    private operatorService: OperatorService,
    private modalService: NzModalService,
    private pageService: PageService,
    private messageService: NzMessageService,
    private organizationService: OrganizationService,
    private store: Store
  ) {}

  ngOnInit() {
    this.getOrganizationList()
  }

  /**
   * 获取用户列表
   */
  public getUserList(id) {
    this.operatorService
      .getOperators(
        {
          'organization.id': id
        },
        {
          page: this.pageService
        }
      )
      .subscribe(data => {
        this.userDataSet = data
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

  public onSelectNode({ node }) {
    if (node.origin) {
      this.getUserList(node.origin.id)
      this.currentOrganizationId = node.origin.id
    }
  }
  /**
   * 创建用户
   */
  public onCreate() {
    const [selected] = this.nzTreeComponent.getSelectedNodeList()
    if (!selected) {
      return this.messageService.error('请选则需要添加用户的组织')
    }

    this.modalService.create({
      nzTitle: '创建用户',
      nzContent: this.addUserComponent,
      nzOnOk: () => {
        if (!this.sf.valid) {
          this.messageService.error('请确认输入信息正确')
          return false
        }

        const model = Model.from(UserModel, this.sf.value)
        model.organization = selected.origin.id
        model.state = CommonState.ENABLED
        this.operatorService.createOperator(model).subscribe(() => {
          this.getUserList(selected.origin.id)
          this.messageService.success('用户创建成功')
        })
      }
    })
  }

  // private onDelete() {}

  private onModify(data) {
    this.formData = data
    this.modalService.create({
      nzTitle: '创建用户',
      nzContent: this.addUserComponent,
      nzOnOk: () => {
        if (!this.sf.valid) {
          this.messageService.error('请确认输入信息正确')
          return false
        }

        const model = Model.from(UserModel, this.sf.value)
        model.organization = this.currentOrganizationId
        this.operatorService.updateOperator(model).subscribe(() => {
          this.getUserList(this.currentOrganizationId)
          this.messageService.success('用户修改成功')
        })
      }
    })
  }

  public updateState(item) {
    const target = item.state === CommonState.ENABLED ? CommonState.DISABLED : CommonState.ENABLED
    this.operatorService
      .updateOperator({
        ...item,
        state: target,
        organization: this.currentOrganizationId
      })
      .subscribe(() => {
        this.getUserList(this.currentOrganizationId)
        this.messageService.success('状态修改成功')
      })
  }
}
