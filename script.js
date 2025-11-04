const countryList = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BDT: "BD",
  BGN: "BG",
  BHD: "BH",
  BMD: "BM",
  BRL: "BR",
  CAD: "CA",
  CHF: "CH",
  CNY: "CN",
  DKK: "DK",
  EGP: "EG",
  EUR: "EU",
  GBP: "GB",
  HKD: "HK",
  IDR: "ID",
  INR: "IN",
  JPY: "JP",
  KRW: "KR",
  KWD: "KW",
  MYR: "MY",
  NOK: "NO",
  NZD: "NZ",
  PKR: "PK",
  QAR: "QA",
  RUB: "RU",
  SAR: "SA",
  SGD: "SG",
  THB: "TH",
  TRY: "TR",
  USD: "US",
  ZAR: "ZA",
};

// ? API link
const BASE_URL = "https://api.exchangerate-api.com/v4/latest";

// Wait until page loads
window.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll("#from-currency, #to-currency");
  const btn = document.querySelector("#convert-btn");
  const result = document.querySelector("#result");

  // Fill dropdowns
  for (let select of dropdowns) {
    for (let currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.value = currCode;
      newOption.textContent = currCode;

      if (select.id === "from-currency" && currCode === "USD") {
        newOption.selected = true;
      } else if (select.id === "to-currency" && currCode === "INR") {
        newOption.selected = true;
      }
      select.appendChild(newOption);
    }

    // Flag update on change
    select.addEventListener("change", (event) => {
      updateFlag(event.target);
    });

    // Initialize flag
    updateFlag(select);
  }

  // ? Button click
  btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    let fromCurr = document.querySelector("#from-currency").value;
    let toCurr = document.querySelector("#to-currency").value;

    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }

    // Fetch exchange rate
    const URL = `${BASE_URL}/${fromCurr}`;
    try {
      let response = await fetch(URL);
      let data = await response.json();
      let rate = data.rates[toCurr];
      let finalAmount = (amtVal * rate).toFixed(2);

      result.innerHTML = `${amtVal} ${fromCurr} = <b>${finalAmount} ${toCurr}</b>`;
    } catch (error) {
      result.innerHTML = "Error fetching exchange rate!";
      console.error(error);
    }
  });
});

// ? Function to update flags
function updateFlag(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}
