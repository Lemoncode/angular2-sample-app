import { Component, Input, OnChanges, SimpleChange } from '@angular/core';


@Component({
  selector: 'login-field',

  template: `
          <div class="form-group">
            <label class="col-sm-2 col-lg-offset-2 control-label">{{caption}}</label>
            <div class="col-sm-9 col-lg-4">
              <input type="text" class="form-control" [id]="fieldId"/>
            </div>
          </div>
  `
})
class LoginField {
  @Input() caption: string;
  @Input() fieldId : string;
}

export {
  LoginField
}
