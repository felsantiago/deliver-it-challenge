import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    background: '#fff',
    borderRadius: '16px',
    height: '100%',
    padding: '100px'
  },
  title: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
}));

export default useStyles;
