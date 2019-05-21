import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CheckItemConfigComponent } from './item-config/item-config.component'

const routes: Routes = [{ path: 'item-config', component: CheckItemConfigComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckRoutingModule {}
