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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      message: e.target.elements.message.value,
    };
  
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyZ0QRb-XAp-wJxNZUvR5jCBmd0vy4QV7VCusa0WQ4cIDbU-W9SYxLwY-H70qd02YCq/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
      } else {
        console.error('Error:', response.statusText);
        const responseBody = await response.text();
        console.error('Response Body:', responseBody);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  
  
  return (
    <>
    <ContactContainer>
      <Title>Contact Us</Title>
      <Form method='POST' onSubmit={handleSubmit}>
        {/* Add 'name' attributes */}
        <Input type="text" name="name" placeholder="Your Name" required />
        <Input type="email" name="email" placeholder="Your Email" required />
        <Textarea name="message" placeholder="Your Message" rows="5" required />
        <Button type="submit">Send Message</Button>
      </Form>
    </ContactContainer>
    <Footer/>
    </>
  );
};

export default Contact;
