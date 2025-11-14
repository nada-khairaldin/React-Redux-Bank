import { combineReducers, createStore } from "redux";

const initialBalanceState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialCustomerState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
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

function CustomerReducer(state = initialCustomerState, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  BalanceReducer,
  CustomerReducer,
});

// store takes one combining reducer as a root
const store = createStore(rootReducer);

store.dispatch(deposit(5000)); // we dispatch from store !
console.log(store.getState());

store.dispatch(withdraw(50));
console.log(store.getState());

store.dispatch(requestLoan(2000, "bay a car"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

store.dispatch(createCustomer("nada khairaldin", "66666"));
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

// we named the action creator with the same name of the event in the action type
function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
  // we gave the date value inside action function (dispatch) not inside reducer , because we should not add any sideEffect to reducer function
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}
