import styled from "styled-components";

const Container = styled.div`
background-color:#fcfcfc;
  display: flex;
  width: 100%;
  padding: 48px 28px;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  gap: 36px;
  flex-shrink: 0;
  box-shadow: 0px 4px 32px 0px rgba(51, 51, 51, 0.04);
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  padding:20px;
  flex-direction: column;
  gap: 40px;
  border-radius:10px;
  background-color:white;
  box-shadow: 0px 4px 32px 0px rgba(51, 51, 51, 0.04);

`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export { Container, Content, Wrapper };
