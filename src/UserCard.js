import { Link } from "react-router-dom";
import {Card, CardBody, CardTitle, CardText} from 'reactstrap'

function UserCard({ user }) {
  const { username, fullName, hobbies, interests, zipcode, radius, image } = user;

  return (
    <Link to={`/users/${username}`} style={{textDecoration:'none', color:'black'}}>
      <Card
          style={{
          width: '12rem',
          height: '14rem',
          margin: '1rem',
          padding: '0.5rem',
          backgroundColor: 'rgba(36, 28, 9, 0.33)'
        }}>
        <CardBody>
          <CardTitle tag="h5">
            {username}
          </CardTitle>

          <div>
            {image && <img src={image}
              alt={fullName}
                style={{
                maxHeight: "10rem",
                width: "100%",
              }}/>}
          </div>

        </CardBody>
      </Card>
    </Link>
  );
}

export default UserCard;