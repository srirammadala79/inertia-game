# Review 3: Advanced Optimization - Dynamic Programming & Backtracking

This document outlines the theoretical logic, implementation strategy, and complexity analysis for the two advanced algorithms being added to the **InertiaGame** solver for Review 3.

---

## 1. Project Overview & Improvement from Version 2 (2 Marks)

In Version 2, we implemented:
*   **BFS (Breadth-First Search)**: For finding the shortest path (optimal).
*   **Greedy (Best-First Search)**: For fast, non-optimal solutions.
*   **Divide & Conquer (D&C)**: Using Merge Sort and Quick Sort patterns to solve sub-clusters of gems.

**What's New in Version 3?**
1.  **Dynamic Programming (Bitmasking)**: Applying the **Traveling Salesman Problem (TSP)** strategy to the grid to solve the optimal path much faster than BFS in sparse grids.
2.  **Backtracking (Branch & Bound)**: A recursive approach with depth pruning and state memoization, showcasing how DFS can be optimized to find any valid solution quickly.
3.  **UI Enhancements**: Progress tracking and comparison metrics between algorithms.

---

## 2. Dynamic Programming Logic (2 Marks)

The core challenge of Inertia Game is to find the shortest path visiting all "Points of Interest" (Gems). This is essentially the **Traveling Salesman Problem (TSP)** on a grid.

### 2.1 The Two-Step DP Strategy
Instead of searching the whole grid with every combination of gems (like BFS), we break it into two distinct phases:

**Phase 1: Pre-computation (BFS Pairwise Distance)**
*   Calculate the shortest distance (in moves) from the Start to every Gem, and between every pair of Gems.
*   Store these in a distance matrix `dist[G+1][G+1]`.
*   **Benefit**: We only run a simplified BFS $G+1$ times, ignoring the "collected gems" state.

**Phase 2: Bitmask DP (The Core Algorithm)**
*   **State Definition**: `dp[mask][i]`
    *   `mask`: A bitmask representing the subset of gems collected (e.g., `101` means gems 0 and 2 are collected).
    *   `i`: The index of the gem we are currently standing on.
*   **Relation (Transition)**:
    $dp[mask \cup \{j\}][j] = \min(dp[mask \cup \{j\}][j], \ dp[mask][i] + dist[i][j])$
*   **Base Case**: `dp[1 << i][i] = dist[Start][i]` for all gems $i$.
*   **Final Result**: $\min(dp[(1 \ll G) - 1][i])$ for all $i$.

---

## 3. Backtracking Logic (2 Marks)

Backtracking is a systematic way to explore the search space. To make it viable for game solving, we implement it as **Optimized DFS**.

### 3.1 Key Ideas & Pruning
1.  **Recursive Search**: `backtrack(current_pos, mask, path_so_far)`
2.  **State Memoization (Pruning)**: If we reach a position $(x, y)$ with the same `mask` in more moves than a previous visit, we "prune" that branch immediately.
3.  **Path Bounding**: If the current path length already exceeds our `best_known_path`, we stop and return.
4.  **Directional Ordering**: Try directions that lead closer to the nearest gem first to find a "good" solution early, which helps prune more branches later.

---

## 4. Algorithm Analysis (2 Marks)

Comparing the performance and characteristics of all implemented solvers.

### 4.1 Complexity Table

| Algorithm | Method | Time Complexity | Space Complexity | Optimality |
| :--- | :--- | :--- | :--- | :--- |
| **BFS** | Iterative Layering | $O(R 	imes C 	imes 2^G 	imes L)$ | $O(R 	imes C 	imes 2^G)$ | **Optimal** |
| **Greedy** | Best-First Search | $O(V 	imes \log V)$ | $O(V)$ | Not Guaranteed |
| **D & C** | Merge/Quick Sort | $O(G^2 	imes R 	imes C 	imes L)$ | $O(G 	imes R 	imes C)$ | Approximation |
| **DP** | Bitmasking | $O(G^2 	imes 2^G + G 	imes R 	imes C 	imes L)$ | $O(G 	imes 2^G)$ | **Optimal** |
| **Backtracking** | Recursive DFS | $O(8^D)$ (worst) | $O(D)$ | Any / Optimal |

*(R=Rows, C=Cols, G=Gems, L=Max slide length, D=Search depth)*

### 4.2 Why use DP over BFS?
*   In a large empty grid (e.g., $30 	imes 30$) with 10 gems:
    *   **BFS** explores many "empty" states $(x, y, mask)$ where nothing happens.
    *   **DP** only cares about the transitions between gems. The $2^G$ factor still exists, but the "Grid Size" factor is moved to the pre-computation step, making it significantly more efficient for sparse maps.

---

## 5. Individual Contribution (2 Marks)

As part of the Review 3 submission, the following components were personally developed/documented:
*   **Bitmask DP Implementation**: Developed the recursive DP with memoization to solve the TSP portion of the game.
*   **Backtracking Pruning Logic**: Designed the visited-state memoization for the backtracking solver to prevent infinite loops and redundant searches.
*   **Comparative Benchmark**: Created the complexity analysis and comparative table to justify algorithm selection for different grid types.
*   **MD Documentation**: Authored this guide and the accompanying analysis files for Review 3.

---

## 6. Implementation Plan (Review 3 Week)

1.  **Monday**: Implement `precomputeDistances()` in `solvers.js` using BFS.
2.  **Tuesday**: Implement the `solveDP()` function using bitmasking.
3.  **Wednesday**: Implement the `solveBacktracking()` function with recursion and pruning.
4.  **Thursday**: Connect UI buttons to new solvers and add a "Complexity Benchmarking" panel.
5.  **Friday**: Final testing on various level sizes and bug fixing.
