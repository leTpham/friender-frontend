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

  return (<>
  {users.length > 0
  ?
  users.map(u => (
    <Card className="oneCard">
    <CardBody>
      <CardTitle className='cardTitle' tag="h5">
        {u.username}
      </CardTitle>
      <CardSubtitle>
        {u.fullName}
      </CardSubtitle>
      <div  key={u.username}>
        {u.image && <img src={u.image}
          alt={u.fullName}
          className='image' />}
      </div>

        <CardText className='cardText'>
          <h4>Hobbies: {u.hobbies}sssssssss</h4>
          <h4>interests: {u.interests}</h4>
        </CardText>
      </CardBody>
    </Card>
    ))
    :
    <p> No matches yet!</p> }</>
  );

}

export default Matches;