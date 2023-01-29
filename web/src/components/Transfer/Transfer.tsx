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
      <Header tagState={moreTags} changeTag={setMoreTags}></Header>
      {
        moreTags
          ?
          <div>
            <MoreTags></MoreTags>
          </div>
          :
          <div>
            <AssetsIn></AssetsIn>
          </div>
      }
      <AssetsOut></AssetsOut>
    </div>
  );
};

export default Transfer;