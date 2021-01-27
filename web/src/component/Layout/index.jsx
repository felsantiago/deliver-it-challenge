import React from 'react'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Styles from './style';

const Layout = ({ children, title }) => {
  const classes = Styles();

  return (
    <Grid container direction='column' alignItems='center' className={classes.wrapper} justify='center'>
      <Grid container spacing={2} className={classes.containerContent}>
        {children}
      </Grid>
    </Grid>
  );
};

Layout.defaultProps = {
  title: 'deliver-it',
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Layout;
