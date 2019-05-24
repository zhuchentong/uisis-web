import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { DocumentBusinessComponent } from './business/business.component'
import { DocumentInstitutionalComponent } from './institutional/institutional.component'

const routes: Routes = [
  { path: 'business', component: DocumentBusinessComponent },
  { path: 'institutional', component: DocumentInstitutionalComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule {}
