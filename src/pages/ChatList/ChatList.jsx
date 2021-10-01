import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Container, Typography,
} from '@material-ui/core'
import useChats from '../../hooks/useChats'
import useStyles from './styles'

export const ChatList = () => {
  const history = useHistory()
  const classes = useStyles()
  const { chats, getChats } = useChats()

  useEffect(() => {
    getChats()
  }, [])

  const handleChat = (id) => {
    history.push(`/chat/${id}`)
  }

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        {
          chats?.map((chat) => (
            <div
              key={chat._id}
              className={classes.chat}
              onClick={() => handleChat(chat.user._id)}
              role="link"
              tabIndex={0}
            >
              <Typography
                variant="h5"
              >
                {chat.user.nickname}
              </Typography>
            </div>
          ))
        }
      </div>
    </Container>
  )
}
