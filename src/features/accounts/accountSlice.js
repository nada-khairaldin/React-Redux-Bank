const initialBalanceState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

// we usually export reducer with default , while other action function with named
export default function BalanceReducer(state = initialBalanceState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

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

    case "account/convertingCurrency":
      return { ...state, isLoading: true };

    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  else {
    // here when we call deposit in a dispatch, it will not dispatched immediately instead it will execute the returned function(api call)
    return async function (dispatch, getState) {
      dispatch({type : "account/convertingCurrency"})
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}from=${currency}&to=USD`
      );
      const data = await res.json();
      const converted = data.rates.USD;
      dispatch({ type: "account/deposit", payload: converted }); // we dispatch the action directly here in this returned function
    };
  }
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}


export function requestLoan(amount, loanPurpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, loanPurpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
