import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 12px;
  height:400px;
  border-radius: 12px;
  background: var(--foundation-white-white-50, #fefefe);
  box-shadow: 0px 4px 24px 0px rgba(51, 51, 51, 0.08);
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
  cursor:pointer;
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
