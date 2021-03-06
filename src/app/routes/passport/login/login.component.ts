import { SettingsService, _HttpClient } from '@delon/theme'
import { Component, OnDestroy, Inject, Optional } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { SocialService, SocialOpenType, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth'
import { ReuseTabService } from '@delon/abc'
import { environment } from '@env/environment'
import { StartupService } from '@core'
import { OperatorService } from 'app/services/operator.service'

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [OperatorService, SocialService]
})
export class UserLoginComponent implements OnDestroy {
  form: FormGroup
  error = ''
  type = 0
  count = 0
  interval$: any

  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    private router: Router,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    public msg: NzMessageService,
    private operatorService: OperatorService,
    private settingsService: SettingsService
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]],
      remember: [true]
    })
    modalSrv.closeAll()
  }

  // #region fields

  get userName() {
    return this.form.controls.userName
  }
  get password() {
    return this.form.controls.password
  }
  get mobile() {
    return this.form.controls.mobile
  }
  get captcha() {
    return this.form.controls.captcha
  }

  // #endregion

  switch(ret: any) {
    this.type = ret.index
  }

  // #region get captcha

  getCaptcha() {
    if (this.mobile.invalid) {
      this.mobile.markAsDirty({ onlySelf: true })
      this.mobile.updateValueAndValidity({ onlySelf: true })
      return
    }
    this.count = 59
    this.interval$ = setInterval(() => {
      this.count -= 1
      if (this.count <= 0) clearInterval(this.interval$)
    }, 1000)
  }

  // #endregion

  submit() {
    this.error = ''
    if (this.type === 0) {
      this.userName.markAsDirty()
      this.userName.updateValueAndValidity()
      this.password.markAsDirty()
      this.password.updateValueAndValidity()
      if (this.userName.invalid || this.password.invalid) return
    } else {
      this.mobile.markAsDirty()
      this.mobile.updateValueAndValidity()
      this.captcha.markAsDirty()
      this.captcha.updateValueAndValidity()
      if (this.mobile.invalid || this.captcha.invalid) return
    }

    // ????????????????????????HTTP?????????????????? [??????](https://ng-alain.com/auth/getting-started) ?????? Token
    // ??????????????????????????????????????????????????????????????????URL?????????`/login?_allow_anonymous=true` ????????????????????? Token ??????
    this.operatorService
      .login({
        username: this.userName.value,
        password: this.password.value
      })
      .subscribe(({ token, operatorResponse }) => {
        // ????????????????????????
        this.reuseTabService.clear()
        // ????????????Token??????
        this.tokenService.set({
          token,
          ...operatorResponse
        })

        this.settingsService.setUser({
          name: operatorResponse.realName,
          avatar: './assets/tmp/img/avatar.png',
          token
        })

        this.router.navigateByUrl('/')
      })
  }

  // #region social

  open(type: string, openType: SocialOpenType = 'href') {
    let url = ``
    let callback = ``
    if (environment.production) {
      callback = 'https://ng-alain.github.io/ng-alain/#/callback/' + type
    } else {
      callback = 'http://localhost:4200/#/callback/' + type
    }
    switch (type) {
      case 'auth0':
        url = `//cipchk.auth0.com/login?client=8gcNydIDzGBYxzqV0Vm1CX_RXH-wsWo5&redirect_uri=${decodeURIComponent(
          callback
        )}`
        break
      case 'github':
        url = `//github.com/login/oauth/authorize?client_id=9d6baae4b04a23fcafa2&response_type=code&redirect_uri=${decodeURIComponent(
          callback
        )}`
        break
      case 'weibo':
        url = `https://api.weibo.com/oauth2/authorize?client_id=1239507802&response_type=code&redirect_uri=${decodeURIComponent(
          callback
        )}`
        break
    }
    if (openType === 'window') {
      this.socialService
        .login(url, '/', {
          type: 'window'
        })
        .subscribe(res => {
          if (res) {
            // this.settingsService.setUser(res)
            this.router.navigateByUrl('/')
          }
        })
    } else {
      this.socialService.login(url, '/', {
        type: 'href'
      })
    }
  }

  // #endregion

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$)
  }
}
