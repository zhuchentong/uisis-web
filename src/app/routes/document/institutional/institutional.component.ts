import { Component, OnInit, ViewChild } from '@angular/core'
import { STColumn, STComponent } from '@delon/abc'
import { SFComponent, SFSchema } from '@delon/form'
import { PageService } from '@core/http'
import { DictPipe } from '@shared/pipes/dict.pipe'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { DocumentService } from 'app/services/document.service'
import { DocumentModel } from 'app/model/document.model'
import { Model } from 'app/model'

@Component({
  selector: 'app-document',
  templateUrl: './institutional.component.html',
  providers: [DocumentService, PageService, DictPipe]
})
export class DocumentInstitutionalComponent implements OnInit {
  public dataSet: any
  public formData = {}
  @ViewChild('st') st: STComponent

  @ViewChild('sf') sf: SFComponent

  @ViewChild('typeFormComponent') typeFormComponent

  public schema: SFSchema = {
    properties: {
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
        default: 'INSTITUTIONAL',
        ui: {
          hidden: true
        }
      },
      file: {
        type: 'string',
        ui: {
          hidden: true
        }
      },
      uploadFile: {
        type: 'string',
        title: '文档文件',
        format: 'uri'
      }
    },
    required: ['name', 'description', 'sortNo']
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
        { text: '修改', type: 'modal', click: x => this.modify(x) },
        { text: '删除', type: 'modal', click: x => this.delete(x) }
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
        { type: 'INSTITUTIONAL' },
        {
          page: this.pageService
        }
      )
      .subscribe(data => {
        this.dataSet = data
      })
  }

  public create() {
    this.formData = {}
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
    this.modalService.confirm({
      nzTitle: '<i>操作确认</i>',
      nzContent: '<b>是否确认删除该条数据?</b>',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.documentService.delete(data.id).subscribe(() => {
          this.messageService.success('删除成功')
          this.query()
        })
      }
    })
  }
}
