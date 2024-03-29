import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
  Button, Container, TextField, Typography,
} from '@material-ui/core'
import useUser from '../../hooks/useUser'
import useProfile from '../../hooks/useProfile'
import useChat from '../../hooks/useChats'
import useStyles from './styles'
import friendStatus from '../../helpers/friendStatus/friendStatus'

export const Profile = () => {
  const history = useHistory()
  const classes = useStyles()
  const params = useParams()
  const { user } = useUser()
  const {
    profile,
    status,
    posts,
    getProfile,
    createProfilePost,
    deleteProfilePost,
    commentProfilePost,
    getFriendStatus,
    sendProfileFriendRequest,
    cancelProfileFriendRequest,
    resolveProfileFriendRequest,
    removeProfileFriendRelation,
  } = useProfile()
  const { profileChat, findChat, createChat } = useChat()

  const [me, setMe] = useState(false)
  const [newPost, setNewPost] = useState('')
  const [error, setError] = useState(false)
  const [comments, setComments] = useState([])

  const [chatLink, setChatLink] = useState('')

  const handlePromise = (res) => {
    if (res) {
      setError(false)
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    const { id } = params

    if (id === user._id) {
      history.push('/profile')
      return
    }

    getProfile(id || user._id).then(handlePromise)

    if (id) {
      getFriendStatus(user._id, id).then(handlePromise)

      findChat(id)
    }
  }, [params])

  useEffect(() => {
    if (profileChat) {
      setChatLink(profile?._id)
    }
  }, [profileChat, profile])

  useEffect(() => {
    setMe(!params.id)
  }, [params])

  useEffect(() => {
    setComments(new Array(posts?.length).fill(''))
  }, [posts])

  const handleMessage = () => {
    if (!profileChat) {
      createChat(profile._id)
        .then((res) => {
          if (res) {
            history.push(`/chat/${profile._id}`)
          }
        })

      return
    }

    history.push(`/chat/${chatLink}`)
  }

  const sendRequest = (to) => {
    sendProfileFriendRequest(to).then(handlePromise)
  }

  const cancelRequest = (id) => {
    cancelProfileFriendRequest(id).then(handlePromise)
  }

  const resolveRequest = (id, resultStatus) => {
    resolveProfileFriendRequest(id, resultStatus).then(handlePromise)
  }

  const removeFriendRelation = (id) => {
    removeProfileFriendRelation(id).then(handlePromise)
  }

  const handleChangePost = (event) => {
    setNewPost(event.target.value)
  }

  const handleSubmitPost = (event) => {
    event.preventDefault()

    createProfilePost(newPost.trim()).then((res) => {
      if (res) {
        setNewPost('')
        setError(false)
      } else {
        setError(true)
      }
    })
  }

  const handleDeletePost = (id) => {
    deleteProfilePost(id).then(handlePromise)
  }

  const handleChangeComment = (index, value) => {
    setComments(comments.map((item, i) => (i === index ? value : item)))
  }

  const handleSubmitComment = (postId, commentIndex) => {
    commentProfilePost(postId, comments[commentIndex]).then((res) => {
      if (res) {
        setComments(new Array(posts.length).fill(''))
        setError(false)
      } else {
        setError(true)
      }
    })
  }

  const handleUser = (id) => {
    history.push(`/profile/${id}`)
  }

  return (
    <>
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          {
            !me
              && (
              <>
                <div className={classes.message}>
                  <Typography
                    variant="h5"
                    component="span"
                    className={classes.nickname}
                  >
                    This is
                    {' '}
                    {profile?.nickname}
                    &apos;s page
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.messageButton}
                    onClick={handleMessage}
                  >
                    Message
                  </Button>
                </div>

                {
                  status?.code === friendStatus.notFriend && (
                  <div className={classes.friendStatus}>
                    <Typography
                      variant="h5"
                      component="span"
                      className={classes.nickname}
                    >
                      You and
                      {' '}
                      {profile?.nickname}
                      {' '}
                      are not friends
                    </Typography>
                    <div>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.friendButton}
                        onClick={() => sendRequest(profile._id)}
                      >
                        Send request
                      </Button>
                    </div>
                  </div>
                  )
                }

                {
                  status?.code === friendStatus.pendingRequest && (
                  <div className={classes.friendStatus}>
                    <Typography
                      variant="h5"
                      component="span"
                      className={classes.nickname}
                    >
                      {profile?.nickname}
                      {' '}
                      wanna be your friend
                    </Typography>
                    <div>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.friendButton}
                        onClick={() => resolveRequest(status.requestId, true)}
                      >
                        Accept
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className={classes.friendButton}
                        onClick={() => resolveRequest(status.requestId, false)}
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                  )
                }

                {
                  status?.code === friendStatus.sentRequest && (
                  <div className={classes.friendStatus}>
                    <Typography
                      variant="h5"
                      component="span"
                      className={classes.nickname}
                    >
                      You wanna be
                      {' '}
                      {profile?.nickname}
                      &apos;s friend
                    </Typography>
                    <div>
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className={classes.friendButton}
                        onClick={() => cancelRequest(status.requestId)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                  )
                }

                {
                  status?.code === friendStatus.isFriend && (
                  <div className={classes.friendStatus}>
                    <Typography
                      variant="h5"
                      component="span"
                      className={classes.nickname}
                    >
                      You and
                      {' '}
                      {profile?.nickname}
                      {' '}
                      are friends
                    </Typography>
                    <div>
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className={classes.friendButton}
                        onClick={() => removeFriendRelation(profile?._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  )
                }
              </>
              )
          }

          {me && (
          <div className={classes.form}>
            <TextField
              variant="outlined"
              label="What do you want to say?"
              value={newPost}
              onChange={handleChangePost}
              className={classes.input}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmitPost}
            >
              Create
            </Button>
          </div>
          )}

          {error && (
            <div className={classes.error}>
              <Typography
                variant="h5"
                component="span"
              >
                Something went wrong
              </Typography>
            </div>
          )}

          {
            posts?.map((post, index) => (
              <div key={post._id} className={classes.post}>
                <div className={classes.head}>
                  <Typography
                    variant="h4"
                    component="span"
                    className={classes.author}
                  >
                    {profile.nickname}
                  </Typography>

                  <div>
                    <Typography variant="h5" component="span" className={classes.date}>
                      {new Date(post.date).toLocaleString()}
                    </Typography>
                    {me && (
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeletePost(post._id)}
                      className={classes.deletePost}
                    >
                      Delete
                    </Button>
                    )}
                  </div>
                </div>

                <Typography variant="h5" component="span">
                  {post.text}
                </Typography>

                <div>
                  {
                    post.comments.map((comment) => (
                      <div key={comment._id} className={classes.comment}>
                        <div className={classes.head}>
                          <Typography
                            variant="h5"
                            component="span"
                            className={classes.author}
                            onClick={() => handleUser(comment.author._id)}
                          >
                            {comment.author.nickname}
                          </Typography>

                          <Typography variant="h6" component="span" className={classes.date}>
                            {new Date(comment.date).toLocaleString()}
                          </Typography>
                        </div>

                        <Typography variant="h6" component="span">
                          {comment.text}
                        </Typography>
                      </div>
                    ))
                  }
                </div>

                <div className={classes.form}>
                  <TextField
                    variant="outlined"
                    label="Comment me!)"
                    fullWidth
                    size="small"
                    value={comments[index] || ''}
                    onChange={(event) => handleChangeComment(index, event.target.value)}
                    className={classes.commentInput}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.commentSubmit}
                    onClick={() => handleSubmitComment(post._id, index)}
                  >
                    Comment
                  </Button>
                </div>
              </div>
            ))
          }
        </div>
      </Container>
    </>
  )
}
