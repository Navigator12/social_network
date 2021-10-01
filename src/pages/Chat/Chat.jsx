import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Container, Typography, TextField, Button,
} from '@material-ui/core'
import useUser from '../../hooks/useUser'
import useChats from '../../hooks/useChats'
import useStyles from './styles'
import Socket from '../../socket'

export const Chat = () => {
  const classes = useStyles()
  const params = useParams()
  const { user } = useUser()
  const { chat, getChatWithMessages, receiveMessage } = useChats()

  const socket = Socket.getSocket()

  const [newMessage, setMessage] = useState('')

  const handleChangeMessage = (event) => {
    setMessage(event.target.value)
  }

  const handleSendMessage = () => {
    const data = {
      userId: user._id,
      chatId: chat._id,
      text: newMessage,
    }

    socket.emit('sendMessage', data)

    setMessage('')
  }

  useEffect(() => {
    const { otherId } = params

    getChatWithMessages(otherId)
  }, [params])

  useEffect(() => {
    socket?.on('receiveMessage', ({ message }) => {
      if (message.chat === chat._id) {
        receiveMessage(message)
      }
    })

    return () => {
      socket?.removeAllListeners('receiveMessage');
    }
  }, [socket, chat])

  const fill = (num) => (num < 10 ? `0${num}` : `${num}`)
  const formatDate = (date) => {
    const hours = fill(date.getHours())
    const minutes = fill(date.getMinutes())
    const day = fill(date.getDate())
    const month = fill(date.getMonth() + 1)
    const year = date.getFullYear()

    return `${hours}:${minutes} ${day}.${month}.${year}`
  }

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <Typography
          variant="h5"
          className={classes.chatName}
        >
          Chat with
          {' '}
          { chat?.user.nickname }
        </Typography>

        <div className={classes.form}>
          <TextField
            variant="outlined"
            label="What do you want to say?"
            value={newMessage}
            onChange={handleChangeMessage}
            className={classes.input}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </div>

        {
          chat?.messages.map((message) => (
            <div
              key={message._id}
              className={user?._id === message.from._id ? classes.myMessage : classes.otherMessage}
            >
              <div className={classes.head}>
                <Typography
                  variant="h5"
                >
                  { message.from.nickname }
                </Typography>
                <Typography
                  variant="h5"
                >
                  { formatDate(new Date(message.date)) }
                </Typography>
              </div>

              <Typography
                variant="h5"
              >
                { message.text }
              </Typography>
            </div>
          ))
        }
      </div>
    </Container>
  )
}
