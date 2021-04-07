import React, { useEffect } from 'react'

import useUser from '../../hooks/useUser'

export const Home = () => {
  const { user, getFriends, } = useUser()

  useEffect(() => {
    if (user) {
      getFriends(user._id)
    }
  }, [user])

  return (
    <div>
      <h1>Front-end</h1>
    </div>
  )
}
