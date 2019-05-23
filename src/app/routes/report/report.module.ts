import { NgModule } from '@angular/core'
import { SharedModule } from '@shared'
import { ReportRoutingModule } from './report-routing.module'
import { ReportAnalyseComponent } from './analyse/analyse.component'
import { ReportRectifyComponent } from './rectify/rectify.component'
import { ReportChecklabComponent } from './checklab/checklab.component'

const COMPONENTS = [ReportAnalyseComponent, ReportRectifyComponent, ReportChecklabComponent]
const COMPONENTS_NOROUNT = []

@NgModule({
  imports: [SharedModule, ReportRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT
})
export class ReportModule {}
