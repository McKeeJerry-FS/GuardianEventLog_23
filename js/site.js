const events = [
  {
      event: "ComicCon",
      city: "New York",
      state: "New York",
      attendance: 240000,
      date: "06/01/2017",
  },
  {
      event: "ComicCon",
      city: "New York",
      state: "New York",
      attendance: 250000,
      date: "06/01/2018",
  },
  {
      event: "ComicCon",
      city: "New York",
      state: "New York",
      attendance: 257000,
      date: "06/01/2019",
  },
  {
      event: "ComicCon",
      city: "San Diego",
      state: "California",
      attendance: 130000,
      date: "06/01/2017",
  },
  {
      event: "ComicCon",
      city: "San Diego",
      state: "California",
      attendance: 140000,
      date: "06/01/2018",
  },
  {
      event: "ComicCon",
      city: "San Diego",
      state: "California",
      attendance: 150000,
      date: "06/01/2019",
  },
  {
      event: "HeroesCon",
      city: "Charlotte",
      state: "North Carolina",
      attendance: 40000,
      date: "06/01/2017",
  },
  {
      event: "HeroesCon",
      city: "Charlotte",
      state: "North Carolina",
      attendance: 45000,
      date: "06/01/2018",
  },
  {
      event: "HeroesCon",
      city: "Charlotte",
      state: "North Carolina",
      attendance: 50000,
      date: "06/01/2019",
  },
];

function buildDropdown() {
    
    // get all the events that we know about
    let currentEvents = getEvents();

    // get a list of unique city names
    let eventCities = currentEvents.map(event => event.city);   // lambda function (array method) 
                                                                // creates a new area of values specified
    let uniqueCities = new Set(eventCities);
    let dropdownChoices = ['All', ...uniqueCities];
    
    // get the dropdown template element and dropdown menu
    const dropdownItemTemplate = document.getElementById('dropdownItemTemplate');
    const cityDropdownMenu = document.getElementById('city-dropdown');
    cityDropdownMenu.innerHTML = '';

    // foreach of those city names:
    for(let i = 0; i < dropdownChoices.length; i++){
        let cityName = dropdownChoices[i];
        //  - need to make a dropdown item HTML element
        let dropdownMenuItem = dropdownItemTemplate.content.cloneNode(true);

        //  - and add the element to the dropdown menu
        dropdownMenuItem.querySelector('a').innerText = cityName;
        cityDropdownMenu.appendChild(dropdownMenuItem);
    }

    displayEvents(currentEvents);
    displayStats(currentEvents);
    document.getElementById('statsLocation').textContent = 'All';

}

function getEvents() {
    // TODO: get events from loval storage
    let eventsJson = localStorage.getItem('jmj-events');

    let storedEvents = events;
    if (eventsJson == null) {
        saveEvents(events);
    } else {
        storedEvents = JSON.parse(eventsJson);
    }

    return storedEvents;
}

function saveEvents(events) {

    // string ify the event coming from the form
    let eventsJson = JSON.stringify(events);

    // send the stingified event to localStorage along with a key
    localStorage.setItem('jmj-events', eventsJson);

}

function addNewEvents() {
    // get all known events
    let addEventForm = document.getElementById('addEventForm');
    
    // create an object from the form
    let formData = new FormData(addEventForm);
    let newEvent = Object.fromEntries(formData.entries());

    // fix the format
    newEvent.attendance = parseInt(newEvent.attendance);
    newEvent.date = new Date(newEvent.date).toLocaleDateString();

    // get all current events
    let allEvents = getEvents();
    // add our new event
    allEvents.push(newEvent);
    // save the events
    saveEvents(allEvents);

    //clear form
    addEventForm.reset();

    // hide the modal
    let modalElement = document.getElementById('addEventModal');
    let bsModal = bootstrap.Modal.getInstance(modalElement);
    bsModal.hide();

    // display all events
    buildDropdown();
}

