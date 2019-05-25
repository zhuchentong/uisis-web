import { NgModule } from '@angular/core'
import { SharedModule } from '@shared'
import { CheckRoutingModule } from './check-routing.module'
import { CheckItemListComponent } from './item-list/item-list.component'
import { CheckItemConfigComponent } from './item-config/item-config.component'
import { CheckRecordComponent } from './record/record.component'
import { CheckReviewComponent } from './review/review.component'
import { CheckRecordDetailComponent } from './record-detail/record-detail.component'

const COMPONENTS = [CheckRecordComponent, CheckReviewComponent]
const COMPONENTS_NOROUNT = [CheckItemListComponent, CheckItemConfigComponent, CheckRecordDetailComponent]

@NgModule({
  imports: [SharedModule, CheckRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT
})
export class CheckModule {}
