import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

const Loader = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Spinner() {
  return (
    <Loader>
      <ClipLoader color={"red"} />
    </Loader>
  );
}

export default Spinner;
