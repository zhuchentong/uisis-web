import { Component, OnInit, ViewChild } from '@angular/core'
import { NzModalRef } from 'ng-zorro-antd'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: []
})
export class UploadComponent implements OnInit {
  @ViewChild('upload')
  private upload: UploadComponent

  public readonly uploadAction = 'http://106.12.17.212:8000/api/uploadFile/upload'
  constructor(private modal: NzModalRef) {}
  public fileList = []
  ngOnInit() {}

  public submit() {
    this.modal.close(this.fileList.map(x => x.response))
  }

  handleChange({ file, fileList }: { [key: string]: any }): void {
    this.fileList = fileList
  }

  public close() {
    this.modal.destroy()
  }
}
