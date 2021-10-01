import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
  },
  chatName: {
    margin: theme.spacing(0, 0, 2, 2),
  },
  form: {
    justifyContent: 'space-between',
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
  head: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  myMessage: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1),
    background: '#cce5ff',
    color: '#00142d',
  },
  otherMessage: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1),
    background: '#fff3cd',
    color: '#624c04',
  },
}))

export default useStyles
