import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
// delon
import { AlainThemeModule } from '@delon/theme'
import { DelonABCModule } from '@delon/abc'
import { DelonACLModule } from '@delon/acl'
import { DelonFormModule } from '@delon/form'
// i18n
import { TranslateModule } from '@ngx-translate/core'

// #region third libs
import { NgZorroAntdModule } from 'ng-zorro-antd'
import { CountdownModule } from 'ngx-countdown'
import { DictPipe } from './pipes/dict.pipe'
const THIRDMODULES = [NgZorroAntdModule, CountdownModule]
// #endregion

// #region your componets & directives
const COMPONENTS = []
const DIRECTIVES = []
const PIPES = [DictPipe]
// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,
    // third libs
    ...THIRDMODULES
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,
    // i18n
    TranslateModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ]
})
export class SharedModule {}
