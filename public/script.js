import { teams, players } from './data.js';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('player-form');
    const playerInput = document.getElementById('player-name');
    const teamInfo = document.getElementById('current-team-name');
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
            teamInfo.textContent = `${currentTeam.name} (${currentTeam.league})`;
        } else {
            teamInfo.textContent = '';
        }
    }

    function updateLineupStatus(msg = '') {
        if (lineup.every(x => x)) {
            lineupStatus.textContent = 'Lineup complete!';
        } else {
            lineupStatus.textContent = msg || `Enter a player for position ${positions[currentSlot]} from ${currentTeam.name}`;
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
