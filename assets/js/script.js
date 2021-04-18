var searchBtnEl = document.querySelector("#searchBtn");
var cityTextEl = document.querySelector("#cityName");
var historyBtnsList = document.querySelector(".collection");
var historyList = {};
var status = 0;


// get the longitude and latitude of location
var getWeatherCoords = function (location) {
    var latApiUrl = "https://api.openweathermap.org/data/2.5/find?q=" + location + "&appid=fc990c7ec21bc011a9e2bd3342b2bb55";

    fetch(latApiUrl).then(function (response) {
        // request was successful
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                var lat = data.list[0].coord.lat
                var lon = data.list[0.].coord.lon
                getCityWeather(lat, lon);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
        .catch(function (error) {
            alert("Unable to connect to OpenWeather");
        });
};
// function to get weather data for city that was entered
var getCityWeather = function (lat, lon) {

    var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=fc990c7ec21bc011a9e2bd3342b2bb55";
    fetch(weatherUrl).then(function (response) {
        // request was successful
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                currentDayInfo(data);
                fiveDayInfo(data);
                console.log(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
        .catch(function (error) {
            alert("Unable to connect to OpenWeather");
        })
};

// function to print weather information for the current weather box.
var currentDayInfo = function (city) {
    var currentCityEl = document.querySelector(".city-date");
    // print city name
    var cityHeader = cityTextEl.value.trim();
    cityHeader = cityHeader.charAt(0).toUpperCase() + cityHeader.slice(1);
    currentCityEl.textContent = cityHeader;

    // print city date
    var currentDate = (new Date(city.current.dt * 1000 + (city.timezone_offset * 1000)));
    var displayDate = document.createElement("span");
    displayDate.textContent = " (" + currentDate.toDateString() + ")";

    currentCityEl.appendChild(displayDate);

    // print weather icon
    iconCode = city.current.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";

    var currentDayIcon = document.createElement("img");
    currentDayIcon.setAttribute("src", iconUrl);
    currentDayIcon.setAttribute("alt", "Weather Icon")
    currentDayIcon.setAttribute("id", "current-weather-icon")

    currentCityEl.appendChild(currentDayIcon);

    // print current temp
    var currentTempEl = document.querySelector(".temperature-txt");
    currentTempEl.textContent = "Temp: " + city.current.temp + "\xB0 F";

    // prind current wind
    var currentWindEl = document.querySelector(".wind-txt");
    currentWindEl.textContent = "Wind: " + city.current.wind_speed + "MPH";

    // print current humidity
    var currentHumidEl = document.querySelector(".humidity-txt");
    currentHumidEl.textContent = "Humidity: " + city.current.humidity + "%";

    //  print current UV index
    var uvIndexNum = city.current.uvi;

    var currentUvEl = document.querySelector(".uv-text");
    currentUvEl.innerHTML = "UV Index: " + "<span id = 'uv-index'>" + uvIndexNum + "</span>";
    var uvColor = document.querySelector("#uv-index");

    if (uvIndexNum <= 2) {

        uvColor.setAttribute("style", "background-color: green;");
    } else if (uvIndexNum = 3 & uvIndexNum <= 7) {

        uvColor.setAttribute("style", "background-color: yellow;");
    } else if (uvIndexNum >= 8) {

        uvColor.setAttribute("style", "background-color: red;");
    }

    // clear out text input
    cityTextEl.value = "";
};

// function to print 5 day weather information
var fiveDayInfo = function (city) {
    // Day One
    // Day one date print
    var currentDayDateHeader = document.querySelector("#first-day-date");
    var currentDayDate = (new Date(city.daily[1].dt * 1000 + (city.timezone_offset * 1000)));
    currentDayDateHeader.textContent = currentDayDate.toDateString();

    // day one weather icon
    var iconContainer = document.querySelector("#first-icon-container");

    iconCode = city.daily[1].weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";

    var currentDayIcon = document.createElement("img");
    currentDayIcon.setAttribute("src", iconUrl);
    currentDayIcon.setAttribute("alt", "Weather Icon")
    currentDayIcon.setAttribute("id", "first-weather-icon")

    iconContainer.appendChild(currentDayIcon);

    // Day one temp print
    var currentDayTemp = document.querySelector("#first-day-temp");
    currentDayTemp.textContent = "Temp: " + city.daily[1].temp.day + "\xB0 F";

    // Day one wind print
    var currentDayWind = document.querySelector("#first-day-wind");
    currentDayWind.textContent = "Wind: " + city.daily[1].wind_speed + " MPH";

    // Day one humidity print
    var currentDayHumid = document.querySelector("#first-day-humid");
    currentDayHumid.textContent = "Humidity: " + city.daily[1].humidity + "%";

    // Day one end
    // Day Two
    // Day two date print
    var dayTwoDateHeader = document.querySelector("#second-day-date");
    var dayTwoDate = (new Date(city.daily[2].dt * 1000 + (city.timezone_offset * 1000)));
    dayTwoDateHeader.textContent = dayTwoDate.toDateString();

    // day two weather icon
    var iconContainer = document.querySelector("#second-icon-container");

    iconCode = city.daily[2].weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";

    var dayTwoIcon = document.createElement("img");
    dayTwoIcon.setAttribute("src", iconUrl);
    dayTwoIcon.setAttribute("alt", "Weather Icon")
    dayTwoIcon.setAttribute("id", "second-weather-icon")

    iconContainer.appendChild(dayTwoIcon);

    // Day two temp print
    var dayTwoTemp = document.querySelector("#second-day-temp");
    dayTwoTemp.textContent = "Temp: " + city.daily[2].temp.day + "\xB0 F";

    // Day two wind print
    var dayTwoWind = document.querySelector("#second-day-wind");
    dayTwoWind.textContent = "Wind: " + city.daily[2].wind_speed + " MPH";

    // Day two humidity print
    var dayTwoHumid = document.querySelector("#second-day-humid");
    dayTwoHumid.textContent = "Humidity: " + city.daily[2].humidity + "%";

    // Day two Three
    // Day Three
    // Day three date print
    var dayThreeDateHeader = document.querySelector("#third-day-date");
    var dayThreeDate = (new Date(city.daily[3].dt * 1000 + (city.timezone_offset * 1000)));
    dayThreeDateHeader.textContent = dayThreeDate.toDateString();

    // day three weather icon
    var iconContainer = document.querySelector("#third-icon-container");

    iconCode = city.daily[3].weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";

    var dayThreeIcon = document.createElement("img");
    dayThreeIcon.setAttribute("src", iconUrl);
    dayThreeIcon.setAttribute("alt", "Weather Icon")
    dayThreeIcon.setAttribute("id", "first-weather-icon")

    iconContainer.appendChild(dayThreeIcon);

    // Day three temp print
    var dayThreeTemp = document.querySelector("#third-day-temp");
    dayThreeTemp.textContent = "Temp: " + city.daily[3].temp.day + "\xB0 F";

    // Day three wind print
    var dayThreeWind = document.querySelector("#third-day-wind");
    dayThreeWind.textContent = "Wind: " + city.daily[3].wind_speed + " MPH";

    // Day three humidity print
    var dayThreeHumid = document.querySelector("#third-day-humid");
    dayThreeHumid.textContent = "Humidity: " + city.daily[3].humidity + "%";

    // Day ThreFour
    // Day Four
    // Day four date print
    var dayFourDateHeader = document.querySelector("#fourth-day-date");
    var dayFourDate = (new Date(city.daily[4].dt * 1000 + (city.timezone_offset * 1000)));
    dayFourDateHeader.textContent = dayFourDate.toDateString();

    // day four weather icon
    var iconContainer = document.querySelector("#fourth-icon-container");

    iconCode = city.daily[4].weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";

    var dayFourIcon = document.createElement("img");
    dayFourIcon.setAttribute("src", iconUrl);
    dayFourIcon.setAttribute("alt", "Weather Icon")
    dayFourIcon.setAttribute("id", "fourth-weather-icon")

    iconContainer.appendChild(dayFourIcon);

    // Day four temp print
    var dayFourTemp = document.querySelector("#fourth-day-temp");
    dayFourTemp.textContent = "Temp: " + city.daily[4].temp.day + "\xB0 F";

    // Day four wind print
    var dayFourWind = document.querySelector("#fourth-day-wind");
    dayFourWind.textContent = "Wind: " + city.daily[4].wind_speed + " MPH";

    // Day four humidity print
    var dayFourHumid = document.querySelector("#fourth-day-humid");
    dayFourHumid.textContent = "Humidity: " + city.daily[4].humidity + "%";

    // Day four end
    // Day five
    // Day five date print
    var dayFiveDateHeader = document.querySelector("#fifth-day-date");
    var dayFiveDate = (new Date(city.daily[5].dt * 1000 + (city.timezone_offset * 1000)));
    dayFiveDateHeader.textContent = dayFiveDate.toDateString();

    // day five weather icon
    var iconContainer = document.querySelector("#fifth-icon-container");

    iconCode = city.daily[5].weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";

    var dayFiveIcon = document.createElement("img");
    dayFiveIcon.setAttribute("src", iconUrl);
    dayFiveIcon.setAttribute("alt", "Weather Icon")
    dayFiveIcon.setAttribute("id", "fifth-weather-icon")

    iconContainer.appendChild(dayFiveIcon);

    // Day five temp print
    var dayFiveTemp = document.querySelector("#fifth-day-temp");
    dayFiveTemp.textContent = "Temp: " + city.daily[5].temp.day + "\xB0 F";

    // Day five wind print
    var dayFiveWind = document.querySelector("#fifth-day-wind");
    dayFiveWind.textContent = "Wind: " + city.daily[5].wind_speed + " MPH";

    // Day five humidity print
    var dayFiveHumid = document.querySelector("#fifth-day-humid");
    dayFiveHumid.textContent = "Humidity: " + city.daily[5].humidity + "%";

};

var saveHistory = function () {
    localStorage.setItem("history", JSON.stringify(historyList));
};

var loadHistory = function () {
    historyList = JSON.parse(localStorage.getItem("history"));
    
    if (!historyList) {
        tasks = {};
    }
    historyLength = Object.keys(historyList).length;
    console.log(history.length);
    for (var i = 0; i < historyLength; i++) {
        var historyContainer = document.createElement("li")
        historyContainer.classList = "collection-item grey center-align";

        var historyBtn = document.createElement("a");
        historyBtn.classList = "waves-effect waves-grey btn-flat";
        historyBtn.textContent = historyList[i];

        historyContainer.appendChild(historyBtn);

        historyBtnsList.appendChild(historyContainer);

    }

};

// function to create the search
var searchHistory = function (event) {
    // get the city name from the clicked history button
    var city = event.target.text;
    getWeatherCoords(city);
    cityTextEl.value = city;
};

// function for the button click
var buttonClickHandler = function (event) {
    event.preventDefault();
    var text = cityTextEl.value.trim();
    getWeatherCoords(text);

    // create search history list
    var historyContainer = document.createElement("li")
    historyContainer.classList = "collection-item grey center-align";

    var historyBtn = document.createElement("a");
    historyBtn.classList = "waves-effect waves-grey btn-flat";
    historyBtn.textContent = text;

    historyContainer.appendChild(historyBtn);

    historyBtnsList.appendChild(historyContainer);

    // save city name in array

    historyList[status] = text;


    saveHistory();
    status++;

};

loadHistory();

// event listeners
searchBtnEl.addEventListener("click", buttonClickHandler)
historyBtnsList.addEventListener("click", searchHistory);