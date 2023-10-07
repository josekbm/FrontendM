import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface SideBarProps {
  column?: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 13px 3px 40px #00000005;
  gap: 28.8px;
  align-items: center;
  max-width: 345px;
  padding-bottom: 5%;
  height: 100%;
`;

export const Logo = styled.div<SideBarProps>`
  height: 100px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  p {
    margin: 0;
    font-family: "Poppins";
    font-size: 12px;
    font-weight: 300;
    color: #5d5449;
  }
  h2 {
    margin: 0;
    font-family: "Poppins";
    font-weight: 900;
    font-size: 28px;
  }
  img {
    width: 60px;
  }
`;

export const LinkContainer = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 40px;
  font-family: "Poppins";
  font-style: 18px;
  font-weight: normal;
  color: #799283;
  padding: 0;

  li:hover {
    scale: 1.2;
    cursor: pointer;
  }

  svg {
    font-size: 22px;
  }

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }
`;

export const User = styled.div`
  box-shadow: 0px 20px 30px #00000014;
  border-radius: 12px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 32px;
  margin: 15% 0;

  .user-image {
    width: 70px;
    height: 70px;
    background-color: #c5c5c5;
    border-radius: 8px;
  }

  h5 {
    text-align: center;
    font-family: "Poppins";
    font-size: 16px;
    font-weight: medium;
    letter-spacing: 0px;
    color: #393939;
    margin-top: 16px;
    margin-bottom: 3.2px;
  }

  p {
    font-family: "Poppins";
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 0px;
    color: #b2b2b2;
    margin: 0;
    margin-bottom: 16px;
  }

  button {
    background: #ebf1ef;
    border: none;
    border-radius: 8px;
    font-size: 12px;
    font-family: "Poppins";
    font-weight: 600;
    letter-spacing: 0px;
    color: #135846;
    padding: 11.2px 32px;
  }

  button:hover {
    cursor: pointer;
    scale: 1.1;
  }
`;

export const SideBarUserImage = styled.img`
  width: 70px;
  height: 70px;
  background-color: #c5c5c5;
  border-radius: 8px;
  object-fit: cover;
`;

export const MenuLink = styled(NavLink)`
  font-weight: normal;
  color: #799283;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 16px;

  &.active {
    color: #135846;
    font-weight: 600;
  }
`;

export const Copyright = styled.div`
  margin-top: 0;
  padding: 0 1%;

  h6 {
    font-size: 14px;
    font-family: "Poppins";
    font-weight: 600;
    color: #212121;
    margin-bottom: 5px;
    margin-top: 0;
  }

  p {
    font-family: "Poppins";
    font-weight: 300;
    font-size: 12px;
    color: #799283;
    margin: 0;
  }
`;
