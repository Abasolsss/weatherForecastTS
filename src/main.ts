// country api
// https://documenter.getpostman.com/view/1134062/T1LJjU52
const newWeather: HTMLButtonElement | null =
  document.querySelector(".newWeather");

const selectCountry: HTMLElement | null =
  document.getElementById("selectCountry");

const loadingDiv: HTMLDivElement | null =
  document.querySelector(".loadingDivHide");

const inputText = document.getElementById("inputText") as HTMLInputElement;

interface weatherObject {
  mess: string;
  resp: {
    base: string;
    clouds: {
      all: number;
    }
    cod: number;
    message: string;
    coord: {
      lat: number,
      lon: number
    }
    dt: number,
    id: number,
    main: {
      feels_like: number,
      grnd_level: number,
      humidity: number,
      pressure: number,
      sea_level: number,
      temp: number,
      temp_max: number,
      temp_min: number
    }
    name: string;
    sys: {
      country: string,
      sunrise: number,
      sunset: number
    }
    timezone: number;
    visibility: number;
    weather: [
      {
        description: string,
        icon: string,
        main: string
      }
    ]
    wind: {
      deg: number,
      gust: number,
      speed: number
    } 
  };
error: string
}

interface countryCityName {
  data: any;
}

//Show modal
const modalBtn: HTMLButtonElement | null =
  document.querySelector(".checkWeatherModal");

const modalClose: HTMLDivElement | null = document.querySelector(".modalClose");
const modalDiv: HTMLDivElement | null = document.querySelector(".modalHide");




modalBtn?.addEventListener("click", () => {
  modalDiv?.classList.remove("modalHide");
  modalDiv?.classList.add("modalShow");
});

modalClose?.addEventListener("click", () => {
  modalDiv?.classList.remove("modalShow");
  modalDiv?.classList.add("modalHide");
});

async function cityFunction(): Promise<countryCityName> {
  try {
    const weatherLink: string = `https://countriesnow.space/api/v0.1/countries`;

    const countryCityFetch = fetch(weatherLink);
    const countryResp = await countryCityFetch;
    const data = await countryResp.json();
    return {
      data: data,
    };
  } catch {
    return {
      data: "Data not found",
    };
  }
}

