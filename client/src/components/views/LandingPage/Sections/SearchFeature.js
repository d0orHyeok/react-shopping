import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

function SearchFeature(props) {
  const [SearchText, setSearchText] = useState('');

  const searchHandler = e => {
    setSearchText(e.currentTarget.value);
    props.refreshFunction(e.currentTarget.value);
  };

  return <Search placeholder="search product" onChange={searchHandler} value={SearchText} style={{ width: 200 }} />;
}

export default SearchFeature;
