async function main() {

  let container = document.querySelector(".places-area .container .filters-content .row");
  console.log(container)

  let namesData;
  let Url;

  class Places {
    constructor(name, state) {
      this.name = name;
      this.state = state;
    }
  }

  let place = [];

  navigator.geolocation.getCurrentPosition(showPosition);

  function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    console.log(lat);
    console.log(lon);

    const url = `https://api.geoapify.com/v2/places?categories=tourism.attraction&bias=proximity:${lon},${lat}&limit=10&apiKey=5b86f645f5a4454c934b8d912feb275b`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        namesData = data;
        if (namesData.features) {
          namesData.features.forEach((feature) => {
            if (feature.properties.name) {
              const name = feature.properties.name;
              const state = feature.properties.state;
              place.push(new Places(name, state));
            }
          });
        }
        console.log(place);

        let cluster="";
        place.forEach((place) => {
            cluster += ` 
                  <div class="single-portfolio col-sm-4 all corporate">
                    <div class="item">
                      <div class="p-inner">
                        <h4>
                            ${place.name}
                        </h4>
                        <div class="cat">${place.state}</div>
                      </div>
                    </div>
                  </div>
                `
        })
        console.log(cluster)
        container.innerHTML=cluster;       

      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
}

main();
