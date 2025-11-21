import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import {thunk} from 'redux-thunk'
import { composeWithDevTools } from "@redux-devtools/extension";


const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// store takes one combining reducer as a root
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))); //applyMiddleware is a redux function

export default store;

/*
1: how does the store know which reducer to use -> This is based entirely on the action type.

2: Do type names have to be unique? -> This is not a rule. But mostly, yes. Each action has a distinct type name and the corresponding reducer gets invoked.

3: To whom or what does the reducer pass the new state object to, the store or the action? -> The reducer does not pass the new state object anywhere. Basically, it triggers a state change event to all your react components that are listening to it. All components listening to the changed state get re-rendered, with the new version of the state, thereby updating your DOM.
*/


 /*  createStore(rootReducer, enhancer )
  Enhancer = a function that extends the store's capabilities.
  It wraps the store to add extra features like middleware, DevTools, logging, etc.
  It doesn’t change Redux logic, it just enhances the store behavior. 
 */ 