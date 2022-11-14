import UserCard from "./UserCard"
import { Container, Row, Col } from "reactstrap";
import "./UserCardList.css";

function UserCardList({ users }) {
  return (
    <Container fluid>
      <Row>
      {users.map(user =>
        <Col
        className="user-card"
        key={user.username}
        >
          <UserCard user={user} />
          </Col>
          )}
        </Row>
    </Container>
  );
}

export default UserCardList;