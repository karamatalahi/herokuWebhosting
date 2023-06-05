const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name')

const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelector('.middle_layer');

const getInfo= async(event)=>{
  event.preventDefault();
  let cityVal = cityName.value;
  if(cityVal===""){
    city_name.innerText = "Please write the name of city before search"
    datahide.classList.add('data_hide')
  }
  else{
    try{

      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=c05c14bee4d1674ddebf5c65cf670931`;

      const response = await fetch(url);
      const data = await response.json();
      const arrData = [data]

      city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
      temp.innerText = (data.main.temp - 273.15).toFixed(1) + "°C";

      const tempMood = data.weather[0].main;
      if(tempMood == 'Clear'){
        temp_status.innerHTML = "<i class='fas fa-sun' style= 'color: #FFFF00'></i>"
      }
     else if(tempMood == 'Cloud'){
        temp_status.innerHTML = "<i class='fas fa-cloud' style= 'color: #f1f2f6'></i>"
      }
     else if(tempMood == 'Rain'){
        temp_status.innerHTML = "<i class='fas fa-rain' style= 'color: #a4b0be'></i>"
      }
     else {
      temp_status.innerHTML = "<i class='fas fa-sun' style= 'color: #FFFF00'></i>"
      }
      datahide.classList.remove('data_hide')
    }
    catch{
      city_name.innerText = `Please Enter the city name properly`
      datahide.classList.add('data_hide')
    }
  }
}

submitBtn.addEventListener('click',getInfo)
