import React from 'react';
import "../../styles/index.css";
import { Button } from 'antd';
import DBFetcherDropdownButton from '../common/DBFetcherDropdownButton'

function Sidebar({ handleShow }) {

  return (
    <div className="sidebar">
      <nav className="nav">
        <ul>
          <Button onClick={handleShow} className="form-button" size="large"> Create Location </ Button>
          <div className='dropdown-buttons-sidebar'>
            <div className='dropdown-button-group'>
              <DBFetcherDropdownButton parseClassName='Countries' columnName='Country' placeHolderText='Countries'></DBFetcherDropdownButton>
            </div>
            <div className='dropdown-button-group'>
              <DBFetcherDropdownButton parseClassName='Types' columnName='TypeName' placeHolderText='Type'></DBFetcherDropdownButton>
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
}


export default Sidebar;
