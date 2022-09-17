import UserCard from "./UserCard"
import { Container, Row, Col } from "reactstrap";


function UserCardList({ users }) {
  console.log("INSIDE USER CARD  LIST")
  return (

    <Container>
      <Row>
      {users.map(user =>
        <Col ><UserCard key={user.username} user={user}  /></Col>)}
        </Row>
    </Container>
  );
}

export default UserCardList;