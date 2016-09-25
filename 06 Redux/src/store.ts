import { Store, StoreEnhancer, createStore, compose, applyMiddleware  } from 'redux';
import { AppState, reducers } from './reducers';
import { OpaqueToken } from '@angular/core';
import ReduxThunk from 'redux-thunk';

let devTools: StoreEnhancer<AppState> =
  window['devToolsExtension'] ?
  window['devToolsExtension']() :
  f => f;

export let store: Store<AppState> = createStore<any>(
  reducers,
  compose(
    applyMiddleware(ReduxThunk),
    devTools
  )
);

//Due to Store from Redux is an interface and we can't use interfaces as a
//dependency injection key, we need to define something to be inyectable.
//Angular provides OpaqueToken that it's a better choice thant injecting
//a string directly because it helps us avoid collisions.
export const AppStore = new OpaqueToken('App.store');
