import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Container, Typography, Button,
} from '@material-ui/core'
import useUser from '../../hooks/useUser'
import useStyles from './styles'
import classNames from '../../helpers/classNames/classNames'

export const Users = () => {
  const history = useHistory()
  const classes = useStyles()
  const {
    user,
    users,
    friends,
    pendingRequests,
    sentRequests,
    getAllUsers,
    getFriends,
    getPendingRequests,
    getSentRequests,
    resolveFriendRequest,
    cancelFriendRequest,
  } = useUser()

  const variants = {
    AllUsers: 0,
    Friends: 1,
    PendingRequests: 2,
    SentRequests: 3,
  }

  const [currentSection, setCurrentSection] = useState(variants.AllUsers)

  const handleUser = (id) => {
    history.push(`/profile/${id}`)
  }

  useEffect(() => {
    getAllUsers(user?._id)
    getFriends(user?._id)
    getPendingRequests(user?._id)
    getSentRequests(user?._id)
  }, [])

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <div className={classes.section}>
          <div
            className={classNames(
              classes.sectionCard,
              currentSection === variants.AllUsers && classes.active,
            )}
            onClick={() => setCurrentSection(variants.AllUsers)}
            role="switch"
            tabIndex={0}
            aria-checked={currentSection === variants.AllUsers}
          >
            <Typography variant="h5" component="span">
              All users
            </Typography>
          </div>
          <div
            className={classNames(
              classes.sectionCard,
              currentSection === variants.Friends && classes.active,
            )}
            onClick={() => setCurrentSection(variants.Friends)}
            role="switch"
            tabIndex={0}
            aria-checked={currentSection === variants.Friends}
          >
            <Typography variant="h5" component="span">
              Friends
            </Typography>
          </div>
          <div
            className={classNames(
              classes.sectionCard,
              currentSection === variants.PendingRequests && classes.active,
            )}
            onClick={() => setCurrentSection(variants.PendingRequests)}
            role="switch"
            tabIndex={0}
            aria-checked={currentSection === variants.PendingRequests}
          >
            <Typography variant="h5" component="span">
              Pending
            </Typography>
          </div>
          <div
            className={classNames(
              classes.sectionCard,
              currentSection === variants.SentRequests && classes.active,
            )}
            onClick={() => setCurrentSection(variants.SentRequests)}
            role="switch"
            tabIndex={0}
            aria-checked={currentSection === variants.AllUsers}
          >
            <Typography variant="h5" component="span">
              Sent
            </Typography>
          </div>
        </div>

        <div>
          {
            currentSection === 0 && users?.map((el) => (
              <div
                className={classes.user}
                key={el._id}
              >
                <Typography
                  variant="h6"
                  component="span"
                  onClick={() => handleUser(el._id)}
                >
                  {el.nickname}
                </Typography>
                <Typography
                  variant="h6"
                  component="span"
                  onClick={() => handleUser(el._id)}
                >
                  {new Date(el.date).toLocaleDateString()}
                </Typography>
              </div>
            ))
          }

          {
            currentSection === 1 && friends?.map((el) => (
              <div
                className={classes.user}
                key={el._id}
              >
                <Typography
                  variant="h6"
                  component="span"
                  onClick={() => handleUser(el._id)}
                  role="switch"
                >
                  {el.nickname}
                </Typography>
                <Typography
                  variant="h6"
                  component="span"
                  onClick={() => handleUser(el._id)}
                >
                  {new Date(el.date).toLocaleDateString()}
                </Typography>
              </div>
            ))
          }

          {
            currentSection === 2 && pendingRequests?.map((el) => (
              <div
                className={classes.user}
                key={el._id}
              >
                <Typography
                  variant="h6"
                  component="span"
                  onClick={() => handleUser(el._id)}
                >
                  {el.nickname}
                </Typography>
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.resolve}
                    onClick={() => resolveFriendRequest(el.requestId, true)}
                  >
                    Accept
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.resolve}
                    onClick={() => resolveFriendRequest(el.requestId, false)}
                  >
                    Decline
                  </Button>
                </div>
              </div>
            ))
          }

          {
            currentSection === 3 && sentRequests?.map((el) => (
              <div
                className={classes.user}
                key={el._id}
              >
                <Typography
                  variant="h6"
                  component="span"
                  onClick={() => handleUser(el._id)}
                >
                  {el.nickname}
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className={classes.resolve}
                  onClick={() => cancelFriendRequest(el.requestId)}
                >
                  Cancel
                </Button>
              </div>
            ))
          }
        </div>
      </div>
    </Container>
  )
}
