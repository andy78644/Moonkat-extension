import React from 'react';
import ReactDom from 'react-dom';
import Browser from 'webextension-polyfill';


const Popup = () =>{
    return ( 
        <div className="flex flex-col gap-3 items-center p-4">
        <div className="w-[150px]">
        </div>
        <div className="flex flex-wrap justify-center items-center gap-2">
          Test Verison One
        </div>
        <div>Version {Browser.runtime.getManifest().version}</div>
      </div>
    );
};


ReactDom.render(
    <React.StrictMode>
      <Popup />
    </React.StrictMode>,
    document.getElementById('root')
);