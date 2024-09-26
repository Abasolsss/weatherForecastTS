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
  resp: string;
  mess: string;
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
      resp: results,
      mess: "Success Result",
    };
  } catch {
    return {
      resp: "Failed",
      mess: "Failed Result",
    };
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

    interface returnVal {
      mess: string;
      resp: {
        base: string;
      };
    }

    const dataVal: returnVal[] = [];

    setTimeout(() => {
      if (myInterval > 0) {
        console.log(dataVal[0].mess);
        console.log(dataVal[0].resp.base);
        clearInterval(myInterval);
        showResultId?.classList.remove("hideResult");
        showResultId?.classList.add("showResult");
        if (showResultId) {
          showResultId.innerHTML = `
         <div class="resultHandler">
                <div class="resultFirstDiv">
                  <span>Results for: Location Here</span>
                  <span>Weather Logo</span>
                </div>
                
                <div class="resultSecondDiv">
                  <span>Weather</span>
                  <span>Day Time:</span>
                  <span>Weather status</span>
                </div>
              </div>
        `;
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
