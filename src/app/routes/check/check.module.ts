import { NgModule } from '@angular/core'
import { SharedModule } from '@shared'
import { CheckRoutingModule } from './check-routing.module'
import { CheckItemListComponent } from './item-list/item-list.component'
import { CheckItemConfigComponent } from './item-config/item-config.component'

const COMPONENTS = []
const COMPONENTS_NOROUNT = [CheckItemListComponent, CheckItemConfigComponent]

@NgModule({
  imports: [SharedModule, CheckRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT
})
export class CheckModule {}