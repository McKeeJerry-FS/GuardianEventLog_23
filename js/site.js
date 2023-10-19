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

}

function getEvents() {
    // TODO: get events from loval storage

    return events;
}
