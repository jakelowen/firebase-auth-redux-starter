// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// import { CSSTransitionGroup } from 'react-transition-group';

import { addToast, removeToast, getToasts } from '../actions/toast';

// Components
import Toast from '../components/Toast';

type PropTypes = {
  toasts: [Object],
  removeToast: Function,
  timeout?: number
}

class ToastContainer extends Component<PropTypes> {
  componentWillReceiveProps(nextProps) {
    if (nextProps.toasts.length > this.props.toasts.length) {
      // Get the new toast from next props
      const { toasts } = nextProps;
      const newToast = toasts[toasts.length - 1];
      const timeout = newToast.timeout || this.props.timeout || 3000; // default

      // Hide the new toast after timeout
      setTimeout(() => this.props.removeToast(newToast.id), timeout);
    }
  }

  render() {
    const { toasts } = this.props;

    return (
      <ToastsWrapper ignoreClicks={toasts.length === 0}>
        <TransitionGroup />
        {toasts.map(toast =>
          (
            <CSSTransition
              key={toast.id}
              classNames="toastAnim"
              timeout={{ enter: 500, exit: 500, appear: 500 }}
            >
              <Toast
                toast={toast}
                remove={this.props.removeToast}
                key={toast.id}
              />
            </CSSTransition>
          ))}
      </ToastsWrapper>
    );
  }
}

// Styled components
const ToastsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  right: 0px;
  width: 400px;
  z-index: 9999;
  padding: 0px 32px;
  ${props => props.ignoreClicks && 'pointer-events: none;'}
  @media screen and (max-width: 760px) {
    width: 100%;  
  }
`;

// Connect to Redux
const mapStateToProps = state => ({
  toasts: getToasts(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addToast,
  removeToast,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ToastContainer);
