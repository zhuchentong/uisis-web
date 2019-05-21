import { NgModule } from '@angular/core'
import { SharedModule } from '@shared'
import { EquipRoutingModule } from './equip-routing.module'
import { EquipEquipmentComponent } from './equipment/equipment.component'

const COMPONENTS = [EquipEquipmentComponent]
const COMPONENTS_NOROUNT = []

@NgModule({
  imports: [SharedModule, EquipRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT
})
export class EquipModule {}
