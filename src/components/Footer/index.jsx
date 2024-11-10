import React from "react";
import { Container, FooterSection, FooterTitle, FooterItem, SocialMedia, SocialIcon, FooterLink } from "./style";

const Footer = () => {
  return (
    <Container>
      <FooterSection>
        <FooterTitle>Biz bilan Aloqa</FooterTitle>
        <FooterItem>Email: muhammadalinosirov34@gmail.com</FooterItem>
        <FooterItem>Phone: +998904061430</FooterItem>
        <FooterItem>Address: Toshkent 100084, Amir Temur shox ko‘chasi 108 uy </FooterItem>
      </FooterSection>

      <FooterSection>
        <FooterTitle>About Us</FooterTitle>
        <FooterItem>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel mauris quam. Nullam dapibus nunc sit amet dui cursus, nec cursus nulla scelerisque. Integer sit amet felis nec leo pretium mollis.
        </FooterItem>
      </FooterSection>

      <FooterSection>
        <FooterTitle>Quick Links</FooterTitle>
        <FooterItem><FooterLink href="#">Home</FooterLink></FooterItem>
        <FooterItem><FooterLink href="#">Services</FooterLink></FooterItem>
        <FooterItem><FooterLink href="#">Contact</FooterLink></FooterItem>
        <FooterItem><FooterLink href="#">About</FooterLink></FooterItem>
      </FooterSection>

      <FooterSection>
        <FooterTitle>Follow Us</FooterTitle>
        <SocialMedia>
          <SocialIcon href="https://facebook.com" target="_blank">Facebook</SocialIcon>
          <SocialIcon href="https://twitter.com" target="_blank">Twitter</SocialIcon>
          <SocialIcon href="https://instagram.com" target="_blank">Instagram</SocialIcon>
        </SocialMedia>
      </FooterSection>
    </Container>
  );
};

export default Footer;
