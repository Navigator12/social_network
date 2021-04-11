import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    justifyContent: 'space-between',
  },
  nickname: {
    marginLeft: theme.spacing(2),
  },
  friendStatus: {
    margin: theme.spacing(1, 2),
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    background: '#DDDDFF',
  },
  friendButton: {
    margin: theme.spacing(0, 1),
  },
  input: {
    margin: theme.spacing(1, 0, 1, 2),
    width: theme.spacing(87),
  },
  submit: {
    lineHeight: 3,
    margin: theme.spacing(1, 2, 1, 3),
    width: theme.spacing(20),
  },
  error: {
    display: 'flex',
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1),
    background: '#FFDDDD',
  },
  post: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1),
    background: '#DDDDFF',
  },
  head: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  author: {
    color: '#444444',
    cursor: 'pointer',
  },
  date: {
    color: '#444444',
  },
  comment: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(3),
  },
  commentInput: {
    marginTop: theme.spacing(1),
    width: theme.spacing(87),
  },
  commentSubmit: {
    margin: theme.spacing(1, 0, 0, 2),
    width: theme.spacing(15),
  },
}))

export default useStyles
