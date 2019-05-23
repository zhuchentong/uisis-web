import { Component, OnInit } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { DelonChartModule } from '@delon/chart'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  salesData: any[] = new Array(5).fill({}).map((_i, idx) => ({
    x: `${idx + 1}月`,
    y: Math.floor(Math.random() * 5)
  }))
  percent = 87
  color = '#2f9cff'
  salesPieData = [
    {
      x: '规章制度',
      y: 2
    },
    {
      x: '安全教育',
      y: 3
    },
    {
      x: '设备',
      y: 2
    },
    {
      x: '消防安全',
      y: 3
    },
    {
      x: '组织体系',
      y: 4
    },
    {
      x: '化学安全',
      y: 1
    },
    {
      x: '机电等安全',
      y: 1
    },
    {
      x: '安全检查',
      y: 1
    },
    {
      x: '实验场所',
      y: 1
    },
    {
      x: '基础安全',
      y: 6
    },
    {
      x: '安全设施',
      y: 4
    },
    {
      x: '辐射安全',
      y: 1
    },
    {
      x: '生物安全',
      y: 1
    }
  ]
  total: string

  constructor(private http: _HttpClient) {}

  ngOnInit() {
    this.total = `28`
  }
}
