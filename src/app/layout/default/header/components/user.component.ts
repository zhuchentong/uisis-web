import { Component, Inject, ChangeDetectionStrategy, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { SettingsService } from '@delon/theme'
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth'
import { SFComponent, SFSchema, FormProperty, PropertyGroup } from '@delon/form'
import { NzModalService, NzMessageService } from 'ng-zorro-antd'
import { OperatorService } from 'app/services/operator.service'

@Component({
  selector: 'header-user',
  template: `
    <nz-dropdown nzPlacement="bottomRight">
      <div class="alain-default__nav-item d-flex align-items-center px-sm" nz-dropdown>
        <nz-avatar [nzSrc]="settings.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
        {{ settings.user.name }}
      </div>
      <div nz-menu class="width-sm">
        <!--<div nz-menu-item routerLink="/pro/account/center">
          <i nz-icon nzType="user" class="mr-sm"></i>
          {{ 'menu.account.center' | translate }}
        </div>
        <div nz-menu-item routerLink="/pro/account/settings">
          <i nz-icon nzType="setting" class="mr-sm"></i>
          {{ 'menu.account.settings' | translate }}
        </div>-->
        <div nz-menu-item (click)="modifyPassword()">
          <i nz-icon nzType="setting" class="mr-sm"></i>
          修改密码
        </div>
        <!--<div nz-menu-item routerLink="/exception/trigger">
          <i nz-icon nzType="close-circle" class="mr-sm"></i>
          {{ 'menu.account.trigger' | translate }}
        </div>-->
        <li nz-menu-divider></li>
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          {{ 'menu.account.logout' | translate }}
        </div>
      </div>
    </nz-dropdown>
    <ng-template #modifyPasswordComponent>
      <sf #sf [button]="null" [schema]="schema" [formData]="formData"></sf>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [OperatorService]
})
export class HeaderUserComponent {
  @ViewChild('modifyPasswordComponent')
  public modifyPasswordComponent

  @ViewChild('sf') sf: SFComponent
  formData = {}

  schema: SFSchema = {
    properties: {
      oldPassword: {
        type: 'string',
        title: '旧密码',
        ui: {
          type: 'password'
        },
        minLength: 6
      },
      newPassword: {
        type: 'string',
        title: '新密码',
        ui: {
          type: 'password'
        },
        minLength: 6
      },
      rePassword: {
        type: 'string',
        title: '确认密码',
        ui: {
          type: 'password',
          validator: (value: any, formProperty: FormProperty, form: PropertyGroup) => {
            if (!value) {
              return [{ keyword: 'required', message: '请输入密码' }]
            }

            if (value !== form.value.newPassword) {
              return [{ keyword: 'required', message: '输入密码不一致' }]
            } else {
              return []
            }
          }
        },
        minLength: 6
      }
    },
    required: ['oldPassword', 'newPassword', 'rePassword']
  }
  constructor(
    public settings: SettingsService,
    private router: Router,
    private modalService: NzModalService,
    private operatorService: OperatorService,
    private messageService: NzMessageService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService
  ) {}

  logout() {
    this.tokenService.clear()
    this.router.navigateByUrl(this.tokenService.login_url)
  }

  modifyPassword() {
    this.modalService.create({
      nzTitle: '消息提醒',
      nzContent: this.modifyPasswordComponent,
      nzOnOk: () => {
        this.sf.validator()
        if (!this.sf.valid) {
          return false
        }

        this.operatorService
          .changeOperatorPassword({
            newPassword: this.sf.value.newPassword,
            oldPassword: this.sf.value.oldPassword
          })
          .subscribe(data => {
            this.messageService.success('修改成功')
          })
      },
      nzMaskClosable: false
    })
  }
}
