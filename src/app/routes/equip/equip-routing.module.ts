import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { EquipEquipmentComponent } from './equipment/equipment.component'

const routes: Routes = [{ path: 'equipment', component: EquipEquipmentComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipRoutingModule {}
