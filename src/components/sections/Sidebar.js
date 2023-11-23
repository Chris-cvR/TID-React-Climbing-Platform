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
            <DropdownButton id="option-button" parseClassName='Countries' columnName='Country' placeHolderText='Countries'></DropdownButton> 
            <DropdownButton id="option-button" parseClassName='Types' columnName='TypeName' placeHolderText='Type'></DropdownButton>
          </div>
        </ul>
      </nav>
    </div>
  );
}


export default Sidebar;
