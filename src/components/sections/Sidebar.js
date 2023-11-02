import ChangeLocationButton from "../common/ChangeLocationButton";
import ChangeTypeButton from "../common/ChangeTypeButton";
import PrimaryButton from "../common/PrimaryButton";
import "../../styles/index.css";


function Sidebar() {

    return (
    <div id="sidebar">
      <PrimaryButton Text= {"Create Location"}/>
      <ChangeLocationButton TextCL={"Change Location"} DItem1={"Denmark"} DItem3={"Germany"} DItem2={"Norway"}  />
      <ChangeTypeButton TextCT={"Change Type"} DItem1={"Gym-Lead"} DItem3={"Gym-Bouler"} DItem2={"Outdoor-Boulder"}/>
    </div>
  );
}

export default Sidebar;