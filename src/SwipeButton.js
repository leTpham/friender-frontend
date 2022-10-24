import { Button } from 'reactstrap';
import { TbFriends } from 'react-icons/tb';
import { TbFriendsOff } from 'react-icons/tb';
import './SwipeButton.css';
/** Handles like/dislike of a user's profile */
function SwipeButton({ like, dislike }) {
  return (
    <div class="d-flex justify-content-between swipers">
      <Button outline color="danger" onClick={dislike}>
        <TbFriendsOff />
        <span> &nbsp;No thanks!</span>
      </Button>
      <Button outline color="info"
        onClick={like}
        // style={{ margin: "1rem", display: 'inline', justifyContent: 'center' }}
        >
        <TbFriends />
        <span> &nbsp;Let's connect!</span>
      </Button>
    </div>
  );

}
export default SwipeButton;