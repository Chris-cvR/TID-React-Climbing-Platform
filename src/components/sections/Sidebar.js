import React, { useState } from 'react';
import "../../styles/index.css";
import { Button } from 'antd';
import DBFetcherDropdownButton from '../common/DBFetcherDropdownButton';

function Sidebar({ handleShow, onCountryChange, onTypeChange, onDifficultyChange }) {
  const [selectedCountry, setSelectedCountry] = useState('None');
  const [selectedType, setSelectedType] = useState('None');
  const [selectedDifficulty, setSelectedDifficulty] = useState('None');

  return (
    <div className="sidebar">
      <nav className="nav">
        <ul>
          <div className='sidebar-buttons'>
            <Button onClick={handleShow} className="form-button" size="large"> Create Location </Button>
            <div className='dropdown-buttons-sidebar'>
              <div className='dropdown-button-group'>
                <DBFetcherDropdownButton
                  parseClassName='Countries'
                  columnName='Country'
                  placeHolderText='Countries'
                  onSelect={(value) => onCountryChange(value)}
                />
              </div>
              <div className='dropdown-button-group'>
                <DBFetcherDropdownButton
                  parseClassName='Types'
                  columnName='TypeName'
                  placeHolderText='Type'
                  onSelect={(value) => onTypeChange(value)}
                />
              </div>
              <div className='dropdown-button-group'>
                <DBFetcherDropdownButton
                  parseClassName='Difficulty'
                  columnName='Difficulty'
                  placeHolderText='Difficulty'
                  onSelect={(value) => onDifficultyChange(value)}
                />
              </div>
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