function displayEvents(events){

    // get the table to put the events in 
    const eventsTable = document.getElementById('eventsTable');
    // clear the table
    eventsTable.innerHTML = '';
    // loop through the events:

    for(let i = 0; i < events.length; i++){
        let event = events[i];
        //  - fill the table with rows
        //      - make a <tr></tr>
        let eventRow = document.createElement('tr');
        //      - make a <td></td>
        let eventName = document.createElement('td');
        eventName.innerText = event.event;
        //      - put the data into each <td>
        eventRow.appendChild(eventName)
        
        let eventCity = document.createElement('td');
        eventCity.innerText = event.city;
        eventRow.appendChild(eventCity)
        
        let eventState = document.createElement('td');
        eventState.innerText = event.state;
        eventRow.appendChild(eventState)
        
        let eventAttendance = document.createElement('td');
        eventAttendance.innerText = event.attendance.toLocaleString();
        eventRow.appendChild(eventAttendance)
        
        let eventDate = document.createElement('td');
        let date = new Date(event.date)
        eventDate.innerText = date.toLocaleDateString();
        eventRow.appendChild(eventDate)
        
        //      - append the row to the <tbody>
        eventsTable.appendChild(eventRow);
    }
}

function calculateStats(events) {
    let sum = 0;
    let min = events[0].attendance;
    let max = 0;
    for (let i = 0; i < events.length; i++) {
        let event = events[i];

        sum += event.attendance;

        if (event.attendance < min){
            min = event.attendance
        } 
        
        if (event.attendance > max){
            max = event.attendance;
        }


    }
    
    let avg = sum / events.length;

    let stats = {
        sum,
        avg,
        min,
        max,
    }
    return stats;

}

function displayStats(events) {

    let stats = calculateStats(events)
    document.getElementById('totalAttendance').innerText = stats.sum.toLocaleString();
    document.getElementById('avgAttendance').innerText = Math.round(stats.avg).toLocaleString();
    document.getElementById('maxAttendance').innerText = stats.max.toLocaleString();
    document.getElementById('minAttendance').innerText = stats.min.toLocaleString();

}

function filterByCity(dropdownBtn) {
    
    let cityName = dropdownBtn.textContent;
    document.getElementById('statsLocation').innerText = cityName;
    // document.getElementById('dropdownBtn').innerText = cityName;

    // get all the events
    let allEvents = getEvents();
    let eventsInCity = [];

    // filter those events to just one city
    // for(let i=0; i < allEvents.length; i++){
    //     let event = allEvents[i];
    //     if(event.city == cityName || cityName == 'All'){
    //         eventsInCity.push(event);
    //     } 
    // }

    // Ternary Statement
    // let eventsInCity = cityName == 'All' ? allEvents : allEvents.filter(e => e.city == cityName);

    if(cityName == 'All'){
        eventsInCity = allEvents;
    } else {
        eventsInCity = allEvents.filter(event => event.city == cityName || cityName == 'All' );
    }
    
    // call displayStats with the events for the city
    displayStats(eventsInCity);
    // call displayEvents with the events for the city
    displayEvents(eventsInCity);



}















// reference code

// function sumAttendance(events) {
//     let sum = 0;
//     for (let i = 0; i < events.length; i++) {
//         let event = events[i];

//         sum += event.attendance;
//     }
//     return sum;

// }

// function avgAttendance(events){
//     // calculate the average attendance and return it
//     let sum = 0;
    
//     // get the sum of attendance (without calling sumAttendance())
//     for (let i = 0; i < events.length; i++) {
//         let event = events[i];

//         sum += event.attendance;
//     }
//     // divide sum against the number of event attendance data
//     let avg = sum / events.length;
//     // return the avg
//     return avg;
// }

// function maxAttendance(events) {
//     // largest number should be the first in the array
//     let max = events[0].attendance;
//     // current number
//     let number = 0;
//     for (let i = 0; i < events.length; i++) {
//         // updated current number of the iteration
//         number = events[i].attendance;
//         // compares the max number with the current number and stores the larger of the two
//         max = Math.max(max, number);    
//     }
//     // returned max value
//     return max;
// }

// function minAttendance(events){
//     let min = events[0].attendance;
//     let number = 0;
//     for (let i = 0; i < events.length; i++) {
//         // updates the cuurent number
//         number = events[i].attendance;
//         // compares the max number with the current number and stores the larger of the two
//         min = Math.min(min, number);
//     }
//     // returned min value
//     return min;
// }
