// ============================================================================
// --- Auto Solver: Dynamic Programming (Bitmask TSP) ---
// ============================================================================
// This is the most advanced solver, treating the game as a Traveling Salesman
// Problem on a grid. It uses a two-phase approach:
// 
// 1. PRE-COMPUTATION: Runs BFS from every reachable position to find
//    transitions that collect each gem, tracking actual stopping positions.
// 2. DP WITH BITMASKING: Uses memoization over (mask, lastGem, stopPosition)
//    to find the optimal order of gem collection.
//
// KEY FIX: In an inertia game, the player slides past gems and stops at
// walls/boundaries/stop tiles. The DP must track the actual stopping position
// (not just which gem was collected) because the next move depends on WHERE
// the player ended up, not where the gem was located.
//
// Complexity: O(G^2 * P * 2^G) where G = gems, P = unique stop positions.
// ============================================================================

async function solveGameDP() {
    if (isMoving || isProcessing) return;
    let btn = document.getElementById('solveDpBtn');
    let originalText = btn.innerText;
    btn.innerText = "DP Computing...";
    toggleUI(true);
    await new Promise(r => setTimeout(r, 50));

    try {
        let allGems = [];
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                if (grid[y][x] === GEM) allGems.push({ x: x, y: y, id: x + "," + y });
            }
        }

        if (allGems.length > 15) {
            alert("Too many gems for DP (Max 15). Use BFS instead.");
            btn.innerText = originalText;
            toggleUI(false);
            return;
        }

        let numGems = allGems.length;
        let directions = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [1, -1], [-1, 1], [1, 1]];

        // --- PHASE 1: BFS from any position to find paths that collect each gem ---
        // Returns: array of { gemIdx, moves, path, endX, endY } for each reachable gem
        function bfsFindGemPaths(sx, sy) {
            let results = [];
            let found = new Array(numGems).fill(false);
            let queue = [{ x: sx, y: sy, path: [] }];
            let visited = new Set();
            visited.add(sx + "," + sy);

            while (queue.length > 0) {
                let curr = queue.shift();

                for (let dir of directions) {
                    let dx = dir[0], dy = dir[1];
                    let simX = curr.x, simY = curr.y;
                    let crashed = false;
                    let gemsOnPath = [];

                    // Simulate the slide
                    while (true) {
                        let nx = simX + dx, ny = simY + dy;
                        if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS || grid[ny][nx] === WALL) break;
                        simX = nx; simY = ny;

                        // Check if we pass through any gem
                        for (let gi = 0; gi < numGems; gi++) {
                            if (simX === allGems[gi].x && simY === allGems[gi].y) {
                                gemsOnPath.push(gi);
                            }
                        }

                        if (grid[simY][simX] === STOP) break;
                        if (grid[simY][simX] === MINE) { crashed = true; break; }
                    }
                    if (crashed || (simX === curr.x && simY === curr.y)) continue;

                    let newPath = [...curr.path, [dx, dy]];

                    // Record any gems we collected on this slide
                    for (let gi of gemsOnPath) {
                        if (!found[gi]) {
                            found[gi] = true;
                            results.push({
                                gemIdx: gi,
                                moves: newPath.length,
                                path: newPath,
                                endX: simX,
                                endY: simY
                            });
                        }
                    }

                    let stateId = simX + "," + simY;
                    if (!visited.has(stateId)) {
                        visited.add(stateId);
                        queue.push({ x: simX, y: simY, path: newPath });
                    }
                }
            }
            return results;
        }

        // --- Build transition cache ---
        // transFromPos["x,y"] = [{ gemIdx, moves, path, endX, endY }, ...]
        let transFromPos = {};

        // From player start
        let playerKey = player.x + "," + player.y;
        transFromPos[playerKey] = bfsFindGemPaths(player.x, player.y);

        // We'll lazily compute transitions from other positions as needed
        function getTransitions(sx, sy) {
            let key = sx + "," + sy;
            if (!transFromPos[key]) {
                transFromPos[key] = bfsFindGemPaths(sx, sy);
            }
            return transFromPos[key];
        }

        // Pre-compute transitions from each gem position (common stops)
        for (let i = 0; i < numGems; i++) {
            getTransitions(allGems[i].x, allGems[i].y);
        }

        // --- PHASE 2: Bitmask DP ---
        // dp key: "mask|lastGemIdx|endX,endY" -> { totalDist, path }
        // We use a Map for sparse storage since positions can vary
        let dp = new Map();

        function dpKey(mask, lastGem, ex, ey) {
            return mask + "|" + lastGem + "|" + ex + "," + ey;
        }

        // Initialize: try collecting each gem from the player start
        let startTrans = getTransitions(player.x, player.y);
        for (let t of startTrans) {
            let mask = 1 << t.gemIdx;
            let key = dpKey(mask, t.gemIdx, t.endX, t.endY);
            let existing = dp.get(key);
            if (!existing || t.moves < existing.totalDist) {
                dp.set(key, {
                    totalDist: t.moves,
                    path: t.path,
                    endX: t.endX,
                    endY: t.endY
                });
            }
        }

        // Process DP states by increasing mask popcount for correct ordering
        for (let popcount = 1; popcount < numGems; popcount++) {
            // Iterate over all current DP entries and expand
            let entries = [...dp.entries()];
            for (let [key, state] of entries) {
                // Parse key to get mask
                let parts = key.split("|");
                let mask = parseInt(parts[0]);

                // Only process states with the current popcount
                let bits = 0;
                for (let b = 0; b < numGems; b++) if (mask & (1 << b)) bits++;
                if (bits !== popcount) continue;

                // Get transitions from the actual end position
                let trans = getTransitions(state.endX, state.endY);
                for (let t of trans) {
                    if (mask & (1 << t.gemIdx)) continue; // Already collected

                    let nextMask = mask | (1 << t.gemIdx);
                    let newDist = state.totalDist + t.moves;
                    let nKey = dpKey(nextMask, t.gemIdx, t.endX, t.endY);
                    let existing = dp.get(nKey);

                    if (!existing || newDist < existing.totalDist) {
                        dp.set(nKey, {
                            totalDist: newDist,
                            path: [...state.path, ...t.path],
                            endX: t.endX,
                            endY: t.endY
                        });
                    }
                }
            }
        }

        // Find best final state (all gems collected)
        let fullMask = (1 << numGems) - 1;
        let bestFinal = null;
        for (let [key, state] of dp.entries()) {
            let mask = parseInt(key.split("|")[0]);
            if (mask === fullMask) {
                if (!bestFinal || state.totalDist < bestFinal.totalDist) {
                    bestFinal = state;
                }
            }
        }

        if (bestFinal) {
            btn.innerText = "Executing DP...";
            for (let move of bestFinal.path) {
                await checkPause();
                await movePlayer(move[0], move[1]);
                await new Promise(r => setTimeout(r, 400));
            }
        } else {
            alert("DP could not find a path to all gems.");
        }

    } catch (e) {
        console.error(e);
        alert("DP Error: " + e.message);
    }
    btn.innerText = originalText;
    toggleUI(false);
}
