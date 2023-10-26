import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <footer className="text-center text-lg-start text-muted vw-100 primary">
      <section className="d-flex justify-content-center justify-content-lg-between p-3 border-bottom"></section>

      <section className="Footer">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-6 col-lg-6 col-xl-6 mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text">
                <FontAwesomeIcon className="me-3 text" />PeakPulse
              </h6>
              <p className="text">
                Unlock New Heights with PeakPulse: Your Ultimate Destination to share your Climbing Adventures. Discover, Explore, and Conquer the World's Most Thrilling Climbing Locations. © 2023 PeakPulse
              </p>
            </div>

            <div className="col-md-6 col-lg-6 col-xl-6 mb-md-0">
              <h6 className="text-uppercase fw-bold">Contact us:</h6>
              <p>
                <FontAwesomeIcon icon={faHome} className="me-3" />Rued Langgaards Vej 7, 2300 Copenhagen, Danmark
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} className="me-3" />PeakPulse@itu.dk
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} className="me-3" />+45 72 18 50 00
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 PeakPulse International
      </div>
    </footer>
  );
}

export default Footer;
