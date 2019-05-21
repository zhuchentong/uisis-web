import { NgModule } from '@angular/core'
import { SharedModule } from '@shared'
import { LaboratoryRoutingModule } from './laboratory-routing.module'
import { LaboratoryTypeComponent } from './type/type.component'
import { LaboratoryRiskLevelComponent } from './risk-level/risk-level.component'

const COMPONENTS = [LaboratoryTypeComponent, LaboratoryRiskLevelComponent]
const COMPONENTS_NOROUNT = []

@NgModule({
  imports: [SharedModule, LaboratoryRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT
})
export class LaboratoryModule {}
