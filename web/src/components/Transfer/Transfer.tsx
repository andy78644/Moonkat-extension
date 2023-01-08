import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import Header from './Header';
import AssetsIn from './AssetsIn';
import AssetsOut from './AssetsOut';
import MoreTags from './MoreTags/MoreTags';
import './Transfer.css';

interface Props {

}

const Transfer = (props: Props) => {
  const [moreTags, setMoreTags] = useState(false);
  return (
    <div>
      {
        moreTags
          ?
          <div>
            <MoreTags></MoreTags>
          </div>
          :
          <div>
            <Header></Header>
            <AssetsIn></AssetsIn>
          </div>
      }
      <AssetsOut></AssetsOut>
    </div>
  );
};

export default Transfer;