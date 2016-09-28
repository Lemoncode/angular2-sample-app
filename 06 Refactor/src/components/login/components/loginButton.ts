import { Component, Input, OnChanges, SimpleChange } from '@angular/core';


@Component({
  selector: 'login-button',

  template: `
      <div class="form-group">
        <div class="col-sm-1 col-sm-offset-2 col-lg-offset-4">
          <button class="btn btn-success" [routerLink]="[navigationLink]">Login</button>
        </div>
      </div>
  `
})
class LoginButton {
  @Input() navigationLink: string;
}

export {
  LoginButton
}
