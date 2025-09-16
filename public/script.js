document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('player-form');
    const teamList = document.getElementById('team-list');
    const fieldPositions = document.querySelectorAll('.field-position');
    const team = [];

    // Track assigned players to field positions
    const assignedPlayers = {};

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('player-name').value.trim();
        const position = document.getElementById('player-position').value;
        if (name && position) {
            team.push({ name, position });
            renderTeam();
            form.reset();
        }
    });

    // Assign player to field position on click
    fieldPositions.forEach((pos, idx) => {
        pos.addEventListener('click', function() {
            // Find first unassigned player for this position
            const available = team.filter(p => p.position === pos.dataset.position && !Object.values(assignedPlayers).includes(p.name));
            if (available.length > 0) {
                assignedPlayers[idx] = available[0].name;
                pos.textContent = available[0].name + ' (' + pos.dataset.position + ')';
                pos.classList.add('assigned');
                renderTeam();
            } else {
                alert('No available player for this position!');
            }
        });
    });

    function renderTeam() {
        teamList.innerHTML = '<h2>Team List</h2>';
        team.forEach((player, idx) => {
            const div = document.createElement('div');
            div.className = 'team-member';
            div.textContent = `${idx+1}. ${player.name} - ${player.position}`;
            teamList.appendChild(div);
        });
    }
});
