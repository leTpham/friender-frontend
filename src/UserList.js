import { useState, useEffect } from "react";
import FrienderApi from "./_api";
import Loading from "./Loading";

import UserCardList from "./UserCardList";

function UserList() {
  const [users, setUsers] = useState(null);

  useEffect(function getUsersOnMount() {
    async function listUsers() {
      let users = await FrienderApi.getAllUsers();
      setUsers(users);
    }
    listUsers();
  }, []);

  if (!users) return <Loading />;



  return (

    <div>

      <UserCardList users={users} />

    </div>

  );


}
export default UserList;