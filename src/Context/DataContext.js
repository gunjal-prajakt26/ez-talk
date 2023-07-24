import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { dispatch } from "../Reducer/DataReducer";
import { AuthContext } from "./AuthConetxt";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const initialValue = { allPosts: [], users: [], bookmarks: [],filter:'' };
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useReducer(dispatch, initialValue);
  const { user, token } = useContext(AuthContext);

  // console.log(data.allPosts);
  return (
    <>
      <DataContext.Provider value={{ data, setData, isLoad, isError,setIsLoad, setIsError}}>
        {children}
      </DataContext.Provider>
    </>
  );
}
