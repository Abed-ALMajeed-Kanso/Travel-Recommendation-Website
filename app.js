document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("results");

  const apiUrl = "travel_recommendation_api.json"; 

  // Function to fetch data and show results based on keyword
  const fetchRecommendations = async (keyword) => {
      try {
          const response = await fetch(apiUrl);
          const data = await response.json();

          // Clear previous results
          resultsContainer.innerHTML = "";

          const lowerCaseKeyword = keyword.toLowerCase();
          let resultsFound = false;

          // Function to display results
          const displayResults = (place) => {
              const resultItem = document.createElement("div");
              resultItem.classList.add("result-item");

              const placeName = document.createElement("h3");
              placeName.textContent = place.name;

              const placeDescription = document.createElement("p");
              placeDescription.textContent = place.description;

              const placeImage = document.createElement("img");
              placeImage.src = place.imageUrl; // The image URL from the JSON
              placeImage.alt = place.name;

              resultItem.appendChild(placeName);
              resultItem.appendChild(placeImage);
              resultItem.appendChild(placeDescription);
              resultsContainer.appendChild(resultItem);
          };

          // Search in countries, cities, temples, and beaches
          data.countries.forEach((country) => {
              if (country.name.toLowerCase().includes(lowerCaseKeyword)) {
                  resultsFound = true;
                  displayResults(country);
              }
              country.cities.forEach((city) => {
                  if (city.name.toLowerCase().includes(lowerCaseKeyword)) {
                      resultsFound = true;
                      displayResults(city);
                  }
              });
          });

          data.temples.forEach((temple) => {
              if (temple.name.toLowerCase().includes(lowerCaseKeyword)) {
                  resultsFound = true;
                  displayResults(temple);
              }
          });

          data.beaches.forEach((beach) => {
              if (beach.name.toLowerCase().includes(lowerCaseKeyword)) {
                  resultsFound = true;
                  displayResults(beach);
              }
          });

          if (!resultsFound) {
              resultsContainer.innerHTML = "<p>No recommendations found.</p>";
          }
      } catch (error) {
          console.error("Error fetching data:", error);
          resultsContainer.innerHTML = "An error occurred while fetching data.";
      }
  };

  // Search button event listener
  document.querySelector("input[type='button']").addEventListener("click", () => {
      const keyword = searchInput.value;
      if (keyword) {
          fetchRecommendations(keyword);
      }
  });

  // Reset button event listener
  document.querySelector("input[type='reset']").addEventListener("click", () => {
      searchInput.value = "";
      resultsContainer.innerHTML = "";
  });
});
