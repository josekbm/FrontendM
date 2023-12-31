import styled from "styled-components";

interface ModalProps {
  show?: boolean;
  top?: boolean;
}

export const ModalContainer = styled.div<ModalProps>`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  padding: 16px 32px;
  padding-bottom: 32px;
  background-color: #ffffffff;
  border-radius: 12px;
  position: fixed;
  top: ${(props) => (props.top ? "10%" : "40%")};
  box-shadow: 0px 3px 10px #00000005;
  border: 0.5px solid #212121;
  gap: 16px;
  z-index: 5;
  max-width: 500px;

  h2 {
    text-align: center;
    font-weight: 600;
    font-family: "Poppins";
    font-size: 20px;
    letter-spacing: 0px;
    color: #212121;
    margin: 0;
  }
`;

export const ModalButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: center;
  width: 100%;
`;

export const ModalCloseRow = styled.div`
  width: 100%;
  text-align: end;
  color: #e23428;
  font-size: 20px;

  svg:hover {
    scale: 1.2;
    cursor: pointer;
  }
`;
