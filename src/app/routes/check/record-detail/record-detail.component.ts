import { Component, OnInit, Input } from '@angular/core'
import { _HttpClient, DatePipe } from '@delon/theme'
import { ActivatedRoute } from '@angular/router'
import { CheckLabService } from 'app/services/check-lab.service'
import { STColumn } from '@delon/abc'
import { appConfig } from 'app/config/app.config'
import { saveAs } from 'file-saver'
@Component({
  selector: 'app-check-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.less'],
  providers: [CheckLabService, DatePipe]
})
export class CheckRecordDetailComponent implements OnInit {
  @Input()
  id

  public appConfig = appConfig
  public record
  public content = []

  constructor(private route: ActivatedRoute, private checkLabService: CheckLabService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.getRecordDetail()
    this.getRecordContent()
  }

  getRecordDetail() {
    this.checkLabService.getRecord(this.id).subscribe(data => {
      this.record = data
    })
  }

  getRecordContent() {
    this.checkLabService.findRecordContent(this.id).subscribe(data => {
      console.log(11, data)
      this.content = data
    })
  }

  download(file) {
    saveAs(`${appConfig.attach}/${file.url}`, file.originalName || file.originalName)
  }
}
