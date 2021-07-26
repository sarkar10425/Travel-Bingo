import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  const url = `${config.backendEndpoint}/cities`;
  try{
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }catch(err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const html = `
                  <div class="col-6 col-sm-6 col-lg-4 col-xl-3">
                    <div class="tile">
                        <a href="pages/adventures/?city=${id}" id="${id}">
                          <img
                            src="${image}"
                            alt="Card image cap"
                            class="img-fluid"
                          />
                        </a>
                        
                        <div class="tile-text">
                          <h5>${city}</h5>
                          <h5>${description}</h5>
                        </div>
                        
                      </div>
                  </div>
              `
  document.getElementById('data').insertAdjacentHTML("beforeend", html);
}

export { init, fetchCities, addCityToDOM };
