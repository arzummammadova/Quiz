import React from 'react';
import { Input as AntdInput } from 'antd';

const Input = ({ type, ...props }) => {
  if (type === 'password') {
    return <AntdInput.Password size="large" {...props} />;
  }
  return <AntdInput type={type} size="large" {...props} />;
};

export default Input;