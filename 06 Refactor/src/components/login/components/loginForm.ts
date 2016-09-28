import { Component } from '@angular/core';

@Component({
  selector: 'login-form',
  template: `
    <div class="container-fluid">
      <div class="row">
        <form class="form-horizontal">
          <login-field [caption]="'user'" [fieldId]="'user'"></login-field>
          <login-field [caption]="'password'" [fieldId]="'password'"></login-field>
          <div class="form-group">
            <div class="col-sm-1 col-sm-offset-2 col-lg-offset-4">
              <button class="btn btn-success" [routerLink]="['/patients']">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `
})
class LoginForm {
}

export {
  LoginForm
}
