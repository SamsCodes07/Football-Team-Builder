// Example data: teams, logos, players
const teams = {
  "Monaco": {
    logo: "images/monaco.png",
    players: ["Paul Pogba", "Ben Yedder", "Golovin", "Caio Henrique"]
  },
  "PSG": {
    logo: "images/psg.png",
    players: ["Lionel Messi", "Kylian Mbappé", "Neymar Jr", "Achraf Hakimi"]
  },
  "Liverpool": {
    logo: "images/liverpool.png",
    players: ["Mohamed Salah", "Virgil van Dijk", "Alisson Becker", "Darwin Núñez"]
  }
  // Add more clubs as needed
};

let currentClub = null;
let selectedPositionElement = null;

// Initialize club dropdown
function initClubs() {
  const clubDropdown = document.getElementById("club-dropdown");
  Object.keys(teams).forEach(clubName => {
    const option = document.createElement("option");
    option.value = clubName;
    option.textContent = clubName;
    clubDropdown.appendChild(option);
  });
  // set default club
  currentClub = Object.keys(teams)[0];
  clubDropdown.value = currentClub;
  updateClubInfo();
  clubDropdown.addEventListener("change", (e) => {
    currentClub = e.target.value;
    updateClubInfo();
    clearAssignedPositions();
  });
}

// Update club name + logo
function updateClubInfo() {
  const logoEl = document.getElementById("club-logo");
  const nameEl = document.getElementById("club-name");
  logoEl.src = teams[currentClub].logo;
  nameEl.textContent = currentClub;
}

// Clear assigned positions when switching club
function clearAssignedPositions() {
  document.querySelectorAll(".position").forEach(pos => {
    pos.classList.remove("assigned");
    pos.innerHTML = "+";
  });
}

// Handle clicks on positions
function initPositions() {
  const positions = document.querySelectorAll(".position");
  positions.forEach(pos => {
    pos.addEventListener("click", () => {
      selectedPositionElement = pos;
      openPlayerModal();
    });
  });
}

// Open the player modal
function openPlayerModal() {
  const modal = document.getElementById("player-modal");
  const searchInput = document.getElementById("player-search");
  const dropdown = document.getElementById("player-dropdown");
  searchInput.value = "";
  dropdown.innerHTML = "";
  modal.classList.remove("hidden");
  searchInput.focus();
}

// Close modal
function initModalClose() {
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    document.getElementById("player-modal").classList.add("hidden");
  });
}

// Search players in the current club
function initPlayerSearch() {
  const searchInput = document.getElementById("player-search");
  const dropdown = document.getElementById("player-dropdown");

  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    dropdown.innerHTML = "";
    if (!term) return;
    const matches = teams[currentClub].players.filter(p => 
      p.toLowerCase().includes(term)
    );
    matches.forEach(player => {
      const li = document.createElement("li");
      li.textContent = player;
      li.addEventListener("click", () => {
        assignPlayerToPosition(player);
      });
      dropdown.appendChild(li);
    });
  });
}

// Assign the clicked player to the selected position on the pitch
function assignPlayerToPosition(playerName) {
  if (!selectedPositionElement) return;

  // mark assigned
  selectedPositionElement.classList.add("assigned");
  selectedPositionElement.innerHTML = `
    <img src="${teams[currentClub].logo}" alt="${currentClub} Logo">
    <span>${playerName}</span>
  `;
  // close modal
  document.getElementById("player-modal").classList.add("hidden");
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  initClubs();
  initPositions();
  initModalClose();
  initPlayerSearch();
});
