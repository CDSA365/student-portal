import { createContext, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeUser, setUser } from "../store/slice/user-slice";
import { AuthContextType, LoginValues } from "../types/types";

/* It's creating a context object that is of type AuthContextType. */
export const authContext = createContext<AuthContextType>({
    isLoggedIn: () => false,
    login: () => {},
    logout: () => {},
});

/**
 * It's a React component that provides the `auth` object to all of its children
 * @param {any}  - any - This is a type that tells TypeScript that the parameter can be of any type.
 */
export const AuthProvider = ({ children }: any) => {
    const auth = useAuthProvider();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

/**
 * The function returns an object with three functions: isLoggedIn, login, and logout
 * @returns an object with three keys: isLoggedIn, login, and logout.
 */
const useAuthProvider = () => {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    /**
     * If the user is logged in, return true, otherwise return false
     * @returns The value of the key "is_logged_in" in the user object.
     */
    const isLoggedIn = () => {
        return user["is_logged_in"] ? true : false;
    };

    /**
     * The function takes a value of type LoginValues and returns a dispatch of the setUser function
     * with the value passed in
     * @param {LoginValues} value - LoginValues
     */
    const login = (value: LoginValues) => {
        dispatch(setUser(value));
    };

    /**
     * The function is called logout and it dispatches the removeUser action
     */
    const logout = () => {
        dispatch(removeUser());
    };

    return {
        isLoggedIn,
        login,
        logout,
    };
};

/**
 * It returns the value of the authContext
 * @returns The useContext hook is being used to return the authContext.
 */
export const useAuth = () => {
    return useContext(authContext);
};
