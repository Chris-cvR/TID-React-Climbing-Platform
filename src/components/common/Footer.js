import PrimaryButton from "./PrimaryButton";

function Footer() {
    return (
        <footer className="text-center text-lg-start text-muted vw-100 primary">
        <section
          className="d-flex justify-content-center justify-content-lg-between p-3 border-bottom"
        ></section>
  
        <section className="Footer">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4 text">
                  <i className="fas fa-gem me-3 text"></i>PeakPulse
                </h6>
                <p className="text">
                  Unlock New Heights with PeakPulse: 
                  Your Ultimate Destination to share your Climbing Adventures.
                  Discover, Explore, and Conquer the World's Most Thrilling Climbing Locations. © 2023 PeakPulse"</p>
              </div>
  
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <PrimaryButton>

              </PrimaryButton>
              </div>
  
              <div className="col-md-2 col-lg-2 col-xl-3 mx-auto mb-4 text">
              </div>
  
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 text">
                <h6 className="text-uppercase fw-bold mb-4">Contact us:</h6>
                <p>
                  <i className="fas fa-home me-3"></i> Rued Langgaards Vej 7, 2300
                  København, Danmark
                </p>
                <p><i className="fas fa-envelope me-3">PeakPulse@itu.dk</i></p>
                <p><i className="fas fa-phone me-3"></i>+45 72 18 50 00</p>
              </div>
              
            </div>
          </div>
        </section>
  
        <div className="text-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>© 2023 PeakPulse International</div>
      </footer>
  
    )
}

export default Footer;
