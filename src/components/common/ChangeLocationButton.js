import Dropdown from 'react-bootstrap/Dropdown';
import "../../styles/index.css";

function ChangeLocationButton({TextCL, DItem1, DItem2, DItem3}) {

    const ButtonTextCL= TextCL;
    const DropdownItem1= DItem1;
    const DropdownItem2= DItem2;
    const DropdownItem3= DItem3;

    return (

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basicCL">{ButtonTextCL}</Dropdown.Toggle>
        
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">{DropdownItem1}</Dropdown.Item>
                <Dropdown.Item href="#/action-2">{DropdownItem2}</Dropdown.Item>
                <Dropdown.Item href="#/action-3">{DropdownItem3}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          );
        }
    
    export default ChangeLocationButton;