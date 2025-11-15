const initialBalanceState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

// we usually export reducer with default , while other action function with named
export default function BalanceReducer(state = initialBalanceState, action) {
  switch (action.type) {
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

    default:
      return state;
  }
}

export function deposit(amount) {
  return { type: "account/deposit", payload: amount };
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
