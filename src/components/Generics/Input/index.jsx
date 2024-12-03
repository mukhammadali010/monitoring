import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';

const Input = forwardRef(
  (
    {
      typing,
      width,
      height,
      mt,
      mb,
      mr,
      ml,
      br,
      gap,
      padding,
      placeholder,
      onChange,
      defaultValue,
      name,
      type,
      onKeyPress
    },
    ref
  ) => {
    return (
      <Container
        typing={typing}
        ref={ref}
        onKeyPress={onKeyPress}
        width={width}
        height={height}
        mt={mt}
        mb={mb}
        mr={mr}
        ml={ml}
        br={br}
        gap={gap}
        padding={padding}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        name={name}
        type={type}
      />
    );
  }
);

// Set the display name for better debugging
Input.displayName = 'Input';

Input.propTypes = {
  typing: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  mt: PropTypes.string,
  mb: PropTypes.string,
  mr: PropTypes.string,
  ml: PropTypes.string,
  br: PropTypes.string,
  gap: PropTypes.string,
  padding: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  onKeyPress: PropTypes.func,
};

export default Input;
