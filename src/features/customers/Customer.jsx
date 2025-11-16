import { useSelector } from "react-redux";

function Customer() {
  // 2- consume the store by using useSelector
 // we add any logic that we need when selecting values from store to the callback function in the useReducer
  const customer = useSelector((store) => store.customer.fullName);
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
