import styled from "styled-components";

const Container = styled.footer`
  width: 100%;
  background-color: #1976d2;
  color: #fff;
  padding: 40px 20px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.1);
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 250px;
  margin: 10px 20px;
`;

const FooterTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 20px;
  border-bottom: 2px solid #fff;
  padding-bottom: 10px;
  color:white;
`;

const FooterItem = styled.p`
  margin: 10px 0;
  font-size: 1em;
  line-height: 1.5;
`;

const FooterLink = styled.a`
  color: #61dafb;
  text-decoration: none;
  margin: 5px 0;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialMedia = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
`;

const SocialIcon = styled.a`
  color: #fff;
  text-decoration: none;
  margin-right: 20px;
  font-size: 1.2em;
  transition: color 0.3s ease;

  &:hover {
    color: #61dafb;
  }
`;

export { Container, FooterSection, FooterTitle, FooterItem, SocialMedia, SocialIcon, FooterLink };
