import styled from "styled-components";
import { Link } from "react-router-dom";

const IMG = styled.img`
  width: 90%;
  height: 90%;
  border-radius: 10px;

  &:hover {
    transition: transform 0.3s;
    transform: scale(1.1);
  }
`;

function Card(props) {
  return (
    <div>
      <Link to={props.data.id}>
        <IMG src={props.data.image} alt={props.data.title} />
      </Link>
    </div>
  );
}

export default Card;
