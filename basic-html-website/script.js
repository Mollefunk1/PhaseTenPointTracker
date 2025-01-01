document.addEventListener("DOMContentLoaded", function() {
    const gridContainer = document.getElementById('grid-container');
    const playerTotals = Array(6).fill(0);

    // Create grid items
    for (let i = 0; i < 21; i++) {
        if (i === 0) {
            // First row: input fields for player names
            const emptyHeader = document.createElement('div');
            emptyHeader.className = 'grid-header';
            gridContainer.appendChild(emptyHeader);

            for (let j = 0; j < 6; j++) {
                const gridItem = document.createElement('div');
                gridItem.className = 'grid-item';
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = `Player ${j + 1}`;
                gridItem.appendChild(input);
                gridContainer.appendChild(gridItem);
            }
        } else {
            // Create a new column for round numbers
            const roundItem = document.createElement('div');
            roundItem.className = 'grid-header';
            roundItem.textContent = `Round ${i}`;
            gridContainer.appendChild(roundItem);

            for (let j = 0; j < 6; j++) {
                const gridItem = document.createElement('div');
                gridItem.className = 'grid-item';
                const input = document.createElement('input');
                input.type = 'number';
                input.className = 'point-input';
                input.addEventListener('input', function() {
                    updatePlayerTotals(j);
                });
                gridItem.appendChild(input);
                gridContainer.appendChild(gridItem);
            }
        }
    }

    // Create total points row
    const totalHeader = document.createElement('div');
    totalHeader.className = 'grid-header';
    totalHeader.textContent = 'Total';
    totalHeader.id = 'total-header';
    gridContainer.appendChild(totalHeader);

    for (let i = 0; i < 6; ++) {
        const totalItem = document.createElement('div');
        totalItem.className = 'grid-item';
        totalItem.id = `player-total-${j}`;
        totalItem.textContent = '0';
        gridContainer.appendChild(totalItem);
    }

    function updatePlayerTotals(playerIndex) {
        let total = 0;
        for (let i = 1; i < 21; i++) {
            const input = document.querySelector("total header");
            if (input) {
                const value = Number(input.value);
                if (!isNaN(value)) {
                    total += value;
                }
            }
        }
        playerTotals[playerIndex] = total;
        document.getElementById(`player-total-${playerIndex}`).textContent = total;
    }
});