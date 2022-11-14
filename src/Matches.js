import { useState, useEffect } from "react";
// import UserCardList from "./UserCardList";
import FrienderApi from "./_api";
import Loading from "./Loading";
import { Card, CardBody, CardTitle, CardSubtitle, ListGroup, ListGroupItem , SwipeButton} from 'reactstrap';
import './Matches.css';


/** Show current user's matches */
function Matches() {
  const [users, setUsers] = useState(null);

  useEffect(function getMatchesOnMount() {
    async function listUsers() {
      let users = await FrienderApi.getMatches();
      setUsers(users);
    }
    listUsers();
  }, []);

  if (!users) return <Loading />;

  return (
    <div className="d-flex justify-content-center">
      {users.length > 0
        ?
        users.map(user => (
          <div className='overflow-hidden'>
            <Card className="cardFrame">
              <CardBody >
                <CardTitle className='cardTitle'>
                  @{user.username}
                </CardTitle>
                <CardSubtitle className='subtitle'>
                  {user.fullName}
                </CardSubtitle>
                {user.image && <img src={user.image}
                  alt={user.fullName}
                  className="image"
                />}

                <ListGroup flush>
                  <ListGroupItem className='details'>
                    {user.hobbies}
                  </ListGroupItem>
                  <br></br>
                  <ListGroupItem className='details'>
                    {user.interests}
                  </ListGroupItem>

                </ListGroup>
              </CardBody>
            </Card>
          </div>
        ))
        :
        <div className="nomatch"> You don't have any matches yet!</div>}
    </div>
  );

}

export default Matches;