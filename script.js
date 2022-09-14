let time1 = document.querySelector(".time")
// console.log(time.innerHTML)
let date1 = document.querySelector(".date")



setInterval(function () {
    let Day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate()
    const day = time.getDay()
    const hour = time.getHours()
    const sec = time.getSeconds()

    const minute = time.getMinutes();
    const twelve_hour = hour >= 13 ? hour % 12 : hour
    // console.log(twelve_hour)
    const am_pm = hour >= 12 ? "PM" : "AM"
    // console.log(am_)
    time1.innerHTML = `${twelve_hour}:${minute}:${sec}<span>${am_pm}</span>`
    date1.innerHTML = Day[day]+","+" "+ date +" " + months[month] 

}, 1000)

  function geolocation(){

    navigator.geolocation.getCurrentPosition(success);
    function success(pos) {
    const crd = pos.coords;
    let lat = crd.latitude
    let lon = crd.longitude
    // console.log('Your current position is:');
    // console.log(`Latitude : ${crd.latitude}`);""
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=71e7c8d5670ada8c8a468121c5a3b752`
    fetch(url).then(response => response.json()).then(function (response){
        data = response
        console.log(data)
        displayWether(data)
    })
  }
  }
  geolocation()





  function displayWether(data) {
    let humidity = data.current.humidity
    let temperature = data.current.temp;
    let temp_max = data.current.temp +1;
    let wind = data.current.wind_speed
    let pressure = data.current.pressure
    let sunrise = data.current.sunrise
    let dt1 = new Date(sunrise*1000);
    let h1 = dt1.getHours();
    let m1 =  dt1.getMinutes();
    // let s1 = "0" + dt1.getSeconds();
    // let se1=hr1+ ':' + m1.substr(-2);
    // sunrise.innerText=`
    // Sunrise Time - ${se1}`
    let sunset = data.current.sunset
    let dt2 = new Date(sunset*1000);
    let h2 = dt2.getHours();
    let m2 = dt2.getMinutes();
    // let s2 = "0" + dt2.getSeconds();
    // let se2=(hr2-12)+ ':' + m2.substr(-2);





    let current_weather = document.querySelector(".current-weather")
    current_weather.innerHTML = `

  <div class="wether-item3">
    <div>humidity</div>
    <div>${humidity}</div>
  </div>
  <div class="wether-item4">
    <div>wind</div>
    <div>${wind}</div>
  </div>
  <div class="wether-item4">
    <div>Pressure</div>
    <div>${pressure}</div>
  </div>

  <div class="wether-item7">
    <div>sunset</div>
    <div>${h1}${":"}${m1}<span>AM</span></div>
  </div>
  <div class="wether-item7">
    <div>sunset</div>
    <div>${h2}${":"}${m2}<span>PM</span></div>
  </div>`
let TODAY = document.querySelector(".today")
  let otherDayForcast = ''
  data.daily.forEach((day, idx) => {
      if(idx == 0){
         TODAY.innerHTML = 
   
          ` <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
          <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
          <div class="temp">Night - ${day.temp.night}&#176;C</div>
          <div class="temp">Day - ${day.temp.day}&#176;C</div>`
      }else{
          otherDayForcast +=`<div class="wether-forecast-item">
          <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
          <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
          <div class="temp">Night - ${day.temp.night}&#176;C</div>
          <div class="temp">Day - ${day.temp.day}&#176;C</div>
        </div>`
 
      }
  })

  document.querySelector('#wether-forecast').innerHTML = otherDayForcast;


  }



  function getData() {
    let city = document.getElementById("query").value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=71e7c8d5670ada8c8a468121c5a3b752&units=metric`;

    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (res) {
        append(res);
      });
  }

  let url =
    "https://www.google.com/maps/place/Pune,+Maharashtra,+India/@18.521793,73.85877,13z/data=!4m5!3m4!1s0x3bc2bf2e67461101:0x828d43bf9d9ee343!8m2!3d18.5204303!4d73.8567437?hl=en-US";


    function append(data) {
        let url = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
        console.log(data);
        let container = document.querySelector(".container1");
        container.innerHTML = null;
        let h2 = document.createElement("h3");
        h2.innerText = data.name;
        let temp = document.createElement("p");
        temp.innerHTML = `${data.main.temp}&deg;C`;
    
    
        let clouds = document.createElement("p");
        let y = data.weather[0].description
        let z = data.main.temp
        clouds.innerText = data.weather[0].description;
        let body = document.querySelector("body")
        if(data.weather[0].description=="overcast clouds"){
            body.style.backgroundImage = "url(https://images.unsplash.com/photo-1469365556835-3da3db4c253b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGFydGx5JTIwY2xvdWR5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60)"
        }else if(y==="broken clouds"){
            body.style.backgroundImage = "url(https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=600)"
        }else if(y==="clear sky"){
            body.style.backgroundImage = "url(https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&w=600)"
        }else if(y=="few clouds"){
            body.style.backgroundImage = "url(https://images.pexels.com/photos/1119976/pexels-photo-1119976.jpeg?auto=compress&cs=tinysrgb&w=600)"
        }else if(y=="scattered clouds"){
            body.style.backgroundImage = "url(https://images.pexels.com/photos/356269/pexels-photo-356269.jpeg?auto=compress&cs=tinysrgb&w=600)"
        }else if(z<22){
            body.style.backgroundImage = "url(https://images.pexels.com/photos/60561/winter-snow-nature-60561.jpeg?auto=compress&cs=tinysrgb&w=600)"
        }
        container.append(h2, temp, clouds);
        let map = document.getElementById("gmap_canvas");
        map.src = url;
      }


