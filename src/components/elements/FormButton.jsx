// @flow
import React from 'react';

const FormButton = ({ disabled, text }: { disabled: boolean, text: string }) =>
  (
    <div className="">
      {disabled
        ? (
          <input
            className="b ph3 pv2 input-reset ba b--grey gray bg-transparent grow pointer f6 dib"
            type="submit"
            value={text}
            disabled
          />
        )
        : (
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value={text}
          />
        )
      }

    </div>
  );

export default FormButton;

