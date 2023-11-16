import React from 'react';
import DropdownButton from "../common/DropdownButton";
import "../../styles/index.css";
import { Button } from 'antd';

function Sidebar({ handleShow }) {

  return (
    <div className="sidebar">
      <nav className="nav">
        <ul>
          <Button onClick={handleShow} className="form-button" size="large"> Create Location </ Button>
          <div className='dropdown-buttons-sidebar'>
            <DropdownButton textct={"Change Country"} ditem1={"Denmark"} ditem3={"Germany"} ditem2={"Norway"} type="radio" />
            <DropdownButton textct={"Change Type"} ditem1={"Gym-Lead"} ditem3={"Gym-Bouler"} ditem2={"Outdoor-Boulder"} type="checkbox" />
          </div>
        </ul>
      </nav>
    </div>
  );
}


export default Sidebar;
