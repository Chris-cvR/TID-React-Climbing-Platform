import React from 'react';
import "../../styles/index.css";
import { Button } from 'antd';
import DropdownButton from '../common/DropdownButton'

function Sidebar({ handleShow }) {

  return (
    <div className="sidebar">
      <nav className="nav">
        <ul>
          <Button onClick={handleShow} className="form-button" size="large"> Create Location </ Button>
          <div className='dropdown-buttons-sidebar'>
            <DropdownButton parseClassName='Countries' columnName='Country' placeHolderText='Countries'></DropdownButton>
          </div>
        </ul>
      </nav>
    </div>
  );
}


export default Sidebar;
