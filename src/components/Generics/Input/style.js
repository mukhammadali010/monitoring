import styled from "styled-components";

const getType = ({ typing }) => {
  switch (typing) {
    case "main":
      return {
        border: "none",
        textIndent: "10px",
        padding: "12px 20px",
        color: 'white',
        backgroundColor: 'transparent',
      };
    case "register":
      return {
        border: "1px solid #EBEBEB",
        padding: "12px 0px",
        textIndent: "10px",
      };
    default:
      return {
        border: "1px solid #E6E9EC",
        textIndent: "20px",
        padding: "12px 10px",
      };
  }
};

const Container = styled.input`
  margin-top: ${({ mt }) => (mt ? `${mt}px` : "")};
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : "")};
  margin-right: ${({ mr }) => (mr ? `${mr}px` : "")};
  margin-left: ${({ ml }) => (ml ? `${ml}px` : "")};
  gap: ${({ gap }) => (gap ? `${gap}px` : "10px")};
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  height: ${({ height }) => (height ? `${height}px` : "44px")};
  border-radius: ${({ br }) => (br ? `${br}px` : "")};
  padding: ${({ padding }) => (padding ? padding : "")};
  outline: none;
  ${getType};
`;

export { Container };
