import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LaboratoryTypeComponent } from './type/type.component'

const routes: Routes = [{ path: 'type', component: LaboratoryTypeComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaboratoryRoutingModule {}
