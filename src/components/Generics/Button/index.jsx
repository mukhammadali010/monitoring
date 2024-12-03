import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';

const Button = ({
  type,
  ty,
  width,
  height,
  mt,
  mb,
  mr,
  ml,
  gap,
  br,
  padding,
  children,
  onClick,
}) => {
  return (
    <Container
      type={type}
      width={width}
      height={height}
      mt={mt}
      mb={mb}
      mr={mr}
      ml={ml}
      gap={gap}
      br={br}
      ty={ty}
      padding={padding}
      onClick={onClick}
    >
      {children}
    </Container>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  ty: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  mt: PropTypes.string,
  mb: PropTypes.string,
  mr: PropTypes.string,
  ml: PropTypes.string,
  gap: PropTypes.string,
  br: PropTypes.string,
  padding: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Button;
