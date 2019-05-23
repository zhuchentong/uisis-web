import { Component, OnInit, ViewChild } from '@angular/core'
import { _HttpClient, ModalHelper } from '@delon/theme'
import { STColumn, STComponent } from '@delon/abc'
import { SFSchema, FormProperty, PropertyGroup, SFComponent } from '@delon/form'
import { ReportAnalyseService } from 'app/services/reportAnalyse.service'
import { PageService } from '@core/http'
import { DictPipe } from '@shared/pipes/dict.pipe'
import { NzModalService, NzMessageService } from 'ng-zorro-antd'
import { plainToClass } from 'class-transformer'
import { ReportAnalyseModel } from 'app/model/reportAnalyse.model'
import { Model } from 'app/model'

@Component({
  selector: 'app-report-analyse',
  templateUrl: './analyse.component.html',
  providers: [ReportAnalyseService, PageService, DictPipe]
})
export class ReportAnalyseComponent implements OnInit {
  public reportAnalyseDataSet
  public formData = {}
  @ViewChild('st') st: STComponent

  @ViewChild('sf') sf: SFComponent

  public columns: STColumn[] = [
    { title: '编号', index: 'num' },
    { title: '实验室', index: 'laboratory' },
    { title: '监察人', index: 'checker' },
    { title: '整改人', index: 'rectifyer' },
    { title: '审核人', index: 'verifyer' },
    { title: '单位', index: 'unit' },
    { title: '区域', index: 'domain' },
    { title: '创建时间', index: 'createTime' }
  ]

  constructor(private reportAnalyseService: ReportAnalyseService, private pageService: PageService) {}

  ngOnInit() {
    this.getReportAnalyseList()
  }

  /**
   * 获取设备信息列表
   */
  public getReportAnalyseList() {
    this.reportAnalyseService.getReportAnalyses(this.pageService).subscribe(data => {
      this.reportAnalyseDataSet = data
    })
  }
}
