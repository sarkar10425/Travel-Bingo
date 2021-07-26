
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search)
  return params.get('city');
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  const url = `${config.backendEndpoint}/adventures?city=${city}`;
  try{
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }catch(err){
    return null;
  }
  
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let html = "";
  adventures.forEach((adventure) => {
    html += `
                <div class="col-6 col-sm-6 col-lg-4 col-xl-3">
                  <a href="detail/?adventure=${adventure.id}" id="${adventure.id}">
                    <div class="activity-card">
                        
                          <img
                            src="${adventure.image}"
                            alt="Card image cap"
                            class="img-fluid"
                          />
                        
                          <div class="category-banner">
                            ${adventure.category}
                          </div>

                          <div class="p-2">
                            <div class="d-flex justify-content-between">
                              <div>${adventure.name}</div>
                              <div>₹${adventure.costPerHead}</div>
                            </div>
                            <div class="d-flex justify-content-between">
                              <div>Duration</div>
                              <div>${adventure.duration} Hours</div>
                            </div>
                          </div>

                    </div>
                  </a>
                </div>
              `
  })
  document.getElementById('data').innerHTML = html;
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  // console.log("Inside Duration", low, high)
  let filteredList = [];
  list.forEach((adventure) => {
    if(adventure.duration >= parseInt(low) && adventure.duration <= parseInt(high)){
      filteredList.push(adventure);
    }
  })
  
  return filteredList
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // console.log("Inside category", categoryList)
  let filteredList = [];
  list.forEach((adventure) => {
    categoryList.forEach((category) => {
      if(adventure.category == category){
        filteredList.push(adventure);
      }
    })
  })
  
  return filteredList;
}


// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
  if(filters.duration == "" && filters.category.length != 0){
    
    list = filterByCategory(list, filters.category)
    
  }else if(filters.duration != "" && filters.category.length == 0){

    let duration = filters.duration.split("-")
    list = filterByDuration(list, duration[0], duration[1])

  }else if(filters.duration != "" && filters.category.length != 0){
    
    let duration = filters.duration.split("-")
    list = filterByDuration(list, duration[0], duration[1])
    
    list = filterByCategory(list, filters.category)
    
  }
  // Place holder for functionality to work in the Stubs
  // console.log(list)
  return list;
}


//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  var jsonString = localStorage.getItem("filters");
  if(jsonString){
    var retrievedObject = JSON.parse(jsonString);
    return retrievedObject;
  }
  
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
  let html = "";
  filters.category.forEach((filter) => {
    html += 
            `
              <div class="category-filter">${filter}</div>
            `
  })
  document.getElementById('category-list').innerHTML = html;
  let duration = filters.duration.split("-");
  document.getElementById("duration-select").innerHTML = `<option value="${duration[0]}-${duration[1]}">${duration[0]}-${duration[1]} Hours</option>`
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
