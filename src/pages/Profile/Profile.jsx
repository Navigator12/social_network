import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
  Button, Container, TextField, Typography,
} from '@material-ui/core'
import useUser from '../../hooks/useUser'
import useProfile from '../../hooks/useProfile'
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
    commentProfilePost,
    getFriendStatus,
    sendProfileFriendRequest,
    cancelProfileFriendRequest,
    resolveProfileFriendRequest,
    removeProfileFriendRelation,
  } = useProfile()

  const [me, setMe] = useState(false)
  const [newPost, setNewPost] = useState('')
  const [error, setError] = useState(false)
  const [comments, setComments] = useState([])

  useEffect(() => {
    const { id } = params

    if (id === user._id) {
      history.push('/profile')
      return
    }

    getProfile(id || user._id).then((res) => {
      if (res) {
        setError(false)
      } else {
        setError(true)
      }
    })

    if (id) {
      getFriendStatus(user._id, id)
    }
  }, [params])

  useEffect(() => {
    setMe(!params.id)
  }, [params])

  useEffect(() => {
    setComments(new Array(posts?.length).fill(''))
  }, [posts])

  const sendRequest = (to) => {
    sendProfileFriendRequest(to)
  }

  const cancelRequest = (id) => {
    cancelProfileFriendRequest(id)
  }

  const resolveRequest = (id, resultStatus) => {
    resolveProfileFriendRequest(id, resultStatus)
  }

  const removeFriendRelation = (id) => {
    removeProfileFriendRelation(id)
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

                  <Typography variant="h5" component="span" className={classes.date}>
                    {new Date(post.date).toLocaleString()}
                  </Typography>
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
