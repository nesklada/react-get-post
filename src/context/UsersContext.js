import useFetch from "hooks/useFetch";
import { createContext, useCallback, useState} from "react";
import { API_USERS } from "api/config";

export const usersContext = createContext(null);
export const usersActionsContext = createContext(null);

export default function UsersContextProvider({children}) {
    const [params, setParams] = useState({page: 1, count: 6});
    const [usersData, fetchingUsersData] = useFetch(API_USERS, params);

    const handleUsers = useCallback((paramsObj) => {
        setParams((state) => {
            return {
                ...state, 
                ...paramsObj
            }
        })
    }, [])

    return(
        <usersActionsContext.Provider value={handleUsers}>
            <usersContext.Provider value={{usersData, fetchingUsersData}}>
                {children}
            </usersContext.Provider>
        </usersActionsContext.Provider>
    )
}