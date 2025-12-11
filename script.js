/* LOADER FADE OUT */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("fade-out");
  }, 1500);
});

const cityToIATA = {
  "MANILA": "MNL",
  "CEBU": "CEB",
  "DAVAO": "DVO",
  "BORACAY": "MPH",
  "ILOILO": "ILO"
};

async function searchFlights() {
  console.log("Search button clicked"); // Debug
  let from = document.getElementById("from").value.trim().toUpperCase();
  let to = document.getElementById("to").value.trim().toUpperCase();

  if (!from || !to) {
    alert("Please enter both From and To airports.");
    return;
  }

  from = cityToIATA[from] || from;
  to = cityToIATA[to] || to;

  document.getElementById("results").innerHTML = `<p class="text-gray-500 mt-4">Searching flights...</p>`;

  try {
    const response = await fetch(`search_flights.php?from=${from}&to=${to}`);
    const flights = await response.json();

    if (flights.error) {
      document.getElementById("results").innerHTML = `<p class="text-red-500 mt-4">${flights.error}</p>`;
      return;
    }

    if (!flights || flights.length === 0) {
      document.getElementById("results").innerHTML = `<p class="text-gray-500 mt-4">No flights found for this route at the moment.</p>`;
      return;
    }

    const html = flights.map(flight => `
      <div class="bg-white p-6 shadow-md rounded-xl border result-card mt-4">
        <h3 class="text-xl font-bold text-blue-900">${flight.airline} - ${flight.flightNumber}</h3>
        <p class="text-gray-600">From: ${flight.from} → To: ${flight.to}</p>
        <p class="text-gray-600">Departure: ${flight.departure ? new Date(flight.departure).toLocaleTimeString() : 'N/A'}</p>
        <p class="text-gray-600">Arrival: ${flight.arrival ? new Date(flight.arrival).toLocaleTimeString() : 'N/A'}</p>
        <button class="pal-btn text-white mt-3 w-full py-2 rounded-lg font-semibold" onclick="bookFlight('${flight.flightNumber}')">Book Now</button>
      </div>
    `).join("");

    document.getElementById("results").innerHTML = html;

  } catch (error) {
    console.error(error);
    document.getElementById("results").innerHTML = `<p class="text-red-500 mt-4">Error fetching flights. Please try again.</p>`;
  }
}

//<--- UNSPLASH SLIDESHOW -->//
/* --------------------------
   EXPLORE DESTINATIONS SEARCH
--------------------------- */

const UNSPLASH_KEY = "YiRlBBaa5gPWVr4bKuGeup-vNALhOUfuW-ykT3I3tUs";

const slides = document.querySelectorAll("#destinations .slide-image");

function startSlideshow(slides, slideshow) {
  let index = 0;
  let isVisible = true;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
    });
  }, { threshold: 0.3 });

  observer.observe(slideshow);

  // Clear any previous interval
  if (slideshow.slideshowInterval) clearInterval(slideshow.slideshowInterval);

  slideshow.slideshowInterval = setInterval(() => {
    if (!isVisible) return;
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 3000);
}

// Load Country SLideshow
async function loadCountrySlideshow(countryName) {
  const query = countryName || "Japan"; // default to Japan
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&per_page=${slides.length}&client_id=${UNSPLASH_KEY}`
  );
  const data = await response.json();

  // Update caption
  const caption = document.getElementById("slide-caption");
  if (caption) caption.innerText = query; // <-- This updates the country name

  data.results.forEach((img, i) => {
    slides[i].src = img.urls.regular;
    slides[i].classList.remove("active");
    slides[i].onload = () => {
      if (i === 0) slides[0].classList.add("active");
    };
  });

  startSlideshow(slides, document.querySelector("#destinations .slideshow"));
}


// Handle search button
document.getElementById("search-destination-btn").addEventListener("click", () => {
  const country = document.getElementById("destination-search").value.trim();
  if (!country) return alert("Please enter a country name");
  loadCountrySlideshow(country);
});

// Initial load
loadCountrySlideshow("Japan");

