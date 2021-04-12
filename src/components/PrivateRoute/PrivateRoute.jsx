import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';

export const PrivateRoute = ({ component: Component, auth: token, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (!token ? (<Redirect to="/login" />)
      : (<Component {...props} />))}
  />
)

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  auth: PropTypes.string,
};

PrivateRoute.defaultProps = {
  auth: '',
}
