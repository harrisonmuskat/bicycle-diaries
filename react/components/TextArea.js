import React from 'react';

const TextArea = props => {
  return (
    <label>{props.label}
      <textarea rows="10"
        className="textarea"
        name={props.name}
        onChange={props.handlerFunction}
        value={props.content}
        placeholder={props.placeholder}
      />
    </label>
  );
}

export default TextArea;
