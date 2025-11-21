import { createSlice } from "@reduxjs/toolkit";

/* with createSlice we could  1- create action creators automatically from reducers 
2 - no need for switch and default value is handled 
3 - we use state in an mutate way */

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  // we will have multiple reducers , one for each action
  reducers: {
    // Note that the name of slice and reducer same as case value in classical redux , "sliceName / reducerName"
    deposit(state, action) {
      state.balance += action.payload; // it is mutated ! no need to create a new object
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        // here return will not return the state , instead it will just return from the function
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.loanPurpose;
      },
    },

    payLoan(state) {
      // note the order of expressions as it is mutated ones , such ad here the balance change should be done before assign zero to loan
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;

console.log(
  accountSlice
); /* this object has many properties that we have to use , such as reducer -> our slice's reducer
actions object -> our actions creator functions */

console.log(deposit(1000)); // will return the returned statement from action creator function -> {type: 'account/deposit', payload: 1000}
console.log(requestLoan(2000, "buy a car")); // -> {type: 'account/requestLoan', payload: 2000} without the second argument !!

/* NOTE : the automatic action creator cannot take MORE THAN ONE ARGUMENT ! so we have to use prepare method (it and reducer are properties of a standalone requestLoan property) which takes the data we need as arguments and return them as an object of a payload property of the returned object which we could use them in the reducer method  */

// we usually export reducer with default , while other action function with named
// export default function BalanceReducer(state = initialBalanceState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };

//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };

//     case "account/requestLoan":
//       if (state.loan > 0) return;
//       return {
//         ...state,
//         balance: state.balance - action.payload.amount,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.loanPurpose,
//       };

//     case "account/payLoan":
//       return { ...state, balance: 0, loan: 0, loanPurpose: "" };

//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };

//     default:
//       return state;
//   }
// }

// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };
//   else {
//     // here when we call deposit in a dispatch, it will not dispatched immediately instead it will execute the returned function(api call)
//     return async function (dispatch, getState) {
//       dispatch({type : "account/convertingCurrency"})
//       const res = await fetch(
//         `https://api.frankfurter.app/latest?amount=${amount}from=${currency}&to=USD`
//       );
//       const data = await res.json();
//       const converted = data.rates.USD;
//       dispatch({ type: "account/deposit", payload: converted }); // we dispatch the action directly here in this returned function
//     };
//   }
// }

// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }

// export function requestLoan(amount, loanPurpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount, loanPurpose },
//   };
// }

// export function payLoan() {
//   return { type: "account/payLoan" };
// }
