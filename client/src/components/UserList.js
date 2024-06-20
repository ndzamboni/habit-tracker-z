import React, { useEffect, useState } from 'react';
import { getUser } from '../api/api';

const UserList = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser(userId);
      setUser(response.data);
    };

    fetchUser();
  }, [userId]);

  return (
    <div>
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserList;
