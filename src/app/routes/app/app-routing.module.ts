import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AppAppverComponent } from './appver/appver.component'

const routes: Routes = [{ path: 'appver', component: AppAppverComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
