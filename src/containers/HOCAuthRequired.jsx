// @flow
// This has flow errors related to use of withRouter. Need to figure that out.
/* eslint-disable consistent-return */
import React, { Component, type Element } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import type { RouterHistory } from 'react-router-dom';

type Props = {
  isAuthenticated: boolean,
  children: Element<*>,
  history: RouterHistory
}

class HOCAuthRequired extends Component<Props> {
  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/signin');
    }
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

const mapStateToProps = (state: Object): { isAuthenticated: boolean } => ({
  isAuthenticated: state.auth.authenticated,
});

const ConnectedHOCAuthRequired = connect(mapStateToProps, null)(HOCAuthRequired);

export default withRouter(ConnectedHOCAuthRequired);
