import React, {useState} from 'react';

function ChangeTypeButton({ TextCT, DItem1, DItem2, DItem3, type }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="change-type-button dropdown">
      <button
        className='btn btn-secondary dropdown-toggle'
        type='button'
        id='dropdownMenuButton'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
        onClick={toggleDropdown}
      >
        {TextCT}
      </button>
      <div className={`dropdown-menu${isOpen ? ' show' : ''}`} aria-labelledby='dropdownMenuButton'>
        <label>
          <input type={type} name="type" value={DItem1} /> {DItem1}
        </label>
        <label>
          <input type={type} name="type" value={DItem2} /> {DItem2}
        </label>
        <label>
          <input type={type} name="type" value={DItem3} /> {DItem3}
        </label>
      </div>
    </div>
  );
}

export default ChangeTypeButton;