import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { notification } from 'antd';

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: type,
    description: message
  });
};
export const Search = ({ startsWith, searchEmplsByName }) => {
  const [search, setSearch] = useState('');
  useEffect(() => {
    setSearch(startsWith);
  }, [startsWith]);
  const searchByName = () => {
    if (search !== startsWith) {
      searchEmplsByName(search);
    } else {
      openNotificationWithIcon('info', 'You are trying to search the same employees');
    }
  };
  const searchChange = e => setSearch(e.target.value);
  return (
    <div>
      <input onChange={searchChange} type='text' placeholder='Employee name' value={search} />
      <Link to='/'>
        <button onClick={() => searchByName()}>Search</button>
      </Link>
    </div>
  );
};
