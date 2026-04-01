import React from 'react';
import { Button as AntdButton } from 'antd';

const Button = ({ children, type = "primary", htmlType = "submit", ...props }) => {
  return (
    <AntdButton 
      type={type}
      htmlType={htmlType}
      size="large" 
      block 
      {...props}
    >
      {children}
    </AntdButton>
  );
};

export default Button;