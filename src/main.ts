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
        selectCountry.addEventListener("change", () => {
          const tests = selectCountry.value;
          console.log(tests);
        });
      }
    }

    return {
      country: "Test",
      city: "String",
    };
  } catch {
    return {
      country: "Test",
      city: "String",
    };
  }
}
cityFunction(weatherLink);

//inputs
