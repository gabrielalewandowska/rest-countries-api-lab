var url = "https://restcountries.eu/rest/v2/all"
// var countries;

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

var render = function(countries){
  console.log(countries)
  populateDropdown(countries);
  getStoredCountry(countries);
  var select = document.getElementById("select");
  select.addEventListener("change", function(){
    for(var country of countries){
      if(country.name === select.value){
        displayCountryInfo(country, countries);
        save(country);
      }
    }
  });
}

var getStoredCountry = function(countries){
  var countryString = localStorage.getItem("selectedCountry") || "{}";
  var country = JSON.parse(countryString);
  displayCountryInfo(country, countries);
}

var populateDropdown = function(countries){
  var select = document.getElementById("select");

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


var displayCountryInfo = function(countryObject, countries){
    var countryDiv = document.getElementById("country-info");
    clearDisplay();
    for(var country of countries){
      if(country.name === countryObject.name){
        var h1 = document.createElement("h1");
        h1.innerText = country.name;
        countryDiv.appendChild(h1);
        var populationP = document.createElement("p");
        populationP.innerText = "Population: " + country.population;
        countryDiv.appendChild(populationP);
        var capitalP = document.createElement("p");
        capitalP.innerText = "Capital city: " + country.capital;
        countryDiv.appendChild(capitalP);
      }
    }


}

var initialize = function(){
  makeRequest(url);
}

window.addEventListener("load", initialize);
