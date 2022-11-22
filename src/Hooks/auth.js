
import { useState, useEffect, createContext, useContext, useMemo } from "react";
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
const AuthContext = createContext();

/* 
@Source: https://blog.logrocket.com/complete-guide-authentication-with-react-router-v6/#basic-routing-with-routes
*/
export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userEmail, setUserEmail] = useState("")
  const [userFirstName, setUserFirstName] = useState("")
  const [userLastName, setUserLastName] = useState("")
  const [userPhoneNumber, setUserPhoneNumber] = useState("")  
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  useEffect(() => {
    console.log('in use effect in auth')
    const userData = getLSUserData();
		if (userData && userData.token) {
			setUserToken(userData.token);
		}
		if (userData && userData.email) {
			setUserEmail(userData.email);
		}
    if (userData && userData.firstName) {
			setUserFirstName(userData.firstName);
		} else {
      setUserFirstName("")
    }
    if (userData && userData.lastName) {
			setUserLastName(userData.lastName);
		}
    if (userData && userData.phoneNumber) {
			setUserPhoneNumber(userData.phoneNumber);
		}
  }, [isAuthLoading]);

  // call this function when you want to register the user
  const register = async (email, password, firstName, lastName, phoneNumber) => {
    console.log('in register in auth')
    setIsAuthLoading(true);
    const registerResult = await registerUser(email, password, firstName, lastName, phoneNumber);
    setIsAuthLoading(false);
    return registerResult;
  };

  // call this function when you want to authenticate the user
  const login = async (email, password) => {
    setIsAuthLoading(true);

    const loginResult = await loginUser(email, password);

    if (loginResult.success) {
      setLSUserData(loginResult.token, loginResult.email);
    }
    setIsAuthLoading(false);
    return loginResult
  };

  // call this function to sign out logged in user
  const logout = async () => {
    setIsAuthLoading(true);
    await removeLSUserData(); // This has to be awaited for the useEffect to work
    setUserToken(null);
    setUserEmail("");
    setIsAuthLoading(false);
  };


  const value = useMemo(
    () => ({
      userToken,
      userEmail,
      login,
      logout,
      register,
    }),
    [userToken]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const registerUser = async (email, password, firstName, lastName, phoneNumber) => {
  const url = `${urlEndpoint}/user/register`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName,
      phoneNumber
    }),
  });
  const responseJSON = await response.json();
  return responseJSON;
};

const loginUser = async (email, password) => {
  const url = `${urlEndpoint}/user/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const responseJSON = await response.json();
  return responseJSON;
};

const setLSUserData = (token, email) => {
  localStorage.setItem(
    process.env.REACT_APP_TOKEN_HEADER_KEY,
    JSON.stringify({token, email})
  );
};

const removeLSUserData = () => {
  localStorage.removeItem(process.env.REACT_APP_TOKEN_HEADER_KEY);
  return true;
};

const getLSUserData = () => {
  return JSON.parse(
    localStorage.getItem(process.env.REACT_APP_TOKEN_HEADER_KEY)
  );
};