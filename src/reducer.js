export const initialState = {
  count1: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        [action.name]: state[action.name] + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        [action.name]: state[action.name] - 1,
      };
    default:
      return state;
  }
};

// const useValue = () => useReducer(reducer, initialState);

// const Context = createContext(null);

// const useGlobalState = () => {
//   const value = useContext(Context);
//   if (value === null) throw new Error("Please add GlobalStateProvider");
//   return value;
// };

// const GlobalStateProvider = ({ children }) => (
//   <Context.Provider value={useValue()}>{children}</Context.Provider>
// );
