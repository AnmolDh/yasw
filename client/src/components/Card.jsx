import styled from "styled-components";

const CardDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(100px, 1fr));
  grid-gap: 20px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, minmax(100px, 1fr));
  }
`;

const IMG = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;

  &:hover {
    transition: transform 0.3s;
    transform: scale(1.1);
  }
`;

function Card(props) {
  const trendingImages = props.trending
    ? props.trending.map((e) => {
        return (
          <div key={e.id}>
            <a href={e.url}>
              <IMG src={e.image} />
            </a>
          </div>
        );
      })
    : null;

  return <CardDiv>{trendingImages}</CardDiv>;
}

export default Card;
