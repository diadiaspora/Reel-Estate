const listings = [
  {
    id: 1,
    title: "Modern Architectural Estate",
    location: "The Heights",
    price: 6850000,
    beds: 5,
    baths: 6,
    sqft: 8200,
    type: "estate",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "Waterfront Residence with Private Dock",
    location: "Harbor Point",
    price: 9250000,
    beds: 6,
    baths: 7,
    sqft: 10400,
    type: "waterfront",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "Skyline Penthouse Residence",
    location: "Downtown",
    price: 4150000,
    beds: 3,
    baths: 4,
    sqft: 4300,
    type: "penthouse",
    image: "https://images.unsplash.com/photo-1493809842364-78817a6b2727?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 4,
    title: "Restored Historic Manor",
    location: "Old Town",
    price: 3275000,
    beds: 4,
    baths: 5,
    sqft: 6100,
    type: "historic",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 5,
    title: "Gated Estate on Championship Golf",
    location: "The Reserve",
    price: 11950000,
    beds: 6,
    baths: 8,
    sqft: 13600,
    type: "estate",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 6,
    title: "Coastal Modern Retreat",
    location: "Harbor Point",
    price: 5480000,
    beds: 4,
    baths: 5,
    sqft: 5900,
    type: "waterfront",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
  }
];

const listingGrid = document.getElementById("listingGrid");
const listingEmpty = document.getElementById("listingEmpty");
const listingFilters = document.getElementById("listingFilters");
const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");
const valuationForm = document.getElementById("valuationForm");
const valuationSuccess = document.getElementById("valuationSuccess");
const contactForm = document.getElementById("contactForm");
const contactSuccess = document.getElementById("contactSuccess");
const year = document.getElementById("year");

const formatPrice = value =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);

function createListingCard(listing) {
  const card = document.createElement("article");
  card.className = "listing-card";

  card.innerHTML = `
    <div class="listing-image" style="background-image:url('${listing.image}')"></div>
    <div class="listing-body">
      <p class="listing-price">${formatPrice(listing.price)}</p>
      <h3 class="listing-title">${listing.title}</h3>
      <p class="listing-location">${listing.location}</p>
      <div class="listing-meta">
        <span>${listing.beds} Beds</span>
        <span>${listing.baths} Baths</span>
        <span>${listing.sqft.toLocaleString()} Sq. Ft.</span>
      </div>
    </div>
  `;

  return card;
}

function renderListings(filters = {}) {
  const location = (filters.location || "").toLowerCase().trim();
  const type = filters.type || "all";
  const minPrice = Number(filters.minPrice || 0);
  const bedrooms = Number(filters.bedrooms || 0);

  const results = listings.filter(listing => {
    const matchesLocation =
      !location ||
      listing.location.toLowerCase().includes(location) ||
      listing.title.toLowerCase().includes(location);

    const matchesType = type === "all" || listing.type === type;
    const matchesPrice = listing.price >= minPrice;
    const matchesBeds = listing.beds >= bedrooms;

    return matchesLocation && matchesType && matchesPrice && matchesBeds;
  });

  listingGrid.innerHTML = "";

  if (!results.length) {
    listingEmpty.hidden = false;
    return;
  }

  listingEmpty.hidden = true;
  results.forEach(listing => listingGrid.appendChild(createListingCard(listing)));
}

listingFilters.addEventListener("submit", event => {
  event.preventDefault();

  renderListings({
    location: document.getElementById("searchLocation").value,
    type: document.getElementById("propertyType").value,
    minPrice: document.getElementById("minPrice").value,
    bedrooms: document.getElementById("bedrooms").value
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

menuToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

primaryNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    primaryNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

valuationForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!valuationForm.checkValidity()) {
    valuationForm.reportValidity();
    return;
  }

  valuationSuccess.hidden = false;
  valuationForm.reset();
});

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  contactSuccess.hidden = false;
  contactForm.reset();
});

year.textContent = new Date().getFullYear();
renderListings();
