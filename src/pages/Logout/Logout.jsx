import React from 'react'
import { useHistory } from 'react-router-dom'

import useUser from '../../hooks/useUser'

export const Logout = () => {
  const history = useHistory()
  const { authLogout } = useUser()

  const onExit = () => authLogout().then((res) => {
    if (res) {
      history.push('/login')
      window.location.reload()
    }
  })

  return (
    <>
      {onExit()}
    </>
  )
}
