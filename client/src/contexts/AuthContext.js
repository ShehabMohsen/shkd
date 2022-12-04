import * as React from "react";
import { useState, useEffect, createContext } from "react";
import axios from "axios"

export const AuthContext = createContext();

export function useAuthContext() {
  return React.useContext(AuthContext);
}



export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(false);
    // const [isLoggedIn, setIsLoggedIn] = useState(false)

    
    useEffect(() => {
        async function checkIfUserIsLoggedIn() {
          try {
            let response = await fetch("http://localhost:8080/api/auth/login");
    
            if (!response.ok) {
              throw new Error("Unauthenticated");
            }
    
            let fetchedUser = await response.json();
            setUser(fetchedUser);
          } catch (error) {
            setUser(false);
          }
        }
    
        checkIfUserIsLoggedIn();
    
        return () => {
          // clean up function
        };
      }, []);


    const authenticate = async (email, password) => {
        console.log("authenticate", email, password)

    
        let response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Login Failed");
        }
        
        let loggedInUser = await response.json();
        setUser(loggedInUser);
        
        return loggedInUser;
    };
    
    const signout = async () => {
        let response = await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Logout Failed");
        }
    
        let body = await response.json();
        setUser(false);
    
        return body;
      };



    const authVariables = {user, setUser, authenticate, signout}
    return (
        <AuthContext.Provider value={{authVariables}}>
            {children}
        </AuthContext.Provider>
    )
}