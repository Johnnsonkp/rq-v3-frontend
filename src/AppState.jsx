import React, {useReducer} from "react"; 

/* ///////////////////////////////////////////////// */
                // INITIAL STATE
/* ///////////////////////////////////////////////// */

const initialState = {
    counter: 0
};

/* ///////////////////////////////////////////////// */
                // REDUCER
/* ///////////////////////////////////////////////// */

const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        case "increment":
            newState = {...state, ...action.payload + 1};
            return newState;
    }
};

/* ///////////////////////////////////////////////// */
                // Appcontext
/* ///////////////////////////////////////////////// */

const AppContext = React.createContext(null);

/* ///////////////////////////////////////////////// */
                // Appstate Component
/* ///////////////////////////////////////////////// */

export const AppState = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch}}>
            {props.children}
        </AppContext.Provider>
    );
};

/* ///////////////////////////////////////////////// */
                // useAppState hook
/* ///////////////////////////////////////////////// */

export const useAppState = () => {
    return React.useContext(AppContext)
};