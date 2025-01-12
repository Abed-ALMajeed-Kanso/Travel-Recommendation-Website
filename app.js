document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const resultsContainer = document.getElementById("results");

    const data = {
        "countries": [
            {
                "name": "Japan",
                "description": "A country known for its cherry blossoms and advanced technology.",
                "imageUrl": "https://pixabay.com/photos/sun-rays-forest-koyasan-temple-fog-7387131/",
                "cities": [
                    { "name": "Tokyo", "description": "The bustling capital of Japan.", "imageUrl": "https://pixabay.com/photos/sun-rays-forest-koyasan-temple-fog-7387131/" },
                    { "name": "Kyoto", "description": "Famous for its classical Buddhist temples.", "imageUrl": "https://pixabay.com/photos/sun-rays-forest-koyasan-temple-fog-7387131/" }
                ]
            }
        ],
        "temples": [
            { "name": "Angkor Wat", "description": "A temple complex in Cambodia.", "imageUrl": "https://example.com/angkorwat.jpg" }
        ],
        "beaches": [
            { "name": "Bondi Beach", "description": "A popular beach in Sydney, Australia.", "imageUrl": "https://example.com/bondi.jpg" }
        ]
    };

    const searchRecommendations = (keyword) => {
        // Clear previous results
        resultsContainer.innerHTML = "";

        const lowerCaseKeyword = keyword.toLowerCase();
        let resultsFound = false;

        const displayResults = (place) => {
            const resultItem = document.createElement("div");
            resultItem.classList.add("result-item");

            const placeName = document.createElement("h3");
            placeName.textContent = place.name;

            const placeDescription = document.createElement("p");
            placeDescription.textContent = place.description;

            const placeImage = document.createElement("img");
            placeImage.src = place.imageUrl;
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
    };

    // Search button event listener
    document.querySelector("input[type='button']").addEventListener("click", () => {
        const keyword = searchInput.value;
        if (keyword) {
            searchRecommendations(keyword);
        }
    });

    // Reset button event listener
    document.querySelector("input[type='reset']").addEventListener("click", () => {
        searchInput.value = "";
        resultsContainer.innerHTML = "";
    });
});

