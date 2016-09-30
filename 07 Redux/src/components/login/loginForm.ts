import { Component } from '@angular/core';

@Component({
  selector: 'login-form',
  template: `
    <div class="container-fluid">
      <div class="row">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="user" class="col-sm-2 col-lg-offset-2 control-label">User</label>
            <div class="col-sm-9 col-lg-4">
              <input type="text" class="form-control" id="user"/>
            </div>
          </div>
          <div class="form-group">
            <label for="password" class="col-sm-2 col-lg-offset-2 control-label">Password</label>
            <div class="col-sm-9 col-lg-4">
              <input type="password" class="form-control" id="password"/>
            </div>
          </div>
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
