import { createStore } from "redux";

const initialBalanceState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

// usually with reducer we assign initial value for state
function BalanceReducer(state = initialBalanceState, action) {
  switch (action.type) {
    // action type name (stateDomain / eventName )
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return;
      return {
        ...state,
        balance: state.balance - action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
      };

    case "account/payLoan":
      return { ...state, balance: 0, loan: 0, loanPurpose: "" };

    // we used to throw an error in default with useReducer , but with redux we return the state
    default:
      return state;
  }
}

const store = createStore(BalanceReducer);

store.dispatch({ type: "account/deposit", payload: 5000 }); // we dispatch from store !
console.log(store.getState());

store.dispatch({ type: "account/withdraw", payload: 50 });
console.log(store.getState());

store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 2000, loanPurpose: "buy a car" },
});
console.log(store.getState());
