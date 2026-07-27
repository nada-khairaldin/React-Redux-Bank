### Bank Account Simulator — Redux State Management
**Tech:** React, Redux Toolkit, Redux Thunk, Redux DevTools

**Key Concepts:** Classic Redux vs. Redux Toolkit, async action creators 
(thunks), slice pattern, prepare callbacks, third-party API integration

A simulated banking dashboard for deposits, withdrawals, loans, and 
customer accounts — built first with classic Redux, then refactored to 
Redux Toolkit to compare both approaches directly.

**Highlights:**
- Implemented the same state logic twice: once with classic Redux 
  (`combineReducers`, `applyMiddleware`, manual thunk setup) and once 
  with Redux Toolkit (`configureStore`, `createSlice`), to understand 
  what RTK abstracts away
- Built an async thunk action creator that converts currency via a live 
  exchange rate API before dispatching a deposit
- Used the `prepare` callback pattern to handle actions requiring 
  multiple arguments or derived data (e.g., auto-generating a timestamp 
  on customer creation)

**What I learned:** Redux Toolkit's `createSlice` uses Immer internally, 
which is why state can be "mutated" directly inside reducers without 
breaking Redux's immutability rules — a distinction that only makes 
sense after seeing the manual, non-RTK version first.

**Future Enhancements:** Replace the manual thunk with `createAsyncThunk` 
to get built-in loading/error state handling for the currency conversion call.