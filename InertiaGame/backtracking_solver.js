// ============================================================================
// --- Auto Solver: Backtracking (Optimized DFS with Pruning) ---
// ============================================================================
// Uses synchronous DFS with:
// - Bitmask-based state tracking for O(1) gem set operations
// - Branch & Bound pruning: skip if current path >= best known
// - State memoization: skip if we've reached (position, gemMask) with fewer moves
// - Direction heuristic: try directions toward nearest uncollected gem first
// ============================================================================

async function solveGameBacktracking() {
    if (isMoving || isProcessing) return;
    let btn = document.getElementById('solveBacktrackBtn');
    let originalText = btn.innerText;
    btn.innerText = "Backtracking...";
    toggleUI(true);
    await new Promise(r => setTimeout(r, 50));

    try {
        let allGems = [];
        let gemPositions = []; // [{x, y}, ...]
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                if (grid[y][x] === GEM) {
                    allGems.push(x + "," + y);
                    gemPositions.push({ x, y });
                }
            }
        }

        let numGems = allGems.length;
        let fullMask = (1 << numGems) - 1;

        // Build a lookup: "x,y" -> gem bit index, for O(1) gem identification
        let gemLookup = {};
        for (let i = 0; i < numGems; i++) {
            gemLookup[allGems[i]] = i;
        }

        let bestPath = null;
        // Memoization: key "x,y,mask" -> minimum moves to reach this state
        let visited = new Map();

        let directions = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [1, -1], [-1, 1], [1, 1]];
        let iterCount = 0;
        const MAX_ITERATIONS = 500000; // Safety limit

        // Synchronous backtracking for performance
        function backtrack(x, y, mask, path) {
            iterCount++;
            if (iterCount > MAX_ITERATIONS) return; // Safety bail

            // Success: all gems collected
            if (mask === fullMask) {
                if (!bestPath || path.length < bestPath.length) {
                    bestPath = [...path];
                }
                return;
            }

            // Pruning: current path already >= best known
            if (bestPath && path.length >= bestPath.length - 1) return;

            // Pruning: state memoization (Branch & Bound)
            let stateId = x + "," + y + "," + mask;
            let prev = visited.get(stateId);
            if (prev !== undefined && prev <= path.length) return;
            visited.set(stateId, path.length);

            // Heuristic: sort directions to try those pointing toward nearest gem first
            let nearestGem = null;
            let nearestDist = Infinity;
            for (let i = 0; i < numGems; i++) {
                if (mask & (1 << i)) continue; // Already collected
                let dist = Math.abs(x - gemPositions[i].x) + Math.abs(y - gemPositions[i].y);
                if (dist < nearestDist) {
                    nearestDist = dist;
                    nearestGem = gemPositions[i];
                }
            }

            let sortedDirs = [...directions];
            if (nearestGem) {
                let gdx = nearestGem.x - x;
                let gdy = nearestGem.y - y;
                sortedDirs.sort((a, b) => {
                    // Dot product heuristic: prefer directions aligned with gem
                    let dotA = a[0] * Math.sign(gdx) + a[1] * Math.sign(gdy);
                    let dotB = b[0] * Math.sign(gdx) + b[1] * Math.sign(gdy);
                    return dotB - dotA;
                });
            }

            for (let dir of sortedDirs) {
                let dx = dir[0], dy = dir[1];
                let simX = x, simY = y;
                let simMask = mask;
                let crashed = false;

                // Simulate slide
                while (true) {
                    let nx = simX + dx, ny = simY + dy;
                    if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS || grid[ny][nx] === WALL) break;
                    simX = nx; simY = ny;

                    if (grid[simY][simX] === GEM) {
                        let gemId = simX + "," + simY;
                        let gi = gemLookup[gemId];
                        if (gi !== undefined) {
                            simMask = simMask | (1 << gi);
                        }
                    }

                    if (grid[simY][simX] === STOP) break;
                    if (grid[simY][simX] === MINE) { crashed = true; break; }
                }

                if (crashed || (simX === x && simY === y)) continue;

                path.push([dx, dy]);
                backtrack(simX, simY, simMask, path);
                path.pop(); // Backtrack

                if (iterCount > MAX_ITERATIONS) return;
            }
        }

        backtrack(player.x, player.y, 0, []);

        if (bestPath) {
            btn.innerText = "Executing...";
            for (let move of bestPath) {
                await checkPause();
                await movePlayer(move[0], move[1]);
                await new Promise(r => setTimeout(r, 400));
            }
        } else {
            alert("No solution found via Backtracking." + (iterCount > MAX_ITERATIONS ? " (Hit iteration limit)" : ""));
        }

    } catch (e) {
        console.error(e);
        alert("Backtracking Error: " + e.message);
    }
    btn.innerText = originalText;
    toggleUI(false);
}
