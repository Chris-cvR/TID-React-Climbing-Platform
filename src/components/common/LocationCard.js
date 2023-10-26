
function LocationCard() {

    return (
        <div class="card mx-auto card-width card-margin">
            <a href="Location.html">
                <img src="Images/blocswalls_1.jpg" class="card-img-top" />
            </a>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3.5">
                        <div class="d-flex align-items-center">
                            <div id="likes-container">
                                <i class="fa fa-heart-o btn btn-default" onclick="javascript:btnClick()" id="heart"></i>
                                <div id="likes">0</div>
                            </div>
                            <div id="location-details" class="ml-2">
                                <h5 class="card-title mb-2">Blocs & Walls</h5>
                                <h6 class="mt-1">Denmark</h6>
                                <small class="text-muted">Type: Bouldering, Gym</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LocationCard;

