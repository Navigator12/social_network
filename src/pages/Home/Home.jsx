import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Container, Typography, TextField, Button,
} from '@material-ui/core'
import usePosts from '../../hooks/usePosts'
import useStyles from './styles'

export const Home = () => {
  const history = useHistory()
  const [newPost, setNewPost] = useState('')
  const {
    news, getNews, createPost, commentPost,
  } = usePosts()
  const [error, setError] = useState(false)
  const [comments, setComments] = useState([])
  const classes = useStyles()

  useEffect(() => {
    getNews()
  }, [])

  useEffect(() => {
    setComments(new Array(news.length).fill(''))
  }, [news])

  const handleChangePost = (event) => {
    setNewPost(event.target.value)
  }

  const handleChangeComment = (index, value) => {
    setComments(comments.map((item, i) => (i === index ? value : item)))
  }

  const handleSubmitPost = (event) => {
    event.preventDefault()

    createPost(newPost.trim()).then((res) => {
      if (res) {
        setNewPost('')
        setError(false)
      } else {
        setError(true)
      }
    })
  }

  const handleSubmitComment = (postId, commentIndex) => {
    commentPost(postId, comments[commentIndex]).then((res) => {
      if (res) {
        setComments(new Array(news.length).fill(''))
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
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
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
        </div>

        {
          news?.map((post, index) => (
            <div key={post._id} className={classes.post}>
              <div className={classes.head}>
                <Typography
                  variant="h4"
                  component="span"
                  className={classes.author}
                  onClick={() => handleUser(post.author._id)}
                >
                  {post.author.nickname}
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
  )
}
