import { Link } from "react-router-dom";
import {Card, CardBody, CardTitle, CardText} from 'reactstrap'
import "./UserCard.css";
function UserCard({ user }) {
  const { username, fullName, image } = user;

  return (
    <div>
    <Link to={`/users/${username}`} className="link">
      <Card className="oneCard">
        <CardBody>
          <CardTitle>
            @{username}
          </CardTitle>
            {image
            && <img src={image}
                    alt={fullName}
                    className="image"/>}
        </CardBody>
      </Card>
    </Link>
    </div>
  );
}

export default UserCard;