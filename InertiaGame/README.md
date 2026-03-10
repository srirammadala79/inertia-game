# 💎 Inertia Game: Algorithmic Pathfinding Puzzle

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Welcome to the **Inertia Puzzle**, an engaging grid-based optimization and pathfinding game built entirely with vanilla Web Technologies (HTML, CSS, JS). 

The core challenge of the game is to find the most efficient route to collect all "Points of Interest" (Blue Gems) while navigating various obstacles, simulating complex real-world routing and Traveling Salesman Problems (TSP).

---

## 📋 Table of Contents

- [🎮 How to Play](#-how-to-play)
- [✨ Features](#-features)
- [⚙️ Setup & Installation](#️-setup--installation)
- [🧠 Algorithmic Solvers](#-algorithmic-solvers)
- [📊 Visualizers](#-visualizers)
- [📂 Documentation](#-documentation)

---

## 🎮 How to Play

The player character moves in a frictionless environment—once you start sliding, you won't stop until you hit an obstacle or the edge of the board!

- **Movement:** Use the **Numpad (1-9)** to slide your character in all 8 directions.
- **Objective:** Collect all the **Blue Gems** scattered across the grid.
- **Hazards & Obstacles:** 
  - 💣 **Red Mines:** Avoid these! Hitting a mine will end your game.
  - 🛑 **Stop Plates:** These safely halt your sliding movement, allowing you to change directions mid-slide.
  - 🧱 **Walls:** Block your path entirely and stop your slide.

---

## ✨ Features

- **Procedural Grid Generation:** Customize the grid size (Rows/Cols), and the number of Gems, Mines, and Walls.
- **Multiple Intelligent Solvers:** Instantly solve maps using different algorithms to compare their efficiency and optimality.
- **Step-by-Step Visualizers:** Watch the internal decision-making process of advanced algorithms like Dynamic Programming and Backtracking in real-time.
- **Responsive UI:** Clean, modern interface with real-time stats (Move count, Gem counter).

---

## ⚙️ Setup & Installation

This project requires no build tools or package managers. It's ready to run immediately in your browser!

1. **Clone the repository:**
   ```bash
   git clone https://github.com/srirammadala79/inertia-game.git
   ```
2. **Navigate to the directory:**
   ```bash
   cd inertia-game
   ```
3. **Launch the Game:**
   Simply open the `index.html` file in your favorite modern web browser (Chrome, Firefox, Edge, Safari).
   ```bash
   # On Windows:
   start index.html
   
   # On macOS:
   open index.html
   
   # On Linux:
   xdg-open index.html
   ```

---

## 🧠 Algorithmic Solvers

The game comes with built-in automated solvers that act as an interactive visualizer for algorithm analysis. Each algorithm tackles the pathfinding problem differently:

| Algorithm | Strategy | Optimality | Complexity | Best Used For |
| :--- | :--- | :--- | :--- | :--- |
| **BFS** | Iterative Layering shortest path | **Optimal** | `O(R×C × 2^G × L)` | Small grids, few gems. Exhaustive state-space search. |
| **DP (Bitmask TSP)** | Pre-computed BFS + Bitmasking | **Optimal** | `O(G^2 × 2^G + BFS)` | Sparse grids. Extremely fast optimal solution by skipping empty spaces. |
| **Backtracking** | Recursive DFS w/ Memoization & Pruning | **Any / Optimal** | `O(8^D)` (worst-case) | Finding *any* valid solution quickly, avoiding exhaustive searches. |
| **Divide & Conquer**| Sub-clustering (Merge/Quick Sort) | Approximation | `O(G^2 × R×C × L)` | Very large maps where optimal DP/BFS runs out of memory. |
| **Greedy** | Best-First Search (Nearest Neighbor) | Not Guaranteed| `O(V log V)` | Instant, non-optimal pathfinding. Priorities immediate gains. |

*(R=Rows, C=Cols, G=Gems, L=Max slide length, D=Search depth)*

---

## 📊 Visualizers

To understand the advanced solvers better, the project includes dedicated visualizers:

- **[DP Visualizer](visulaizer/dp_presentation.html):** Demonstrates the `dist[i][j]` precomputation and how the bitmask `dp[mask][i]` states are evaluated.
- **[Backtracking Visualizer](visulaizer/backtracking_presentation.html):** Shows the recursive tree search, branch pruning, and state memoization to avoid infinite sliding loops.

---

## 📂 Documentation

The theoretical aspects, full time complexity analysis, and implementation details of the underlying algorithms are thoroughly documented in the `Time_Complexity` directory.

- `TIME_COMPLEXITY_ANALYSIS.md`: Deep dive into Big-O notations and benchmark comparisons.
- `ALGO_PLAN.md`: Strategic breakdown of the two-step DP process and DFS pruning techniques.
- `IMPACT_AND_RESULTS.md`: Real-world implications of these routing algorithms.

---

<p align="center">
  <i>Created as part of an algorithmic and data structures exploration project.</i><br>
  <b>Author:</b> <a href="https://github.com/srirammadala79">Sriram Madala</a>
</p>
