# 02 Navigation

Let's get started working with navigation.

In this demo will navigate from Login page to Patients list page.

We will start from sample 01 Hello angular.

Summary steps:
- Create App started component.
- Create Header component
- Create Login component
- Create Patients component
- Install and configure router.

# App component

This is our started component, that is, It's like a "container" where we put other components.

## Definition:
#### src/components/app.ts

```
import { Component } from '@angular/core';

@Component(
  {
    selector: 'app',
    template: `
      <div class="container-fluid">
        <header></header>
      </div>
    `
  }
)
class App {

}

export {
  App
}
```

## Configuration
