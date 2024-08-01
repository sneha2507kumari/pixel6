import React from 'react';

const Userdata = ({ users }) => {
  return (
    <>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td><img src={user.image} alt={`${user.firstName} ${user.lastName}`}style={{
                    width: '50px', 
                    height: '50px',
                    objectFit: 'cover', 
                    borderRadius: '30%',
                  }} /></td>
          <td>{user.firstName} {user.lastName}</td>
          <td>{user.age} {user.gender === 'male' ? 'M' : 'F'}</td>
          <td>{user.company.title}</td>
          <td>{user.address.city}, {user.address.country}</td>
        </tr>
      ))}
    </>
  );
};

export default Userdata;
