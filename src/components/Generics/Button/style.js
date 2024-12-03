import styled from "styled-components";

const getType = ({ type }) => {
  switch (type) {
    case "primary":
      return {
        border:'none',
        background: `var(--colorPrimary)`,
        color: `#fff`,
      };
    case "secondary":
      return {
        background: `var(--colorSecondary)`,
        color: `#fff`,
        fontSize: `30px`,
      };
    case "third":
      return {
        background: `transparent`,
        color: `#000`,
        border: `1px solid #000`,

      };
      case "card":
      return {
        background: `var(--colorPrimary)`,
        color: `#fff`,
      };

    default:
      return {
        background: `var(--backgroundPrimary)`,
        color: `#fff`,
      };
  }
};
const Container = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 40px;
  border:none;
  gap: ${({ gap }) => (gap ? `${gap}px` : "10px")};
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  height: ${({ height }) => (height ? `${height}px` : "44px")};
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : "auto")};
  margin-top: ${({ mt }) => (mt ? `${mt}px` : "auto")};
  cursor: pointer;
  border-radius: ${({ br }) => (br ? `${br}px` : "100px")};
  ${getType}

  &:active{
    transform:scale(.97);
    opacity: 0.7;
  }
`;
export { Container };
