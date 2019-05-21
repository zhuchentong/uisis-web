import { NgModule } from '@angular/core'
import { SharedModule } from '@shared'
import { AppRoutingModule } from './app-routing.module'
import { AppAppverComponent } from './appver/appver.component'

const COMPONENTS = [AppAppverComponent]
const COMPONENTS_NOROUNT = []

@NgModule({
  imports: [SharedModule, AppRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT
})
export class AppModule {}
