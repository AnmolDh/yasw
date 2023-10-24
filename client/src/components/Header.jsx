import styled from "styled-components";
import logo from "../assets/logo.png";

const HeaderDiv = styled.header`
  display: flex;
  align-items: center;
  padding: 20px 0;
`;

const UL = styled.ul`
  list-style: none;
  display: flex;
`;

const LI = styled.li`
  margin: 0 10px;
`;

function Header({setPage}) {
  return (
    <HeaderDiv>
      <img width="102px" height="33px" src={logo} />
      <UL>
        <LI>
          <button
            onClick={() => {
              setPage("home");
            }}
          >
            Home
          </button>
        </LI>
        <LI>
          <button
            onClick={() => {
              setPage("tv");
            }}
          >
            TV Shows
          </button>
        </LI>
        <LI>Movies</LI>
        <LI>Recently Added</LI>
      </UL>
    </HeaderDiv>
  );
}

export default Header;
