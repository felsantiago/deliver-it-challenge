import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    backgroundColor: '#fff',
    color: '#000',
    marginTop: '80px'
  },
  containerContent: {
    maxWidth: '1104px',
    width: '100%',
    paddingTop: '64px',
    paddingBottom: '64px',
    marginTop: '0',
  }
}));

export default useStyles;
