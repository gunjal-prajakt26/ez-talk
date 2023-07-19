// import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";


export const DataContext= createContext();

const dispatch=(state, action)=>{

  const {type, payload}= action;

  switch (type) {
    case "SET_POSTS":
      return {...state, allPosts:[...payload]}
      break;
    case "SET_USERS":
      return {...state, users:[...payload]}
      break;
  
    default:
      break;
  }

}


export function DataProvider({children}){
  const initialValue= {allPosts:[], users:[]}
  const [isLoad, setIsLoad]= useState(false);
  const [isError, setIsError]= useState(false);
  const [data, setData]= useReducer(dispatch,initialValue);

      useEffect(() => {
        setIsLoad(true);
        (async () => {
            try {
              const dataResponse= await fetch("/api/posts");
              const list=await dataResponse.json();
              setData({type:"SET_POSTS",payload:list.posts});
              setIsLoad(false);
            } catch (error) {
              setIsLoad(false)
              console.error(error)
            }
          })();
          
          (async () => {
            try {
              const dataResponse= await fetch("/api/users");
              const list=await dataResponse.json();
              setData({type:"SET_USERS",payload:list.users});
              
            } catch (error) {
              console.error(error)
            }
            })();
      }, [])
      
    return (
        <>
            <DataContext.Provider value={{data, setData, isLoad, isError}}>
                {children}
            </DataContext.Provider>
        </>
    )
}