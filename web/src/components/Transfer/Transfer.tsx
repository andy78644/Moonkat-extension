import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import Header from './Header';
import AssetsIn from './AssetsIn';
import AssetsOut from './AssetsOut';
import MoreTags from './MoreTags/MoreTags';
import './Transfer.css';

interface Props {
    assetOut: any;
    assetIn: any;
    gas: any;
    outSymbol: any;
    inSymbol:any;
}

const Transfer = (props: Props) => {
  const [moreTags, setMoreTags] = useState(false);
  const {assetOut, assetIn, gas, outSymbol, inSymbol} = props;
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
            <AssetsIn
              { ...{asset:assetIn, symbol:inSymbol}}
            ></AssetsIn>
          </div>
      }
      <AssetsOut
        {...{asset:assetOut, symbol:outSymbol, gas:gas}}
      ></AssetsOut>
    </div>
  );
};

export default Transfer;