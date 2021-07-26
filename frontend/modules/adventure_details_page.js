import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  try{
    const params = new URLSearchParams(search)
    return params.get('adventure');
  }
  

  // Place holder for functionality to work in the Stubs
  catch(e){
    return null;
  }
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  let url = `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`;
  try{
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
  // Place holder for functionality to work in the Stubs
  catch(e){
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  
  document.getElementById('adventure-name').innerHTML = adventure.name;
  document.getElementById('adventure-subtitle').innerHTML = adventure.subtitle;
  let images = adventure.images;
  let imageHTML = ``;
  images.forEach((image) => {
    imageHTML += `
                    <div class="activity-card-image">
                      <img src=${image} height="100%" width="100%">
                    </div>
                  `
  })
  document.getElementById('photo-gallery').innerHTML = imageHTML;
  document.getElementById('adventure-content').innerHTML = adventure.content
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let imageHTML = `<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                      <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                      </ol>
                      <div class="carousel-inner">
                  `
  for(let i=0;i<images.length;i++){
    if(i == 0){
      imageHTML += `
                  <div class="carousel-item active activity-card-image">
                      <img src=${images[i]} height="100%" width="100%" >
                  </div>
                `
    }else{
      imageHTML += `
                  <div class="carousel-item activity-card-image">
                      <img src=${images[i]} height="100%" width="100%" >
                  </div>
                `
    }
  }
  imageHTML += `
                  </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                `
  document.getElementById('photo-gallery').innerHTML = imageHTML;
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  
  const costPerHead = adventure.costPerHead
  const available = adventure.available
  if(available === true){
    document.getElementById('reservation-panel-sold-out').style.display = "none";
    document.getElementById('reservation-panel-available').style.display = "block";
    document.getElementById('reservation-person-cost').innerHTML = costPerHead;
  }else{
    document.getElementById('reservation-panel-available').style.display = "none";
    document.getElementById('reservation-panel-sold-out').style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const costPerHead = adventure.costPerHead;
  if(persons){
    const totalPrice = costPerHead * parseInt(persons);
    document.getElementById('reservation-cost').innerHTML = totalPrice;
  }
}

//Implementation of reservation form submission using JQuery
function captureFormSubmitUsingJQuery(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  
  const url = `${config.backendEndpoint}/reservations/new`;
  $('#myForm').submit( function(e) {
    e.preventDefault()
    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: $('#myForm').serialize() + "&adventure=" + adventure.id,
        success: function(data) {
            alert("Success!");
            window.location.reload();
        },
        error: function(){
          alert("Failed!");
        }
    });
    
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved === true){
    document.getElementById('reserved-banner').style.display = "block";
  }else{
    document.getElementById('reserved-banner').style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
