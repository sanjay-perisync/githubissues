// import {
//     useDispatch as useReduxDispatch,
//     useSelector as useReduxSelector,
//   } from "react-redux";
//   import { configureStore } from "@reduxjs/toolkit";
//   import bufferMiddleware from "./BufferMiddleware";
//   import { rootReducer } from "./root-reducer";
//   import logger from "redux-logger";
  
//   // const middleware = [logger, bufferMiddleware]
//   const middleware = [];
//     middleware.push(logger);
//   middleware.push(bufferMiddleware);
//   export const store = configureStore({
//     reducer: {
//       rootReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: false,
//       }).concat(middleware),
//     // devTools: enableDevTools
//   });
  
//   export const useSelector = useReduxSelector;
  
//   export const useDispatch = () => useReduxDispatch();
  



import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./RootReducers";
import logger from "redux-logger";

const middleware = [];
middleware.push(logger);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware),
});

export const useSelector = useReduxSelector;
export const useDispatch = () => useReduxDispatch();


