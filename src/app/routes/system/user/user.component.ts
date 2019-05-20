import { Component, OnInit, ViewChild } from '@angular/core'
import { _HttpClient, ModalHelper } from '@delon/theme'
import { STColumn, STComponent } from '@delon/abc'
import { SFSchema, FormProperty, PropertyGroup, SFComponent } from '@delon/form'
import { OperatorService } from 'app/services/operator.service'
import { PageService } from '@core/http'
import { DictPipe } from '@shared/pipes/dict.pipe'
import { NzModalService, NzMessageService } from 'ng-zorro-antd'
@Component({
  selector: 'app-system-user',
  templateUrl: './user.component.html',
  providers: [OperatorService, PageService, DictPipe]
})
export class SystemUserComponent implements OnInit {
  public userDataSet
  @ViewChild('st') st: STComponent
  @ViewChild('sf') sf: SFComponent
  @ViewChild('addUserComponent') addUserComponent

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
      }
    }
  }

  public columns: STColumn[] = [
    { title: '用户名', index: 'username' },
    { title: '姓名', index: 'realName' },
    { title: '状态', index: 'state', format: x => this.dictPipe.transform(x.state) },
    {
      title: '操作',
      buttons: [
        // { text: '修改姓名', type: 'static', component: FormEditComponent, click: 'reload' },
        // { text: '修改状态', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ]

  constructor(
    private dictPipe: DictPipe,
    private operatorService: OperatorService,
    private modalService: NzModalService,
    private pageService: PageService,
    private messageService: NzMessageService
  ) {}

  ngOnInit() {
    this.getUserList()
  }

  /**
   * 获取用户列表
   */
  public getUserList() {
    this.operatorService.getOperators(this.pageService).subscribe(data => {
      this.userDataSet = data
    })
  }

  /**
   * 创建用户
   */
  public onCreate() {
    this.modalService.create({
      nzTitle: '创建用户',
      nzContent: this.addUserComponent,
      nzOnOk: () => {
        if (!this.sf.valid) {
          this.messageService.error('请确认输入信息正确')
          return false
        }

        this.operatorService.createOperator(this.sf.value).subscribe(() => {
          this.getUserList()
          this.messageService.error('用户创建成功')
        })
      }
    })
  }
}
