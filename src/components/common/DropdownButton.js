import React, { useState } from 'react';

function DropdownButton({ textct, ditem1, ditem2, ditem3, type }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="change-type-button dropdown">
      <button
        className='btn btn-secondary dropdown-toggle'
        type='button'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
        onClick={toggleDropdown}
      >
        {textct}
      </button>
      <div className={`dropdown-menu${isOpen ? ' show' : ''}`} aria-labelledby='drop-down-menu-button'>
        <label>
          <input type={type} name="type" value={ditem1} /> {ditem1}
        </label>
        <label>
          <input type={type} name="type" value={ditem2} /> {ditem2}
        </label>
        <label>
          <input type={type} name="type" value={ditem3} /> {ditem3}
        </label>
      </div>
    </div>
  );
}

export default DropdownButton;