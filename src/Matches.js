import { useState, useEffect } from "react";
// import UserCardList from "./UserCardList";
import FrienderApi from "./_api";
import Loading from "./Loading";
import {Card, CardBody, CardTitle, CardText, CardSubtitle} from 'reactstrap'
import './Matches.css'


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
  users.map(u => (
    <Card
    key={u.username}
    className="oneCard"
    >
    <CardBody>
      <CardTitle className='cardTitle' tag="h1">
        {u.username}
     </CardTitle>
      <CardSubtitle className='subtitle'>
        {u.fullName}
      </CardSubtitle>
      <div  key={u.username}>
        {u.image && <img src={u.image}
          alt={u.fullName}
          className='image' />}
      </div>

        <CardText className='cardText'>
          Hobbies: {u.hobbies}
          interests: {u.interests}
        </CardText>
      </CardBody>
    </Card>
    ))
    :
    <div className="nomatch"> You don't have any matches yet!</div> }
    </div>
  );

}

export default Matches;