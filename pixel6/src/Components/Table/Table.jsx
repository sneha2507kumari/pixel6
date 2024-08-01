import React, { useState, useEffect } from 'react';
import Userdata from '../Userdata/Userdata';
import Pagination from '../Pagination/Pagination';
import './Table.css';

const API = "https://dummyjson.com/users";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [genderFilter, setGenderFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const FetchData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setUsers(data.users);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    FetchData(API);
  }, []);

  const uniqueCountries = [...new Set(users.map(user => user.address.country))];

  const filteredUsers = users.filter(user => {
    return (
      (!genderFilter || user.gender === genderFilter) &&
      (!countryFilter || user.address.country === countryFilter)
    );
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getSortClass = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction;
    }
    return '';
  };

  return (
    <>
      <h2>Employees</h2>
      <div className="filter-container">
        <label>Filter by Gender:</label>
        <select onChange={(e) => setGenderFilter(e.target.value)} value={genderFilter}>
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label>Filter by Country:</label>
        <select onChange={(e) => setCountryFilter(e.target.value)} value={countryFilter}>
          <option value="">All</option>
          {uniqueCountries.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th
              className={`sortable ${getSortClass('id')}`}
              onClick={() => requestSort('id')}
            >
              ID
              <span className="sort-arrow"></span>
            </th>
            <th>Image</th>
            <th
              className={`sortable ${getSortClass('firstName')}`}
              onClick={() => requestSort('firstName')}
            >
              Full Name
              <span className="sort-arrow"></span>
            </th>
            <th>Demography</th>
            <th>Designation</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <Userdata users={currentUsers} />
        </tbody>
      </table>

      <Pagination 
        usersPerPage={usersPerPage} 
        totalUsers={sortedUsers.length} 
        paginate={paginate} 
        currentPage={currentPage} 
      />
    </>
  );
};

export default Table;

