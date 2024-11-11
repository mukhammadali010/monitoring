import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items:center;
  justify-content:center;
  border:1px solid red;
  width: 100%;
  padding: 32px;
  flex-wrap:wrap;
  background: var(--foundation-white-white-50, #fefefe);
  box-shadow: 0px 4px 24px 0px rgba(51, 51, 51, 0.08);
  align-items: flex-start;
  
  gap: 16px;
  .card__title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .cardFooter{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`;




export { Container  };
