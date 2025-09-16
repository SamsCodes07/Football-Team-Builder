// Game Data
const teams = {
    'Monaco': {
        logo: 'https://logos-world.net/wp-content/uploads/2020/06/AS-Monaco-Logo.png',
        players: {
            'GK': ['Alexander Nübel', 'Radosław Majecki', 'Yann Lienard'],
            'CB': ['Thilo Kehrer', 'Guillermo Maripán', 'Axel Disasi', 'Benoît Badiashile', 'Chrislain Matsima'],
            'CM': ['Aurélien Tchouaméni', 'Youssouf Fofana', 'Jean Lucas', 'Eliot Matazo', 'Soungoutou Magassa'],
            'CAM': ['Cesc Fàbregas', 'Aleksandr Golovin', 'Sofiane Diop', 'Maghnes Akliouche'],
            'LW': ['Kevin Volland', 'Myron Boadu', 'Wilson Isidor', 'Eliesse Ben Seghir'],
            'RW': ['Takumi Minamino', 'Gelson Martins', 'Ismail Jakobs', 'Krépin Diatta'],
            'ST': ['Wissam Ben Yedder', 'Breel Embolo', 'Pietro Pellegri', 'Folarin Balogun']
        }
    },
    'Manchester City': {
        logo: 'https://logos-world.net/wp-content/uploads/2020/06/Manchester-City-Logo.png',
        players: {
            'GK': ['Ederson', 'Stefan Ortega', 'Scott Carson'],
            'CB': ['Ruben Dias', 'John Stones', 'Nathan Aké', 'Manuel Akanji', 'Josko Gvardiol'],
            'CM': ['Rodri', 'Mateo Kovacic', 'Kalvin Phillips', 'Rico Lewis'],
            'CAM': ['Kevin De Bruyne', 'Bernardo Silva', 'Phil Foden', 'Matheus Nunes'],
            'LW': ['Jack Grealish', 'Jeremy Doku', 'Oscar Bobb'],
            'RW': ['Riyad Mahrez', 'Julian Alvarez', 'Cole Palmer'],
            'ST': ['Erling Haaland', 'Julian Alvarez']
        }
    },
    'Real Madrid': {
        logo: 'https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo.png',
        players: {
            'GK': ['Thibaut Courtois', 'Andriy Lunin', 'Kepa Arrizabalaga'],
            'CB': ['Antonio Rüdiger', 'Éder Militão', 'David Alaba', 'Nacho', 'Jesús Vallejo'],
            'CM': ['Luka Modrić', 'Toni Kroos', 'Federico Valverde', 'Eduardo Camavinga', 'Aurélien Tchouaméni'],
            'CAM': ['Jude Bellingham', 'Brahim Díaz', 'Arda Güler'],
            'LW': ['Vinícius Júnior', 'Eden Hazard', 'Fran García'],
            'RW': ['Rodrygo', 'Lucas Vázquez', 'Dani Carvajal'],
            'ST': ['Karim Benzema', 'Joselu', 'Kylian Mbappé']
        }
    },
    'Barcelona': {
        logo: 'https://logos-world.net/wp-content/uploads/2020/06/FC-Barcelona-Logo.png',
        players: {
            'GK': ['Marc-André ter Stegen', 'Iñaki Peña', 'Ander Astralaga'],
            'CB': ['Ronald Araújo', 'Jules Koundé', 'Andreas Christensen', 'Pau Cubarsí', 'Íñigo Martínez'],
            'CM': ['Pedri', 'Gavi', 'Frenkie de Jong', 'Ilkay Gündogan', 'Oriol Romeu'],
            'CAM': ['Fermín López', 'Pablo Torre', 'Marc Casadó'],
            'LW': ['Raphinha', 'Ansu Fati', 'Ferran Torres'],
            'RW': ['Lamine Yamal', 'Ousmane Dembélé', 'Ez Abde'],
            'ST': ['Robert Lewandowski', 'João Félix', 'Vitor Roque']
        }
    },
    'Liverpool': {
        logo: 'https://logos-world.net/wp-content/uploads/2020/06/Liverpool-FC-Logo.png',
        players: {
            'GK': ['Alisson', 'Caoimhín Kelleher', 'Adrián'],
            'CB': ['Virgil van Dijk', 'Ibrahima Konaté', 'Joe Gomez', 'Joel Matip', 'Jarrell Quansah'],
            'CM': ['Jordan Henderson', 'Fabinho', 'Thiago', 'Curtis Jones', 'Ryan Gravenberch'],
            'CAM': ['Dominik Szoboszlai', 'Harvey Elliott', 'Stefan Bajčetić'],
            'LW': ['Luis Díaz', 'Cody Gakpo', 'Darwin Núñez'],
            'RW': ['Mohamed Salah', 'Ben Doak', 'Kaide Gordon'],
            'ST': ['Darwin Núñez', 'Diogo Jota', 'Cody Gakpo']
        }
    }
};

// Game State
let currentTeam = 'Monaco';
let selectedPosition = null;
let chemistry = 0;
let placedPlayers = [];
let gameNumber = Math.floor(Math.random() * 1000) + 1;

