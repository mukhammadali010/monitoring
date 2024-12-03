import React from 'react';
import styled from 'styled-components';
import Footer from '../Footer';
import Navbar from '../Navbar';

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Input = styled.input`
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
`;

const Button = styled.button`
  padding: 1rem;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Contact = () => {
  return (
    <>
  
    <ContactContainer>
      <Title>Contact Us</Title>
      <Form>
        <Input type="text" placeholder="Your Name" required />
        <Input type="email" placeholder="Your Email" required />
        <Textarea placeholder="Your Message" rows="5" required />
        <Button type="submit">Send Message</Button>
      </Form>
    </ContactContainer>
    <Footer/>
    </>
  );
};

export default Contact;
