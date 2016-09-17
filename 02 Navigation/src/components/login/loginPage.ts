import { Component } from '@angular/core';

@Component({
  selector: 'login',
  template: `
    <div class="row">
      <form class="form-horizontal">
        <div class="form-group">
          <label for="user" class="col-sm-2 control-label">Usuario</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="user"/>
          </div>
        </div>
        <div class="form-group">
          <label for="password" class="col-sm-2 control-label">Password</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" id="password"/>
          </div>
        </div>
      </form>
    </div>
  `
})
class LoginPage {

}

export {
  LoginPage
}
