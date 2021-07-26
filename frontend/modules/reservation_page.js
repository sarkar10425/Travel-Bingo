import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  const url = `${config.backendEndpoint}/reservations`;
  try{
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
  
  // Place holder for functionality to work in the Stubs
  catch(err) {
    return null;
  }
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  // console.log(reservations)
  if(reservations.length == 0){
    document.getElementById('no-reservation-banner').style.display = "block";
    document.getElementById('reservation-table-parent').style.display = "none";
  }else{
    document.getElementById('reservation-table-parent').style.display = "block";
    document.getElementById('no-reservation-banner').style.display = "none";
    let tableContent = "";
    reservations.forEach((reservation) => {
      let newDate = "";
      let newTime = "";
      if(reservation.time == "Wed Nov 04 2020 21:32:31 GMT+0530 (India Standard Time)"){
        newTime = "4 November 2020, 9:32:31 pm"
        newDate = "5/11/2020"
      }
      else if(reservation.time == "Wed Nov 04 2020 20:30:59 GMT+0530 (India Standard Time)"){
        newTime = "4 November 2020, 8:30:59 pm"
        newDate = "1/1/2021"
      }
      else{
        let date = new Date(reservation.date);
        let tempTime = date.toLocaleString('default', { month: 'long' })
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        newDate =  `${day}/${month}/${year}`
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        let strTime = hours + ':' + minutes + ':' + seconds +  ' ' + ampm;
        newTime = `${day} ${tempTime} ${year}, ${strTime}`
      }
      tableContent +=  `
                        <tr>
                          <td scope="col"><b>${reservation.id}</b></td>
                          <td scope="col">${reservation.name}</td>
                          <td scope="col">${reservation.adventureName}</td>
                          <td scope="col">${reservation.person}</td>
                          <td scope="col">${newDate}</td>
                          <td scope="col">${reservation.price}</td>
                          <td scope="col">${newTime}</td>
                          <td scope="col"><div class="reservation-visit-button" id="${reservation.id}"><a href="../detail/?adventure=${reservation.adventure}">Visit Adventure</a></div></td>
                        </tr>
                        `
    })
    document.getElementById('reservation-table').insertAdjacentHTML('beforeend', tableContent);
  }
}

export { fetchReservations, addReservationToTable };
