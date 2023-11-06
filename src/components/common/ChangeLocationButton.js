// ChangeLocationButton.js

import React, {useState} from 'react';

function ChangeLocationButton({ TextCL, DItem1, DItem2, DItem3, type }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="change-location-button dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={toggleDropdown}
      >
        {TextCL}
      </button>
      <div className={`dropdown-menu${isOpen ? ' show' : ''}`} aria-labelledby="dropdownMenuButton">
        <label>
          <input type={type} name="location" value={DItem1} /> {DItem1}
        </label>
        <label>
          <input type={type} name="location" value={DItem2} /> {DItem2}
        </label>
        <label>
          <input type={type} name="location" value={DItem3} /> {DItem3}
        </label>
      </div>
    </div>
  );
}

export default ChangeLocationButton;
