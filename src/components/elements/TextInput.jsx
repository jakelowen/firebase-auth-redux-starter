// @flow
/* eslint-disable object-curly-newline */
import React from 'react';
import classnames from 'classnames';

const TextInput = ({
  type,
  id,
  label,
  error,
  value,
  onChange,
  ...props
}: {
    type: string,
    id: string,
    label: string,
    error: string,
    value: string,
    onChange: Function,
  }) => {
  const inputClasses = classnames(
    'pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100',
    {
      'b--red': !!error,
    },
  );
  return (
    <div>
      <label
        className="db fw6 lh-copy f6"
        htmlFor={`${id}`}
      >
        {`${label}`}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
        className={inputClasses}
      />
      <p className="db mt2 lh-copy f6 red">{error}</p>
    </div>
  );
};

export default TextInput;
