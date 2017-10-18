var url = "https://restcountries.eu/rest/v2/all"

var addCountriesToList = function( countries ) {
  var ul = document.getElementById("countries");
  countries.forEach( function(country) {
    var li = document.createElement("li")
    li.innerText = country.name
    ul.appendChild(li)
  })
}

var makeRequest = function( url ) {
  var request = new XMLHttpRequest();
  request.open( "GET", url );
  request.addEventListener( "load", function() {
  countries = JSON.parse( this.responseText )
    // addCountriesToList( countries )
    render(countries)
  })
  request.send();
}

var contains = function (object, collection) {
    for (var i = 0; i < collection.length; i++) {
        if (collection[i] === object) {
            return true;
        }
    }
    return false;
}

var populateContinentDropdown = function(countries){
  var continents = []
  for (var country of countries){
    if (contains(country.region, continents) === false){
      continents.push(country.region)
    }
  }
  var continentDropdown = document.getElementById('select-continent');
  for (var continent of continents){
    var continentOption = document.createElement('option');
    continentOption.textContent = continent;
    continentDropdown.appendChild(continentOption);
  }
}

var render = function(countries){
  populateContinentDropdown(countries)
  populateDropdown(countries);
  getStoredCountry(countries);
  var select = document.getElementById("select-country");
  select.addEventListener("change", function(){
    for(var country of countries){
      if(country.name === select.value){
        clearDisplay();
        displayCountryInfo(country, countries, "h1");
        displayNeighbours(country, countries);
        save(country);
      }
    }
  });
}

var getStoredCountry = function(countries){
  var countryString = localStorage.getItem("selectedCountry") || "{}";
  var country = JSON.parse(countryString);
  displayCountryInfo(country, countries, "h1");
  displayNeighbours(country, countries);
}

var populateDropdown = function(countries){
  var select = document.getElementById("select-country");

  for(var country of countries){
    var option = document.createElement("option");
    option.innerText = country.name;
    select.appendChild(option);
  }
}

var save = function(country){
  localStorage.setItem("selectedCountry", JSON.stringify(country));
}

var clearDisplay = function(){
  var display = document.getElementById("country-info");
  display.innerHTML = "";
}

var displayNeighbours = function(countryObject, countries){
  var neighbours = [];
  for(var neighbourCode of countryObject.borders){
    neighbours.push(neighbourCode);
  }
  for (var neighbour of neighbours){
    for (var country of countries){
      if (neighbour === country.alpha3Code){
      console.log(neighbour);
      displayCountryInfo(country, countries, "h3");
      }
    }
  }
  console.log(neighbours);
}

var displayCountryInfo = function(countryObject, countries, hsize){
    var countryDiv = document.getElementById("country-info");
    // clearDisplay();
    for(var country of countries){
      if(country.name === countryObject.name){
        var h1 = document.createElement(hsize);
        h1.innerText = country.name;
        countryDiv.appendChild(h1);
        var populationP = document.createElement("p");
        populationP.innerText = "Population: " + country.population;
        countryDiv.appendChild(populationP);
        var capitalP = document.createElement("p");
        capitalP.innerText = "Capital city: " + country.capital;
        countryDiv.appendChild(capitalP);
        console.log(country.borders);
        console.log(country.alpha3Code);
        // displayNeighbours(country, countries);
      }
    }


}

var initialize = function(){
  makeRequest(url);
}

window.addEventListener("load", initialize);
