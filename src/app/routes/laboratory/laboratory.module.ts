import { NgModule } from '@angular/core'
import { SharedModule } from '@shared'
import { LaboratoryRoutingModule } from './laboratory-routing.module'
import { LaboratoryTypeComponent } from './type/type.component'

const COMPONENTS = [LaboratoryTypeComponent]
const COMPONENTS_NOROUNT = []

@NgModule({
  imports: [SharedModule, LaboratoryRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT
})
export class LaboratoryModule {}
