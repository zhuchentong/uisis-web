import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CheckItemConfigComponent } from './item-config/item-config.component'
import { CheckRecordComponent } from './record/record.component'
import { CheckReviewComponent } from './review/review.component'
import { CheckRecordDetailComponent } from './record-detail/record-detail.component'

const routes: Routes = [
  { path: 'item-config', component: CheckItemConfigComponent },
  { path: 'record', component: CheckRecordComponent },
  { path: 'review', component: CheckReviewComponent },
  { path: 'record-detail', component: CheckRecordDetailComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckRoutingModule {}
