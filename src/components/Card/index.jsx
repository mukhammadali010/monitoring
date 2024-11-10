import React from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from 'react-spring';
import { Container } from "./style";

const Card = ({ value }) => {
  const props = useSpring({ 
    opacity: 1, 
    from: { opacity: 0 }, 
    delay: 200 
  });

  return (
    <animated.div style={props}>
      <Container>
        <img src={value.url} width={'100%'} height={'200px'} alt="" />
        <h4>{value.title}</h4>
        <p>{value.text}</p>
      </Container>
    </animated.div>
  );
};

Card.propTypes = {
  value: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
};

export default Card;
