import { NgModule } from '@angular/core'
import { SharedModule } from '@shared'
import { DocumentRoutingModule } from './document-routing.module'
import { DocumentBusinessComponent } from './business/business.component'
import { DocumentInstitutionalComponent } from './institutional/institutional.component'

const COMPONENTS = [DocumentBusinessComponent, DocumentInstitutionalComponent]
const COMPONENTS_NOROUNT = []

@NgModule({
  imports: [SharedModule, DocumentRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT
})
export class DocumentModule {}
