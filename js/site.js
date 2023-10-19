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
}

function getEvents() {
    // TODO: get events from loval storage

    return events;
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
        eventAttendance.innerText = event.attendance;
        eventRow.appendChild(eventAttendance)
        
        let eventDate = document.createElement('td');
        eventDate.innerText = event.date;
        eventRow.appendChild(eventDate)
        
        //      - append the row to the <tbody>
        eventsTable.appendChild(eventRow);
        
    }

}

function sumAttendance(events) {
    let sum = 0;
    for (let i = 0; i < events.length; i++) {
        let event = events[i];

        sum += event.attendance;
    }
    return sum;

}

function avgAttendance(events){
    // TODO: calculate the average attendance and return it
    let sum = 0;
    let avg = 0;
    // get the sum of attendance
    for (let i = 0; i < events.length; i++) {
        let event = events[i];

        sum += event.attendance;
    }
    // divide sum against the number of event attendance data
    avg = sum / events.length;
    // return the avg
    return avg;
}

function displayStats(events) {
    // calculating total attendance and display
    let total = sumAttendance(events);
    document.getElementById('totalAttendance').innerText = total.toLocaleString();
    // calculating avg attendance and display
    let avg = avgAttendance(events);
    document.getElementById('avgAttendance').innerText = Math.round(avg).toLocaleString();
    // calculating max attendance and display
    // calculating min attendance and display

    

}
