import { NgModule } from '@angular/core'
import { SharedModule } from '@shared'
import { SystemRoutingModule } from './system-routing.module'
import { SystemOrganizationComponent } from './organization/organization.component'
import { SystemUserComponent } from './user/user.component'

const COMPONENTS = [SystemOrganizationComponent, SystemUserComponent]
const COMPONENTS_NOROUNT = []

@NgModule({
  imports: [SharedModule, SystemRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT
})
export class SystemModule {}
