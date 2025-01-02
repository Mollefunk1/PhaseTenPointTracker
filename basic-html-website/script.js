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
                    updatePlayerTotals();
                });
                input.addEventListener('keydown', function(event) {
                    handleArrowKeys(event, i, j);
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
    gridContainer.appendChild(totalHeader);

    for (let j = 0; j < 6; j++) {
        const totalItem = document.createElement('div');
        totalItem.className = 'grid-item';
        totalItem.id = `player-total-${j}`;
        totalItem.textContent = '0';
        gridContainer.appendChild(totalItem);
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
            document.getElementById(`player-total-${j}`).textContent = total;
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