import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LaboratoryTypeComponent } from './type/type.component'
import { LaboratoryRiskLevelComponent } from './risk-level/risk-level.component'
import { LaboratoryManagementComponent } from './management/management.component'

const routes: Routes = [
  { path: 'type', component: LaboratoryTypeComponent },
  { path: 'risk-level', component: LaboratoryRiskLevelComponent },
  { path: 'managent', component: LaboratoryManagementComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaboratoryRoutingModule {}
