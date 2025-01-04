document.addEventListener("DOMContentLoaded", function() {
    const gridContainer = document.getElementById('grid-container');
    const playerNamesContainer = document.getElementById('player-names');
    const playerTotals = Array(6).fill(0);
    const playerPhases = Array(6).fill(1);

    // Create player names, total scores, and phase counters in the fixed header
    for (let j = 0; j < 6; j++) {
        const playerNameItem = document.createElement('div');
        const playerNameInput = document.createElement('input');
        playerNameInput.type = 'text';
        playerNameInput.placeholder = `Player ${j + 1}`;
        playerNameItem.appendChild(playerNameInput);

        const totalScoreItem = document.createElement('div');
        totalScoreItem.id = `player-total-${j}`;
        totalScoreItem.textContent = 'Total: 0';
        playerNameItem.appendChild(totalScoreItem);

        const phaseCounterItem = document.createElement('div');
        phaseCounterItem.id = `player-phase-${j}`;
        phaseCounterItem.textContent = 'Phase: 1';
        playerNameItem.appendChild(phaseCounterItem);

        playerNamesContainer.appendChild(playerNameItem);
    }

    // Create grid items
    for (let i = 0; i < 21; i++) {
        if (i === 0) {
            // First row: empty header
            const emptyHeader = document.createElement('div');
            emptyHeader.className = 'grid-header';
            gridContainer.appendChild(emptyHeader);

            for (let j = 0; j < 6; j++) {
                const playerHeader = document.createElement('div');
                playerHeader.className = 'grid-header';
                playerHeader.textContent = `Player ${j + 1}`;
                gridContainer.appendChild(playerHeader);
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
                    updatePlayerTotals();
                });
                input.addEventListener('keydown', function(event) {
                    handleArrowKeys(event, i, j);
                });
                gridItem.appendChild(input);

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'phase-checkbox';
                checkbox.addEventListener('change', function() {
                    if (checkbox.checked) {
                        incrementPhase(j);
                    } else {
                        decrementPhase(j);
                    }
                });
                gridItem.appendChild(checkbox);

                gridContainer.appendChild(gridItem);
            }
        }
    }

    function updatePlayerTotals() {
        for (let j = 0; j < 6; j++) {
            let total = 0;
            for (let i = 1; i < 21; i++) {
                const input = document.querySelector(`.grid-container > div:nth-child(${i * 7 + j + 2}) .point-input`);
                if (input) {
                    total += parseInt(input.value) || 0;
                }
            }
            playerTotals[j] = total;
            document.getElementById(`player-total-${j}`).textContent = `Total: ${total}`;
        }
    }

    function incrementPhase(playerIndex) {
        playerPhases[playerIndex]++;
        document.getElementById(`player-phase-${playerIndex}`).textContent = `Phase: ${playerPhases[playerIndex]}`;
    }

    function decrementPhase(playerIndex) {
        if (playerPhases[playerIndex] > 1) {
            playerPhases[playerIndex]--;
            document.getElementById(`player-phase-${playerIndex}`).textContent = `Phase: ${playerPhases[playerIndex]}`;
        }
    }

    function handleArrowKeys(event, row, col) {
        const key = event.key;
        let newRow = row;
        let newCol = col;

        if (key === 'ArrowUp') {
            newRow = row - 1;
            event.preventDefault();
        } else if (key === 'ArrowDown') {
            newRow = row + 1;
            event.preventDefault();
        } else if (key === 'ArrowLeft') {
            newCol = col - 1;
        } else if (key === 'ArrowRight') {
            newCol = col + 1;
        }

        if (newRow >= 1 && newRow <= 20 && newCol >= 0 && newCol < 6) {
            const nextInput = document.querySelector(`.grid-container > div:nth-child(${newRow * 7 + newCol + 2}) .point-input`);
            if (nextInput) {
                nextInput.focus();
            }
        }
    }
});