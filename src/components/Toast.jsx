// @flow
import React from 'react';
import styled from 'styled-components';

// TODO: allow overriding these via props
const errorColor = '#e02d2d';
const errorColorDark = '#801313';
const warnColor = '#ffc715';
const warnColorDark = '#b78e0d';
const successColor = '#22ce33';
const successColorDark = '#14841f';

// Using icons is optional
function getIconName(type) {
  switch (type) {
    case 'INFO': return 'info-circle';
    case 'WARNING': return 'exclamation-triangle';
    case 'ERROR': return 'exclamation-circle';
    case 'SUCCESS': return 'check-circle';
    default: return 'info';
  }
}

const Toast = ({ toast, remove }: { toast: Object, remove: Function }) => (
  <ToastWrapper toastType={toast.type}>
    <ToastIcon toastType={toast.type}>
      <i className={`fa fa-${getIconName(toast.type)}`} />
    </ToastIcon>

    <ToastBody>
      {toast.message}
    </ToastBody>

    <RemoveToast onClick={() => remove(toast.id)}>
      &times;
    </RemoveToast>
  </ToastWrapper>
);

// Helpers

function getBg(type) {
  switch (type) {
    case 'INFO': return '#333';
    case 'WARNING': return warnColor;
    case 'ERROR': return errorColor;
    case 'SUCCESS': return successColor;
    default: return '#333';
  }
}

function getIconColor(type) {
  switch (type) {
    case 'INFO': return '#999';
    case 'WARNING': return warnColorDark;
    case 'ERROR': return errorColorDark;
    case 'SUCCESS': return successColorDark;
    default: return '#999';
  }
}

// Styled components

const ToastWrapper = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-bottom: 16px;
  border-radius: 4px;
  overflow-x: hidden;
  color: #fff;
  box-shadow: 0px 2px 8px rgba(0,0,0,0.3);
  background-color: ${props => getBg(props.toastType)};
`;

const ToastIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 8px;
  font-size: 24px;
  color: ${props => getIconColor(props.toastType)};
`;

const ToastBody = styled.div`
  flex: 1;
`;

const RemoveToast = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 8px;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ddd;
  }
  &:active {
    color: #888;
  }
`;

export default Toast;
