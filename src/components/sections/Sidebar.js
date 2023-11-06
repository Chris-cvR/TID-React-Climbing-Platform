import React from 'react';
import ChangeLocationButton from "../common/ChangeLocationButton";
import ChangeTypeButton from "../common/ChangeTypeButton";
import PrimaryButton from "../common/PrimaryButton";
import "../../styles/index.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <nav className="nav">
        <ul>
          <PrimaryButton Text={"Create Location"} />
          <div className='dropdown-buttons'>
            <ChangeLocationButton TextCL={"Change Location"} DItem1={"Denmark"} DItem3={"Germany"} DItem2={"Norway"} type="radio" />
            <ChangeTypeButton TextCT={"Change Type"} DItem1={"Gym-Lead"} DItem3={"Gym-Bouler"} DItem2={"Outdoor-Boulder"} type="checkbox" />
          </div>
        </ul>
      </nav>
    </div>
  );
}


export default Sidebar;
