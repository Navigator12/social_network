import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    lineHeight: 2.5,
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    display: 'flex',
    marginTop: theme.spacing(3),
  },
}))

export default useStyles
