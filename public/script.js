import { teams, players } from './data.js';

// Team logo URLs (example, expand as needed)
const teamLogos = {
    "Manchester City": "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    "Arsenal": "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    "Liverpool": "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    "Real Madrid": "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    "Barcelona": "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    "Atletico Madrid": "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg",
    "Bayern Munich": "https://upload.wikimedia.org/wikipedia/en/1/1f/FC_Bayern_München_logo_%282017%29.svg",
    "Borussia Dortmund": "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg",
    "RB Leipzig": "https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg",
    "Juventus": "https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg",
    "Inter Milan": "https://upload.wikimedia.org/wikipedia/commons/0/0b/FC_Internazionale_Milano_2021.svg",
    "AC Milan": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
    "Napoli": "https://upload.wikimedia.org/wikipedia/commons/2/2d/SSC_Napoli.svg",
    "Paris Saint-Germain": "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg",
    "Marseille": "https://upload.wikimedia.org/wikipedia/en/9/97/Olympique_Marseille_logo.svg",
    "Monaco": "https://upload.wikimedia.org/wikipedia/en/2/2e/AS_Monaco_FC.svg",
    "Tottenham Hotspur": "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
    "Chelsea": "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
    "Roma": "https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo.svg",
    "Sevilla": "https://upload.wikimedia.org/wikipedia/en/3/3c/Sevilla_FC_logo.svg"
};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('player-form');
    const playerInput = document.getElementById('player-name');
    const teamInfo = document.getElementById('current-team-name');
    const teamLogo = document.getElementById('current-team-logo');
    const teamLeague = document.getElementById('current-team-league');
    const playerSuggestions = document.getElementById('player-suggestions');
    const lineupSummary = document.getElementById('lineup-summary');
    const lineupStatus = document.getElementById('lineup-status');
    const pitchPositions = document.querySelectorAll('.pitch-position');

    // 11 positions for a standard lineup
    const positions = [
        'GK', 'LB', 'CB1', 'CB2', 'RB', 'LM', 'CM1', 'CM2', 'RM', 'ST1', 'ST2'
    ];
    let currentSlot = 0;
    let lineup = Array(positions.length).fill(null);
    let currentTeam = null;

    function pickRandomTeam() {
        return teams[Math.floor(Math.random() * teams.length)];
    }

    function updateTeamInfo() {
        if (currentTeam) {
            teamInfo.textContent = currentTeam.name;
            teamLeague.textContent = currentTeam.league;
            // Set logo
            const logoUrl = teamLogos[currentTeam.name];
            if (logoUrl) {
                teamLogo.innerHTML = `<img src="${logoUrl}" alt="${currentTeam.name} logo">`;
            } else {
                teamLogo.innerHTML = '';
            }
            // Suggest valid players for current position
            const suggestions = players.filter(p => p.team === currentTeam.name && p.position === positions[currentSlot]);
            if (suggestions.length > 0) {
                playerSuggestions.innerHTML = 'Suggestions: ' + suggestions.map(p => p.name).join(', ');
            } else {
                playerSuggestions.innerHTML = 'No suggestions available for this position.';
            }
        } else {
            teamInfo.textContent = '';
            teamLogo.innerHTML = '';
            teamLeague.textContent = '';
            playerSuggestions.innerHTML = '';
        }
    }

    function updateLineupStatus(msg = '') {
        if (lineup.every(x => x)) {
            lineupStatus.textContent = 'Lineup complete!';
            // Show summary
            lineupSummary.innerHTML = '<strong>Your Final Lineup:</strong><br>' +
                lineup.map((p, idx) => `${positions[idx]}: ${p.name} (${p.team})`).join('<br>');
        } else {
            lineupStatus.textContent = msg || `Enter a player for position ${positions[currentSlot]} from ${currentTeam.name}`;
            lineupSummary.innerHTML = '';
        }
    }

    function renderPitch() {
        pitchPositions.forEach((posDiv, idx) => {
            const player = lineup[idx];
            if (player) {
                posDiv.textContent = player.name;
                posDiv.classList.add('assigned');
            } else {
                posDiv.textContent = positions[idx];
                posDiv.classList.remove('assigned');
            }
        });
    }

    function nextSlot() {
        currentSlot = lineup.findIndex(x => !x);
        if (currentSlot === -1) {
            updateLineupStatus();
            return;
        }
        currentTeam = pickRandomTeam();
        updateTeamInfo();
        updateLineupStatus();
        playerInput.value = '';
        playerInput.focus();
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const playerName = playerInput.value.trim();
        if (!playerName) return;
        // Validate player
        const validPlayer = players.find(p =>
            p.name.toLowerCase() === playerName.toLowerCase() &&
            p.team === currentTeam.name &&
            p.position === positions[currentSlot]
        );
        if (validPlayer) {
            lineup[currentSlot] = validPlayer;
            renderPitch();
            nextSlot();
        } else {
            updateLineupStatus('Invalid player! Make sure the player is in the team and plays this position.');
        }
    });

    // Initial setup
    renderPitch();
    nextSlot();
});
