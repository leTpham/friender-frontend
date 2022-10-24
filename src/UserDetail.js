import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import FrienderApi from './_api';
import Loading from './Loading';
import SwipeButton from './SwipeButton';
import { useNavigate } from "react-router-dom";
import userContext from "./userContext";
import { Card, CardBody, CardTitle, CardText, CardSubtitle, ListGroup, ListGroupItem } from 'reactstrap';
import './UserDetail.css';

function UserDetail({ cantfind }) {
  const { currentUser } = useContext(userContext);
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [errors, setFormErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(function userInfo() {
    async function getUserInfo() {
      try {
        const user = await FrienderApi.getOneUser(username);
        setUser(user);
      } catch (err) {
        setFormErrors(err);
      }
    }
    getUserInfo();
  }, [username]);


  async function likeUser() {
    const resp = await FrienderApi.likeOneUser(username);

    if (resp === "It's a match!") {
      alert("It's a match!");
      navigate("/matches");
    }
    else {
      navigate("/users");
    }
  }

  async function dislikeUser() {
    await FrienderApi.dislikeOneUser(username);
    navigate("/users");
  }


  if (!user && errors.length < 1) return (<Loading />);

  return (
    <div className="d-flex justify-content-center ">
      {errors.length > 0
        ?
        <Navigate to={cantfind} />
        :
        <div className='overflow-hidden'>
          <Card className="cardFrame">
            <CardBody >
              <CardTitle className='cardTitle' tag='h1'>
                {user.username}
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

              {user.username !== currentUser.username
                ?
                <SwipeButton like={likeUser} dislike={dislikeUser} />
                :
                null
              }
            </CardBody>
          </Card>
        </div>
      }
    </div>
  );
}

export default UserDetail;