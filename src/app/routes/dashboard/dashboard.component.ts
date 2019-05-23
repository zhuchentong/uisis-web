import { Component, OnInit } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { DelonChartModule } from '@delon/chart'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  salesData = [
    { x: '1月', y: 5 },
    { x: '2月', y: 6 },
    { x: '3月', y: 4 },
    { x: '4月', y: 8 },
    { x: '5月', y: 7 },
    { x: '6月', y: 0 },
    { x: '7月', y: 0 },
    { x: '8月', y: 0 },
    { x: '9月', y: 0 },
    { x: '10月', y: 0 },
    { x: '11月', y: 0 },
    { x: '12月', y: 0 }
  ]
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
