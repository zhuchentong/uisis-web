import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SystemOrganizationComponent } from './organization/organization.component'
import { SystemUserComponent } from './user/user.component'

const routes: Routes = [
  { path: 'organization', component: SystemOrganizationComponent },

  { path: 'user', component: SystemUserComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
