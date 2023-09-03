import styled from "styled-components";

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

function Header() {
  return (
    <HeaderDiv>
      <img
        width="102px"
        height="33px"
        src="https://raw.githubusercontent.com/carlosavilae/Netflix-Clone/master/img/logo.PNG"
      />
      <UL>
        <LI>
          <strong>Home</strong>
        </LI>
        <LI>TV Shows</LI>
        <LI>Movies</LI>
        <LI>Recently Added</LI>
      </UL>
    </HeaderDiv>
  );
}

export default Header;