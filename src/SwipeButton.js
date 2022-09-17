import {Button} from 'reactstrap'
/** Handles like/dislike of a user's profile */
function SwipeButton({like, dislike}){
  return (
    <>
    <Button color="warning"
            onClick={like}
            style={{margin:"1rem", display:'inline',justifyContent:'center'}}>
    LIKE ME
  </Button>
    <Button color="danger" onClick={dislike}>
    DON'T LIKE ME
  </Button>
    </>
  )

}
export default SwipeButton;