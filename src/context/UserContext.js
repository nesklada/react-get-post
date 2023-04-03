import useFetch from "hooks/useFetch";
import { createContext, useState} from "react";
import { API_USERS } from "api/config";

export const usersContext = createContext(null);
export const usersHandleContext = createContext(null);

export default function UserContextProvider({children}) {
    const [params, setParams] = useState({page: 1, count: 6});
    const [dataUsers, fetchingDataUsers] = useFetch(API_USERS, params);

    function handleUsers(paramsObj) {
        setParams((state) => {
            return {
                ...state, 
                ...paramsObj
            }
        })
    }

    return(
        <usersContext.Provider value={{dataUsers, fetchingDataUsers}}>
            <usersHandleContext.Provider value={handleUsers}>
                {children}
            </usersHandleContext.Provider>
        </usersContext.Provider>
    )
}