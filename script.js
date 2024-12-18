const countryContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector("#searchInput");
const btn = document.querySelector('.btn')
let allCountriesData;
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });
filterByRegion.addEventListener('change', (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries);
});
//It renders countries and prevent repeatation of code.
function renderCountries(data){
    countryContainer.innerHTML = " ";
    data.forEach((country)=>{
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `country.html?name=${country.name.common}`;
    countryCard.innerHTML = `
<img src="${country.flags.svg}" alt="flag">
<div class="card-text">
<h3 class="card-title">${country.name.common}</h3>
<p><b>Population: </b>${country.population.toLocaleString("en-US")}</p>
<p><b>Region: </b>${country.region}</p>
<p><b>Capatil: </b>${country.capital}</p>
</div>
`;
    countryContainer.append(countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  const filteredCountry = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value))
  renderCountries(filteredCountry)
});
btn.innerHTML = `<i class="fa-solid fa-moon"></i>&nbsp; Dark mode`;
btn.addEventListener('click',()=>{
  const isDarkMode = document.body.classList.toggle('dark')
  if(isDarkMode){
    btn.innerHTML = `<i class="fa-regular fa-moon"></i>&nbsp;  Light mode`;
  }else{
    btn.innerHTML = `<i class="fa-solid fa-moon"></i>&nbsp; Dark mode`;

  }
})

