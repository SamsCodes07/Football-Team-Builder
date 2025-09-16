document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('player-form');
    const teamList = document.getElementById('team-list');
    const team = [];

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

    function renderTeam() {
        teamList.innerHTML = '';
        team.forEach((player, idx) => {
            const div = document.createElement('div');
            div.className = 'team-member';
            div.textContent = `${idx+1}. ${player.name} - ${player.position}`;
            teamList.appendChild(div);
        });
    }
});
