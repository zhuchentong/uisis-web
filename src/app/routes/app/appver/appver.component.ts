import { Component, OnInit, ViewChild } from '@angular/core'
import { _HttpClient, ModalHelper } from '@delon/theme'
import { STColumn, STComponent } from '@delon/abc'
import { SFSchema, FormProperty, PropertyGroup, SFComponent } from '@delon/form'
import { AppverService } from 'app/services/appver.service'
import { PageService } from '@core/http'
import { DictPipe } from '@shared/pipes/dict.pipe'
import { NzModalService, NzMessageService } from 'ng-zorro-antd'
import { plainToClass } from 'class-transformer'
import { AppverModel } from 'app/model/appver.model'

@Component({
  selector: 'app-app-appver',
  templateUrl: './appver.component.html',
  providers: [AppverService, PageService, DictPipe]
})
export class AppAppverComponent implements OnInit {
  public appverDataSet
  public formData = {}
  @ViewChild('st') st: STComponent

  @ViewChild('sf') sf: SFComponent

  @ViewChild('appverFormComponent') appverFormComponent

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
      },
      versionNumber: {
        type: 'integer',
        title: '版本号',
        minLength: 3
      }
    }
  }

  public columns: STColumn[] = [
    { title: '名称', index: 'name' },
    { title: '描述', index: 'description' },
    { title: '版本号', index: 'versionNumber' },
    {
      title: '操作',
      buttons: [
        { text: '修改', type: 'modal', click: x => this.onUpdate(x) }
        // { text: '删除', type: 'static', component: AddAppverComponent, click: 'reload' }
      ]
    }
  ]

  constructor(
    private dictPipe: DictPipe,
    private appverService: AppverService,
    private modalService: NzModalService,
    private pageService: PageService,
    private messageService: NzMessageService
  ) {}

  ngOnInit() {
    this.getAppverList()
  }

  /**
   * 获取App版本列表
   */
  public getAppverList() {
    this.appverService.getAppvers(this.pageService).subscribe(data => {
      this.appverDataSet = data
      console.log(data)
    })
  }

  /**
   * 创建App版本
   */
  public onCreate() {
    this.formData = {}
    this.modalService.create({
      nzTitle: '创建APP版本',
      nzContent: this.appverFormComponent,
      nzOnOk: () => {
        if (!this.sf.valid) {
          this.messageService.error('请确认输入信息正确')
          return false
        }

        this.appverService.createAppver(this.sf.value).subscribe(() => {
          this.getAppverList()
          this.messageService.error('用户App版本成功')
        })
      }
    })
  }

  /**
   * 更新App版本信息
   */
  public onUpdate(data) {
    this.formData = data
    this.modalService.create({
      nzTitle: '修改APP版本',
      nzContent: this.appverFormComponent,
      nzOnOk: () => {
        if (!this.sf.valid) {
          this.messageService.error('请确认输入信息正确')
          return false
        }
        const model = plainToClass(AppverModel, this.sf.value)
        // 获取参数
        this.appverService.updateAppver(model).subscribe(() => {
          this.getAppverList()
          this.messageService.error('更新App版本信息成功')
        })
      }
    })
  }
}
