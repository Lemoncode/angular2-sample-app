import { Component } from '@angular/core';

@Component(
  {
    selector: 'header',
    template: `
      <div class="row">
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" [routerLink]="['/login']">My App</a>
            </div>
          </div>
        </nav>
      </div>
    `
  }
)
class Header {

}

export {
  Header
}
