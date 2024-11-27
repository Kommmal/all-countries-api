const countryName = new URLSearchParams(window.location.search).get("name");
const main = document.querySelector("main");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((country) => {
      const cardContainer = document.createElement("div");
      cardContainer.classList.add("country-container");
      cardContainer.innerHTML = `
        <img src="${country.flags.svg}" alt="" />
        <div class="b_div">
        <div class="headings">
        <div class="top-heading">
        <h1>${country.name.common}</h1>
            <p><b>Navtive Name:</b> ${Object.values(country.name.nativeName)[0].common}</p>
            <p><b>Population:</b> ${country.population}</p>
            <p><b>Region:</b> ${country.region}</p>
            <p><b>Sub Region:</b> ${country.subregion}</p>
            <p><b>Capital:</b> ${country.capital?.[0]}</p> 
          </div>
          <div class="bottom-heading">
             <p><b>Top level Domain:</b> ${country.tld.join(' ,')}</p>
             <p><b>Currencies:</b> ${Object.values(country.currencies).map((currency) => currency.name).join(' ,')}</p>
            <p><b>Languages:</b> ${Object.values(country.languages).join(', ')}</p>
          </div>
     </div>
     <div class="footer-countries">
         <h6>Border Countries:</h6>
     </div>
    </div>
          `;
          
      main.append(cardContainer);
      if (country.borders){
        country.borders.forEach((border)=>{
          fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then((borderCountry) => {
              const bCountryContainer = document.querySelector('.footer-countries')
              const btn = document.createElement('button');
              const aTag = document.createElement('a');
              btn.classList.add('border-countryBtn')
              aTag.classList.add('aBCountry');
              if(borderCountry[0].name.common){
                aTag.innerHTML = borderCountry[0].name.common
                aTag.href= `country.html?name=${borderCountry[0].name.common}`
              }else{
                aTag.innerHTML = ` `
              }
              bCountryContainer.append(btn);
              btn.append(aTag)
            });
        });
      }
    });
  });
