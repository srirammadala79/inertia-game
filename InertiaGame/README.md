# Inertia Puzzle (Inertia Game)

Welcome to the **Inertia Puzzle**, an engaging grid-based pathfinding and optimization game where the core challenge is to find the most efficient route to collect all the points of interest (Gems) while navigating various obstacles.

## 🎮 How to Play

- **Movement:** Use the Numpad (1-9) to slide your character in different directions.
- **Objective:** Collect all the **Blue Gems** scattered across the grid.
- **Hazards & Obstacles:** 
  - Avoid **Red Mines** which will end your game.
  - **Stop Plates** will halt your sliding movement, allowing you to change directions.
  - **Walls** block your path entirely.

## 🧠 Algorithmic Solvers

The game comes with built-in automated solvers that demonstrate various pathfinding and optimization algorithms. This acts as an interactive visualizer for algorithm analysis:

1. **BFS (Breadth-First Search) - Optimal**
   - Finds the shortest path layer-by-layer. Guaranteed to find the optimal solution but can be slow on very large grids with many gems.
2. **Dynamic Programming (Bitmasking TSP) - Optimal**
   - Applies the Traveling Salesman Problem strategy. By using bitmasking and pre-calculating distances, it finds the optimal path significantly faster than BFS on sparse grids.
3. **Backtracking (Optimized DFS)**
   - Utilizes a recursive depth-first approach with state memoization and intelligent pruning to quickly find valid paths or optimal solutions without exhausting the entire search space.
4. **Divide & Conquer (Merge/Quick Sort Approach)**
   - Subdivides clusters of gems to solve them independently.
5. **Greedy Search (Best-First)**
   - Prioritizes the immediate optimal move. Very fast, but does not guarantee the overall shortest path.

## 📂 Documentation

The theoretical aspects, time complexity analysis, and implementation details of the underlying algorithms are thoroughly documented in the `Time_Complexity` directory (originally Review-3).

---
*Created as part of an algorithmic and data structures exploration project.*
