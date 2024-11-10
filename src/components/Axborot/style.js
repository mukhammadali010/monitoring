import styled from "styled-components";

const Container = styled.div`
  display: flex;
width: 100%;
padding: 48px 28px;
flex-direction: column;
align-items: center;
margin:0 auto;
gap: 36px;
flex-shrink: 0;
background: var(--foundation-white-white-20, #FEFEFE);
box-shadow: 0px 4px 32px 0px rgba(51, 51, 51, 0.04);
.wrap{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap:5px;
}
.line{
  width:100%;
  background-color:black;
  padding:.5px;
}
span{
  cursor: pointer;
}

`;

const Content = styled.div`
width: 550px;
display: flex;
flex-direction:column;
gap:40px;


`
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;

`
export {Container , Content , Wrapper};
