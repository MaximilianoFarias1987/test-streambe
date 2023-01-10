

import React, { useReducer } from 'react'
import { authReducer } from './authReducer'
import { AuthContext } from './AuthContext'
import { types } from './types/types'
import { getLogin } from '../../hooks/useLogin'
// import { getLogin } from '../../api/loginAction'

const initialState = {
    logged: false,
    user: null
}

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return{
    logged: !!user,
    user: user,
  }
}

export const AuthProvider = ({children}) => {

    const [authState, dispatch ] = useReducer(authReducer, initialState, init);

    const login = async (params = {}) => {

      const user = {params}
      
      // const user = await getLogin()
      //   console.log(user);

      const action = {
        type: types.login,
        payload: user.params
      }

      localStorage.setItem('user', JSON.stringify(user));

      dispatch(action)
    }

    const logout = () => {
      localStorage.removeItem('user');
      const action = {
        type: types.logout
      };
      dispatch(action)
    }

  return (
    <AuthContext.Provider value={{
      ...authState,
      login: login,
      logout: logout
    }}>
        {children}
    </AuthContext.Provider>
  )
}
