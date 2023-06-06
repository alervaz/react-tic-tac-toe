const checkWin = (cells: number[]): [boolean, number[]] => {
    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
        [1, 5, 9], [3, 5, 7] // Diagonals
    ];

    if(cells.length >= 3) {
        for (const winCombination of winningCombinations) {
            const [a, b, c] = winCombination;

            if(cells.includes(a) && cells.includes(b) && cells.includes(c)) {
                return [true, [a, b, c]]
            }
        }
    }

    return [false, []]
}

export default checkWin;