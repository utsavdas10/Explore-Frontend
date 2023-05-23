import React from 'react';
import UserList from '../components/UserList';

const Users = () => {
    const USERS = [
      {
        id: 'u1', 
        name: 'Utsav Das',
        image: 'https://cdn.dribbble.com/users/1684249/screenshots/15431837/media/b8793da764afaf229379b316181bf8eb.gif',
        places: 3
      }
    ];

  return <UserList items={USERS}/>;
};

export default Users;
