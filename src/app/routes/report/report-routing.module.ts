import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ReportAnalyseComponent } from './analyse/analyse.component'
import { ReportRectifyComponent } from './rectify/rectify.component'
import { ReportChecklabComponent } from './checklab/checklab.component'

const routes: Routes = [
  { path: 'analyse', component: ReportAnalyseComponent },
  { path: 'rectify', component: ReportRectifyComponent },
  { path: 'checklab', component: ReportChecklabComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {}
