import VeryImportantPicture from '../assets/images/SpookyCet.jpg'

function AboutPage() {

    const CuteCet = VeryImportantPicture;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <p>Here a Spooky Cet for u while we work on fixing this page :3</p>
            <img src={CuteCet} alt='' />
        </div>

    );
}

export default AboutPage;