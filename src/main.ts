// country api
// https://documenter.getpostman.com/view/1134062/T1LJjU52

const APIKEY: string = "60f06bb755213c4c8e5887d8f7b59046";

// const weatherLink: string = `https://api.openweathermap.org/data/2.5/weather?q=cebu&appid=${APIKEY}`;

const weatherLink: string = `https://countriesnow.space/api/v0.1/countries`;


interface weatherObject {
  test: string;
  err: string;
}

interface countryCityName {
  country: string;
  city: string;
  selector: HTMLElement | null
}

async function weatherFunction(url: string): Promise<weatherObject> {
  try {
    const test = fetch(url);
    const result = await test;
    const results = await result.json();
    console.log(results);
    return {
      test: results.name,
      err: "error bitch",
    };
  } catch {
    return {
      test: "City is missing",
      err: "Sup bitch",
    };
  }
}

async function cityFunction(url: string): Promise<countryCityName> {
  try {
    const selectCountry: HTMLElement | null =
      document.getElementById("selectCountry");

    const countryCityFetch = fetch(url);
    const countryResp = await countryCityFetch;
    const data = await countryResp.json();
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

      if (selectCountry instanceof HTMLSelectElement) {
        const newWeather: HTMLButtonElement | null = document.querySelector(".newWeather")
        selectCountry.addEventListener("change", () => {
          const tests = selectCountry.value;
          console.log(tests);

          const inputText = document.getElementById(
            "inputText"
          ) as HTMLInputElement;

          inputText.disabled = false;
          inputText.setAttribute("placeholder", "Enter City")
          if(newWeather) {
            newWeather.disabled = false;
            newWeather.classList.remove("disabledBtn")
            newWeather.classList.add("checkWeatherBtn")

            newWeather.addEventListener("click", () => {
              console.log("Hello world")
            })
          }
        });
      }
    }
    return {
      country: "Test",
      city: "String",
      selector: selectCountry
    };
  } catch {
    return {
      country: "Test",
      city: "String",
      selector: null
    };
  }
}
cityFunction(weatherLink);


//Show modal
const modalBtn: HTMLButtonElement | null = document.querySelector(".checkWeatherModal")

const modalClose: HTMLDivElement | null = document.querySelector(".modalClose")
const modalDiv: HTMLDivElement | null = document.querySelector(".modalHide")

modalBtn?.addEventListener("click", () => {
    modalDiv?.classList.remove("modalHide")
    modalDiv?.classList.add("modalShow")
})

modalClose?.addEventListener("click",() => {
  modalDiv?.classList.remove("modalShow")
    modalDiv?.classList.add("modalHide")
})