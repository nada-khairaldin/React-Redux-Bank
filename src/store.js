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

store.dispatch(deposit(5000)); // we dispatch from store !
console.log(store.getState());

store.dispatch(withdraw(50));
console.log(store.getState());

store.dispatch(requestLoan(2000, "bay a car"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

// we define Action Function for every action type , this a convention not a rule in redux

// some old developer were used to declare a const for the type name instead of declaring it with string , and use it in action & reducer function
// const ACCOUNT_DEPOSIT = "account/deposit"

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, loanPurpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, loanPurpose },
  };
}

function payLoan() {
  return { type: "account/payLoan" };
}