async function weatherFunction(
  city: string,
  country: string
): Promise<weatherObject> {
  try {
    const callBack = await cityFunction();
    const data = callBack.data;

    let optionArray: HTMLOptionElement[] = [];

    if (selectCountry) {
      for (let i = 0; i < data.data.length; i++) {
        const countryName: string = data.data[i].country;
        const countryISO: string = data.data[i].iso2;
        const optionSelect = document.createElement("option");
        optionSelect.setAttribute("value", countryISO);
        optionSelect.textContent = countryName;
        optionArray.push(optionSelect);
      }

      optionArray.forEach((el) => {
        selectCountry.appendChild(el);
      });
    }

    if (selectCountry instanceof HTMLSelectElement) {
      selectCountry.addEventListener("change", () => {
        newWeather?.classList.add("checkWeatherBtn");
        newWeather?.classList.remove("newWeather");
        if (newWeather) {
          newWeather.disabled = false;
        }
        inputText.disabled = false;
        inputText.setAttribute("placeholder", "Enter City");
      });
    }

    const APIKEY: string = "60f06bb755213c4c8e5887d8f7b59046";

    const WeatherLink: string = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIKEY}`;

    // console.log(WeatherLink);
    const test = fetch(WeatherLink);
    const result = await test;
    const results = await result.json();
    return {
      mess: "Success Result",
      resp: results,
      error: "No Error"
    };
  } catch {
    return {
      mess: "Failed Result",
  resp: {
    base: "",
    clouds: {
      all: 0,
    },
    cod: 0,
    message: "",
    coord: {
      lat: 0,
      lon: 0
    },
    dt: 0,
    id: 0,
    main: {
      feels_like: 0,
      grnd_level: 0,
      humidity: 0,
      pressure: 0,
      sea_level: 0,
      temp: 0,
      temp_max: 0,
      temp_min: 0
    },
    name: "",
    sys: {
      country: "",
      sunrise: 0,
      sunset: 0
    },
    timezone: 0,
    visibility: 0,
    weather: [
      {
        description: "",
        icon: "",
        main: ""
      }
    ],
    wind: {
      deg: 0,
      gust: 0,
      speed: 0
    },
  },
error: ""
    }
  }
}

// to run the async function
weatherFunction();

const loadingMessage: string[] = [
  "Loading weather",
  "Please wait",
  "Almost Done",
];

const loadingEl: HTMLElement | null = document.querySelector(".loadingMessage");

const checkWeatherBtn: HTMLElement | null =
  document.getElementById("showWeather");

const showResultId: HTMLElement | null = document.getElementById("resultId");

if (checkWeatherBtn instanceof HTMLButtonElement) {
  const newBtn = checkWeatherBtn;
  newBtn.addEventListener("click", async () => {
    const test: string = inputText.value;
    loadingDiv?.classList.remove("loadingDivHide");
    loadingDiv?.classList.add("loadingDiv");
    modalDiv?.classList.remove("modalShow");
    modalDiv?.classList.add("modalHide");

    let init: number = 0;

    const resultFunc = () => {
      if (init !== loadingMessage.length) {
        if (loadingEl) {
          loadingEl.textContent = loadingMessage[init++];
        }
      } else {
        loadingDiv?.classList.remove("loadingDiv");
        loadingDiv?.classList.add("loadingDivHide");
      }
      return init;
    };

    const myInterval = setInterval(resultFunc, 1500);

    const dataVal: weatherObject[] = [];

    setTimeout(() => {
      if (myInterval > 0) {
        const dataValue: weatherObject = dataVal[0]
        
        let cod: number = dataValue.resp.cod
        let codString: string = cod.toLocaleString() 
        console.log(codString)
        // const codTest = codString === "404" ? true : false
        clearInterval(myInterval);
        showResultId?.classList.remove("hideResult");
        showResultId?.classList.add("showResult");
        if(codString === "404") {
        const errorMessage: string = dataValue.resp.message
          if(showResultId) {
            if (showResultId) {
              showResultId.innerHTML = `
           <div class="resultHandler">

               <div class="resultHeader">
                    <div class="placeName">
                       <h1 class="locationName">${cod} ${errorMessage}</h1>
                  </div>
                <div class="resultClose">
                      <span></span>
                      <span></span>
                </div>
                </div>
            </div>
            `;
            }
          }
        } else {
          const humidity: number = dataValue.resp.main.humidity
          const wKMH: number = dataValue.resp.wind.speed
          const description: string = dataValue.resp.weather[0].description
          const cityName: string = dataValue.resp.name
          const countryISO: string = dataValue.resp.sys.country
          if (showResultId) {
            showResultId.innerHTML = `
               <div class="resultHandler">
                <div class="resultHeader">
                    <div class="placeName">
                      <h1 class="locationName">${countryISO},${cityName}</h1>
                  </div>
                <div class="resultClose">
                      <span></span>
                      <span></span>
                </div>
                </div>
              <div class="resultsDiv">
                  <div class="weatherDetails">
                      <div class="weatherLogo">
                          <img src="" alt="" srcset="">
                          <h1>Images</h1>
                      </div>
                      <div class="weatherCelcius">
                   
                      </div>
                      <div class="weatherWindDetails">
                          <h5>Humidity: ${humidity}</h5>
                          <h5>Wind: ${wKMH}</h5>
                      </div>
                  </div>
                  <div class="weatherSecDetails">
                    <h1>Weather</h1>
                    <h1>Friday: 4:00 PM</h1>
                    <h1>${description}</h1>
                </div>
              </div>
            </div>
          `;
          }
          const resultClose: HTMLDivElement | null = document.querySelector(".resultClose")

          resultClose?.addEventListener("click",() => {
            showResultId?.classList.remove("showResult")
            showResultId?.classList.add("hideResult")
          })
        }
      } else {
        console.error("Failed to clear the interval");
      }
    }, 6000);

    if (selectCountry instanceof HTMLSelectElement) {
      const selectCountryISO: HTMLSelectElement = selectCountry;
      const selectCountryISOVal: string = selectCountryISO.value;
      const tests = await weatherFunction(test, selectCountryISOVal);
      dataVal.push(tests);
    } else {
      console.log(false);
    }
  });
} else {
  console.log("This is not button", false);
}
