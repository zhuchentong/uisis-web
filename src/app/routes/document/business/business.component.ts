import { Component, OnInit, ViewChild } from '@angular/core'
import { STColumn, STComponent } from '@delon/abc'
import { SFComponent, SFSchema } from '@delon/form'
import { PageService } from '@core/http'
import { DictPipe } from '@shared/pipes/dict.pipe'
import { NzMessageService, NzModalService, UploadChangeParam, UploadFile } from 'ng-zorro-antd'
import { DocumentService } from 'app/services/document.service'
import { DocumentModel } from 'app/model/document.model'
import { Model } from 'app/model'
import { appConfig } from 'app/config/app.config'
import { saveAs } from 'file-saver'
@Component({
  selector: 'app-document',
  templateUrl: './business.component.html',
  providers: [DocumentService, PageService, DictPipe]
})
export class DocumentBusinessComponent implements OnInit {
  public dataSet: any
  public formData: any
  @ViewChild('st') st: STComponent

  @ViewChild('sf') sf: SFComponent

  @ViewChild('typeFormComponent') typeFormComponent

  public schema: SFSchema = {
    properties: {
      id: {
        type: 'string',
        ui: {
          hidden: true
        }
      },
      title: {
        type: 'string',
        title: '标题',
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
      type: {
        type: 'string',
        default: 'BUSINESS',
        ui: {
          hidden: true
        }
      },
      file: {
        type: 'string',
        title: '上传文件',
        ui: {
          visibleIf: {
            id: value => !value
          },
          widget: 'upload',
          action: `${appConfig.server}/uploadFile/upload`,
          limit: 1,
          resReName: 'id',
          urlReName: 'url',
          preview: (file: UploadFile) => {
            saveAs(`${appConfig.attach}/${file.url}`, file.originalName || file.response.originalName)
          }
        }
      }
    },
    required: ['name', 'description', 'file']
  }

  public columns: STColumn[] = [
    { title: '标题', index: 'title', width: 100 },
    { title: '描述', index: 'description' },
    { title: '创建人', index: 'creator.realName' },
    { title: '修改人', index: 'updater.realName' },
    { title: '更新时间', index: 'updateTime', type: 'date' },
    {
      title: '操作',
      width: 100,
      fixed: 'right',
      buttons: [
        { text: '修改', type: 'none', click: x => this.modify(x) },
        {
          text: '下载',
          type: 'none',
          click: x => {
            saveAs(`${appConfig.attach}/${x.file.url}`, x.file.originalName)
          }
        },
        { text: '删除', type: 'del', click: x => this.delete(x) }
      ]
    }
  ]

  constructor(
    private dictPipe: DictPipe,
    private documentService: DocumentService,
    private modalService: NzModalService,
    public pageService: PageService,
    private messageService: NzMessageService
  ) {}

  ngOnInit() {
    this.query()
  }

  public query() {
    this.documentService
      .query(
        { type: 'BUSINESS' },
        {
          page: this.pageService
        }
      )
      .subscribe(data => {
        this.dataSet = data
      })
  }

  public create() {
    this.formData = null
    this.modalService.create({
      nzTitle: '新增文档',
      nzContent: this.typeFormComponent,
      nzOnOk: () => {
        if (!this.sf.valid) {
          this.messageService.error('请确认输入信息正确')
          return false
        }

        this.documentService.create(this.sf.value).subscribe(() => {
          this.query()
          this.messageService.success('创建成功')
        })
      }
    })
  }

  public modify(data) {
    this.formData = data
    this.modalService.create({
      nzTitle: '修改文档',
      nzContent: this.typeFormComponent,
      nzOnOk: () => {
        if (!this.sf.valid) {
          this.messageService.error('请确认输入信息正确')
          return false
        }
        // 获取类型实体
        const model = Model.from(DocumentModel, this.sf.value)
        // 获取参数
        this.documentService.modify(model).subscribe(() => {
          this.query()
          this.messageService.success('更新成功')
        })
      }
    })
  }

  public delete(data) {
    this.documentService.delete(data.id).subscribe(() => {
      this.messageService.success('删除成功')
      this.query()
    })
  }
}
