import { Store, StoreEnhancer, createStore, compose } from 'redux';
import { AppState, reducers } from './reducers';
import { OpaqueToken } from '@angular/core';

let devTools: StoreEnhancer<AppState> =
  window['devToolsExtension'] ?
  window['devToolsExtension']() :
  f => f;

export let store: Store<AppState> = createStore<AppState>(
  reducers,
  compose(
    devTools
  )
);

//Due to Store from Redux is an interface and we can't use interfaces as a
//dependency injection key, we need to define something to be inyectable.
//Angular provides OpaqueToken that it's a better choice thant injecting
//a string directly because it helps us avoid collisions.
export const AppStore = new OpaqueToken('App.store');
