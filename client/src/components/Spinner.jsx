import SyncLoader from "react-spinners/SyncLoader";
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
      <SyncLoader color={"red"} />
    </Loader>
  );
}

export default Spinner;
