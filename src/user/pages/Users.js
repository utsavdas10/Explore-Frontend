import React from 'react';
import UserList from '../components/UserList';

const Users = () => {
    const USERS = [
      {
        id: 'u1', 
        name: 'Utsav Das',
        image: 'https://cdn.dribbble.com/users/1684249/screenshots/15431837/media/b8793da764afaf229379b316181bf8eb.gif',
        places: 3
      },
      {
        id: 'u2', 
        name: 'Deya Hazra',
        image: 'https://cdn.dribbble.com/userupload/6493616/file/original-ea422834716af81b0c6a90646a818dd1.jpg?compress=1&resize=450x338&vertical=top',
        places: 4
      },
      {
        id: 'u3', 
        name: 'Raya Hazra',
        image: 'https://cdn.dribbble.com/userupload/4998211/file/original-557dd8fbf8ad6ca90c48675f4535ddcd.png?compress=1&resize=450x338&vertical=top',
        places: 1
      },
      {
        id: 'u4', 
        name: 'Subir Das',
        image: 'https://cdn.dribbble.com/users/35810/screenshots/5478946/danny-knights-01thumb.jpg?compress=1&resize=450x338&vertical=top',
        places: 2
      },
      {
        id: 'u5', 
        name: 'Raju Da',
        image: 'https://cdn.dribbble.com/userupload/3223268/file/still-aaa3d79fff603264f244ba79e34864fd.png?compress=1&resize=450x338&vertical=top',
        places: 4
      }

    ];

  return <UserList items={USERS}/>;
};

export default Users;
