import { Component } from '@angular/core';

@Component({
  selector: 'login-form',
  template: `
    <div class="container-fluid">
      <div class="row">
        <form class="form-horizontal">
          <login-field [caption]="'user'" [fieldId]="'user'"></login-field>
          <login-field [caption]="'password'" [fieldId]="'password'"></login-field>
          <login-button [navigationLink]="navigationLink"></login-button>
        </form>
      </div>
    </div>
  `
})
class LoginForm {
  navigationLink = "/patients";
}

export {
  LoginForm
}
