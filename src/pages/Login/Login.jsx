import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import useUser from '../../hooks/useUser'

export const Login = () => {
  const history = useHistory()
  const { authLogin, authLogout, } = useUser()

  useEffect(() => {
    authLogout()
  }, [])

  const [form, setForm] = useState({
    nickname: '',
    password: '',
  })

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleClick = (event) => {
    try {
      event.preventDefault()

      authLogin(form.nickname, form.password)
        .then((res) => {
          if (res) {
            history.push('/')
          } else {
            console.error('Login-error')
          }
        })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <input
        type="text"
        name="nickname"
        value={form.nickname}
        required
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={form.password}
        required
        onChange={handleChange}
      />
      <input
        type="submit"
        value="Login"
        onClick={handleClick}
      />
    </div>
  )
}
