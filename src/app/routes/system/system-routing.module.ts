import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemOrganizationComponent } from './organization/organization.component';
import { SystemTermComponent } from './term/term.component';
import { SystemSecurityComponent } from './security/security.component';
import { SystemUserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'organization', component: SystemOrganizationComponent },
  { path: 'term', component: SystemTermComponent },
  { path: 'security', component: SystemSecurityComponent },
  { path: 'user', component: SystemUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
