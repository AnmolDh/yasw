import styled from "styled-components";

const CardDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(100px, 1fr));
  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, minmax(100px, 1fr));
  }
`;

const H2 = styled.h2`
  padding-top: 60px;
  margin-bottom: 20px;
`;

function Cards(props) {
  return (
    <>
      <H2>{props.category}</H2>
      <CardDiv>{props.children}</CardDiv>
    </>
  );
}

export default Cards;
