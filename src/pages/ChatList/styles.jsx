import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
  },
  chat: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1),
    background: '#DDDDFF',
    cursor: 'pointer',
  },
}))

export default useStyles
