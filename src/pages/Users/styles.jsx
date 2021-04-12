import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  section: {
    textAlign: 'center',
  },
  active: {
    background: '#99EE99!important',
  },
  sectionCard: {
    display: 'inline-block',
    width: theme.spacing(25.5),
    alignContent: 'center',
    background: '#AAAAFF',
    padding: theme.spacing(1),
    cursor: 'pointer',
    '&:first-child': {
      borderBottomLeftRadius: `${theme.spacing(1)}px`,
      borderTopLeftRadius: `${theme.spacing(1)}px`,
    },
    '&:last-child': {
      borderBottomRightRadius: `${theme.spacing(1)}px`,
      borderTopRightRadius: `${theme.spacing(1)}px`,
    },
    '&:focus': {
      outline: 'none',
    },
  },
  error: {
    display: 'flex',
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1),
    background: '#FFDDDD',
    width: theme.spacing(104),
  },
  user: {
    cursor: 'pointer',
    width: theme.spacing(104),
    background: '#CCCCFF',
    margin: theme.spacing(2),
    padding: theme.spacing(1, 3),
    borderRadius: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
  },
  resolve: {
    margin: theme.spacing(0, 1),
  },
}))

export default useStyles
