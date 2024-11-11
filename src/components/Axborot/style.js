import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 48px 28px;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  gap: 36px;
  flex-shrink: 0;
  background: var(--foundation-white-white-20, #FEFEFE);
  box-shadow: 0px 4px 32px 0px rgba(51, 51, 51, 0.04);

  .wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    @media (max-width: 768px) {
      flex-direction: column;
      padding:0;
      gap: 15px;
    }
  }

  .cardMonitoring{
    @media (max-width: 768px) {
      width: 100%; // Decrease icon size for screens 768px and under
    }
  }
  .cardMonitoring img {
    width: 50px;  // Default size for larger screens

    @media (max-width: 768px) {
      width: 40px; // Decrease icon size for screens 768px and under
    }
  }

  .eco {
    font-size: 16px;
    line-height: 1.5;

    @media (max-width: 768px) {
      font-size: 14px;
      line-height: 1.4;
      padding: 0 16px;
    }
  }

  @media (max-width: 768px) {
    padding: 24px 16px; // Reduce container padding for screens 768px and under
  }
`;

const Content = styled.div`
  width: 550px;
  
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 768px) {
    width: 100%;
    gap: 24px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
 
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

export { Container, Content, Wrapper };