// DOM Elements
const teamLogo = document.getElementById('team-logo');
const teamName = document.getElementById('team-name');
const modal = document.getElementById('player-modal');
const playerSearch = document.getElementById('player-search');
const suggestions = document.getElementById('suggestions');
const searchInstruction = document.getElementById('search-instruction');
const closeModal = document.querySelector('.close');
const positionBtns = document.querySelectorAll('.position-btn');

// Initialize Game
function initGame() {
    // Set random team
    const teamKeys = Object.keys(teams);
    currentTeam = teamKeys[Math.floor(Math.random() * teamKeys.length)];
    
    // Update UI
    teamLogo.src = teams[currentTeam].logo;
    teamName.textContent = currentTeam.toUpperCase();
    
    // Update game number
    document.querySelector('.game-stats span').textContent = `GAME: #${gameNumber}`;
    
    // Add event listeners
    setupEventListeners();
}

function setupEventListeners() {
    // Position button clicks
    positionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const position = e.target.closest('.position');
            selectedPosition = position.dataset.position;
            
            // Check if position is already filled
            if (btn.classList.contains('filled')) {
                return;
            }
            
            openPlayerModal();
        });
    });
    
    // Modal events
    closeModal.addEventListener('click', closePlayerModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePlayerModal();
        }
    });
    
    // Search input
    playerSearch.addEventListener('input', handleSearchInput);
    playerSearch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const firstSuggestion = suggestions.querySelector('.suggestion-item');
            if (firstSuggestion) {
                selectPlayer(firstSuggestion.dataset.player);
            }
        }
    });
    
    // Suggestion clicks
    suggestions.addEventListener('click', (e) => {
        const suggestionItem = e.target.closest('.suggestion-item');
        if (suggestionItem) {
            selectPlayer(suggestionItem.dataset.player);
        }
    });
}

function openPlayerModal() {
    modal.classList.remove('hidden');
    searchInstruction.textContent = `Find player in the selected position (${selectedPosition}) from ${currentTeam}`;
    playerSearch.value = '';
    playerSearch.focus();
    suggestions.classList.add('hidden');
}

function closePlayerModal() {
    modal.classList.add('hidden');
    selectedPosition = null;
    playerSearch.value = '';
    suggestions.classList.add('hidden');
}

function handleSearchInput(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length === 0) {
        suggestions.classList.add('hidden');
        return;
    }
    
    const validPlayers = teams[currentTeam].players[selectedPosition] || [];
    const filteredPlayers = validPlayers.filter(player => 
        player.toLowerCase().includes(query) && 
        !placedPlayers.includes(player)
    );
    
    displaySuggestions(filteredPlayers);
}

function displaySuggestions(players) {
    suggestions.innerHTML = '';
    
    if (players.length === 0) {
        suggestions.classList.add('hidden');
        return;
    }
    
    players.forEach(player => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.dataset.player = player;
        item.innerHTML = `
            <span>${player}</span>
            <span class="player-position">${selectedPosition}</span>
        `;
        suggestions.appendChild(item);
    });
    
    suggestions.classList.remove('hidden');
}

function selectPlayer(playerName) {
    const validPlayers = teams[currentTeam].players[selectedPosition] || [];
    
    if (!validPlayers.includes(playerName)) {
        alert('This player is not in the current team or position!');
        return;
    }
    
    if (placedPlayers.includes(playerName)) {
        alert('This player has already been selected!');
        return;
    }
    
    // Place player on field
    const positionElement = document.querySelector(`[data-position="${selectedPosition}"]`);
    const btn = positionElement.querySelector('.position-btn');
    const playerInfo = positionElement.querySelector('.player-info');
    const playerNameSpan = playerInfo.querySelector('.player-name');
    
    // Update button
    btn.textContent = '✓';
    btn.classList.add('filled');
    
    // Show player name
    playerNameSpan.textContent = playerName.split(' ').pop(); // Show last name
    playerInfo.classList.remove('hidden');
    
    // Add to placed players
    placedPlayers.push(playerName);
    
    // Update chemistry (simplified calculation)
    updateChemistry();
    
    // Close modal
    closePlayerModal();
    
    // Check if all positions filled
    if (placedPlayers.length === 10) {
        setTimeout(() => {
            alert('Congratulations! You completed the team!');
        }, 500);
    }
}

function updateChemistry() {
    // Simplified chemistry calculation
    chemistry = Math.min(placedPlayers.length * 3 + Math.floor(Math.random() * 5), 33);
    document.querySelector('.score').textContent = `${chemistry}/33`;
}

function resetGame() {
    placedPlayers = [];
    chemistry = 0;
    
    // Reset all positions
    positionBtns.forEach(btn => {
        btn.textContent = '+';
        btn.classList.remove('filled');
        const position = btn.closest('.position');
        const playerInfo = position.querySelector('.player-info');
        playerInfo.classList.add('hidden');
    });
    
    // Update chemistry display
    document.querySelector('.score').textContent = '0/33';
    
    // Generate new game
    gameNumber = Math.floor(Math.random() * 1000) + 1;
    initGame();
}

// Add reset functionality (optional - can be triggered by a button)
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
        resetGame();
    }
});

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', initGame);
