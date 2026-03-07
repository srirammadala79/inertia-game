# Time Complexity Analysis — DP, Backtracking & Divide and Conquer

## Inertia Game Solver Algorithms

> **Variables used throughout this document:**
>
> - **G** = Number of gems on the grid
> - **R** = Number of rows in the grid
> - **C** = Number of columns in the grid
> - **N** = R × C (total cells in the grid)
> - **L** = Maximum slide length (at most max(R, C))

---

## 1. Dynamic Programming (Bitmask TSP)

### 1.1 What does the algorithm do?

The DP solver treats the Inertia Game as a **Traveling Salesman Problem (TSP)**.
The goal is: *Starting from the player's position, visit all G gems using the fewest moves.*

It works in **two phases**:

**Phase 1 — Pre-computation (BFS for distances)**
- Run BFS from the player's starting position to find shortest paths to each gem.
- Run BFS from each gem's position to find shortest paths to every other gem.
- This gives us a **distance table** between every pair of points.

**Phase 2 — Bitmask DP (Finding best order to visit gems)**
- Use a bitmask to represent which gems have been collected.
- For G gems, the bitmask has G bits. Each bit = 1 means that gem is collected.
- Example with 4 gems: mask = 1010 means gems 1 and 3 are collected, gems 0 and 2 are not.
- The DP finds the minimum-cost ordering of gem visits.

---

### 1.2 Time Complexity Breakdown

#### Phase 1: Pre-computation

- We run BFS from **(G + 1) positions** (G gems + 1 player start).
- Each BFS explores the entire grid in the worst case.
- Grid has R × C = N cells, and from each cell we try 8 directions.
- Each slide can go at most L steps.

**Time for one BFS** = O(N × 8 × L) = O(N × L)

**Time for all BFS runs** = O((G + 1) × N × L)

Simplified: **O(G × N × L)** — since G + 1 ≈ G for analysis

#### Phase 2: Bitmask DP

- Number of possible bitmasks = 2^G (all possible subsets of G gems).
- For each mask, we check all G gems as "last visited".
- For each state, we try transitioning to all G remaining gems.

**Time for DP** = O(G² × 2^G)

#### Total Time Complexity

```
T(DP) = O(G × N × L) + O(G² × 2^G)
         ───────────    ─────────────
         Phase 1         Phase 2
```

**Overall: O(G × N × L + G² × 2^G)**

---

### 1.3 Space Complexity

| Component              | Space Required     |
|------------------------|-------------------|
| Distance table         | O(G² )            |
| BFS visited set        | O(N) per BFS run  |
| DP table               | O(G × 2^G)        |
| Path storage           | O(G × 2^G)        |

**Overall Space: O(G × 2^G + G²)**

---

### 1.4 Example Calculation

For a typical game with **R = 10, C = 15, G = 10, L = 15**:

- N = 10 × 15 = 150
- Phase 1: G × N × L = 10 × 150 × 15 = **22,500 operations**
- Phase 2: G² × 2^G = 100 × 1024 = **102,400 operations**
- **Total ≈ 124,900 operations** ✓ Very fast!

For **G = 15** (maximum allowed):
- Phase 2: 15² × 2^15 = 225 × 32,768 = **7,372,800 operations**
- Still very manageable!

---

## 2. Backtracking (Branch & Bound DFS)

### 2.1 What does the algorithm do?

Backtracking uses **Depth-First Search (DFS)** to explore all possible move sequences recursively. It tries every direction, simulates each slide, and backtracks when a path is not promising.

**Key optimizations built into our implementation:**

1. **Branch & Bound Pruning**: If the current path length ≥ best known solution, stop exploring.
2. **State Memoization**: Remember the shortest path to reach each (position, collected-gems) state. If we've been here with fewer moves before, prune this branch.
3. **Direction Heuristic**: Try directions pointing toward the nearest uncollected gem first, so we find a good solution early and prune more branches.

---

### 2.2 Time Complexity Breakdown

#### Worst Case (No Pruning)

At each position, the player can slide in **8 directions**.
If the search goes D levels deep before finding all gems:

**Worst Case: O(8^D)**

Where D is the maximum search depth. In theory, D could be very large.

This is **exponential** — but in practice, pruning reduces it dramatically.

#### With Pruning (Practical Case)

The pruning mechanisms limit the effective search:

1. **State memoization** ensures we never revisit the same (x, y, mask) with equal or more moves.
   - Unique states = N × 2^G (positions × gem subsets)
   - Each state is visited at most once effectively.

2. **Branch & Bound** cuts off branches exceeding the best known solution.

**Practical Complexity: O(N × 2^G × 8)**

Simplified: **O(N × 2^G)**

This is similar to BFS in the worst case, but typically much faster because:
- DFS finds *a* solution quickly (guided by heuristic)
- Then it prunes most remaining branches

#### Safety Limit

Our implementation caps at **500,000 iterations** to prevent the browser from freezing.

---

### 2.3 Space Complexity

| Component              | Space Required    |
|------------------------|------------------|
| Recursion stack         | O(D)             |
| Memoization table       | O(N × 2^G)      |
| Best path storage       | O(D)             |
| Current path (reused)   | O(D)             |

**Overall Space: O(N × 2^G + D)**

Since D ≤ total iterations, this simplifies to **O(N × 2^G)**.

---

### 2.4 Example Calculation

For **R = 10, C = 15, G = 10**:

- N = 150
- Worst case states: N × 2^G = 150 × 1024 = **153,600 states**
- With 8 directions each: 153,600 × 8 = **1,228,800 operations**
- But with pruning, typically only **10–30%** of states are explored.
- **Practical: ~100,000 to 400,000 operations**

---

## 3. Divide and Conquer (Merge Sort + Quick Sort Pattern)

### 3.1 What does the algorithm do?

The D&C solver splits the gem-collection problem into smaller sub-problems:

1. **DIVIDE**: Sort gems spatially and split into two groups (like Merge Sort).
2. **CONQUER**: Recursively solve each group (find path to collect those gems).
3. **MERGE**: Try both orderings (Group A first vs Group B first), pick the shorter path.

Each sub-problem uses BFS to find the path to a single target gem.

---

### 3.2 Time Complexity Breakdown

#### Recursive Division

- Gems are divided in half at each level → **log₂(G) levels** of recursion.
- At each level, gems are sorted by X or Y coordinate.

**Sorting at each level**: O(G × log G)   ← Quick Sort

#### BFS for Each Gem (Base Case)

- At the leaves of recursion, BFS finds a path to **one specific gem**.
- Each BFS explores up to N cells with 8 directions.

**One BFS**: O(N × L)

- Total leaf-level BFS calls: G (one per gem).

**All base BFS calls**: O(G × N × L)

#### Merge Phase

- At each level, we try **2 orderings** (A→B and B→A).
- This doubles the work at each level.
- With log₂(G) levels: 2^(log₂ G) = G orderings total.

#### Total Time Complexity

```
T(D&C) = O(G × log G)  +  O(G × N × L)  +  O(G)
          ─────────────    ──────────────    ──────
          Sorting gems     BFS per gem      Merge orderings
```

**Overall: O(G × N × L + G × log G)**

Simplified (since N × L >> log G): **O(G × N × L)**

---

### 3.3 Space Complexity

| Component              | Space Required       |
|------------------------|---------------------|
| Recursion stack         | O(log G)            |
| BFS visited set         | O(N) per BFS        |
| Path storage            | O(G × L)            |
| Sorted gem arrays       | O(G) per level      |

**Overall Space: O(G × L + N)**

---

## 4. Head-to-Head Comparison

### 4.1 Complexity Summary Table

| Algorithm      | Time Complexity             | Space Complexity     | Optimal? |
|----------------|----------------------------|---------------------|----------|
| **DP**         | O(G² × 2^G + G×N×L)       | O(G × 2^G)          | ✅ Yes    |
| **Backtracking** | O(N × 2^G) practical     | O(N × 2^G)          | ✅ Yes (if no iteration limit hit) |
| **D&C**        | O(G × N × L)              | O(G×L + N)           | ❌ Approximate |

### 4.2 Speed Comparison by Gem Count

The key factor is the **2^G** term in DP and Backtracking vs the **G** term in D&C.

| Gems (G) | 2^G       | DP Phase 2 (G²×2^G) | D&C (G×N×L)    | Fastest     |
|-----------|-----------|---------------------|----------------|-------------|
| 3         | 8         | 72                  | 6,750          | **DP**      |
| 5         | 32        | 800                 | 11,250         | **DP**      |
| 8         | 256       | 16,384              | 18,000         | **DP**      |
| 10        | 1,024     | 102,400             | 22,500         | **D&C**     |
| 12        | 4,096     | 589,824             | 27,000         | **D&C**     |
| 15        | 32,768    | 7,372,800           | 33,750         | **D&C**     |

*(Using N = 150, L = 15 for calculations)*

### 4.3 Key Insight — When Each Algorithm Wins

```
                     Few Gems (≤ 8)           Many Gems (> 10)
                    ┌──────────────┐         ┌──────────────┐
                    │   DP wins!   │         │  D&C wins!   │
                    │              │         │              │
    Optimal? ──────►│   ✅ Yes     │         │  ❌ No       │
    Speed ─────────►│   Very Fast  │         │  Very Fast   │
                    │   2^G small  │         │  O(G) linear │
                    └──────────────┘         └──────────────┘

                          Backtracking
                    ┌──────────────────────┐
                    │  Good for any G      │
                    │  Fast if good        │
                    │  pruning kicks in    │
                    │  ✅ Optimal (usually) │
                    │  ⚠ Can be slow on    │
                    │    hard instances    │
                    └──────────────────────┘
```

---

## 5. Detailed Comparison — DP vs D&C

### 5.1 Why DP is faster than D&C for few gems

When G is small (say G = 5):

- **DP Phase 2** = G² × 2^G = 25 × 32 = **800 operations**
- **D&C** = G × N × L = 5 × 150 × 15 = **11,250 operations**

DP is **14× faster** because 2^G is tiny, and the DP avoids running BFS repeatedly.

### 5.2 Why D&C is faster than DP for many gems

When G is large (say G = 15):

- **DP Phase 2** = G² × 2^G = 225 × 32,768 = **7,372,800 operations**
- **D&C** = G × N × L = 15 × 150 × 15 = **33,750 operations**

D&C is **218× faster** because 2^G explodes exponentially, while D&C scales linearly with G.

### 5.3 The Crossover Point

The two algorithms are roughly equal when:

```
G² × 2^G  ≈  G × N × L

Simplifies to:  G × 2^G  ≈  N × L
```

For N = 150, L = 15 → N × L = 2,250

Solving G × 2^G = 2,250:
- G = 8 → 8 × 256 = 2,048 ≈ 2,250  ✓

**Crossover point: approximately G = 8 gems**

- **G < 8**: DP is faster  
- **G > 8**: D&C is faster  
- **G = 8**: Both are similar

---

## 6. Detailed Comparison — DP vs Backtracking

### 6.1 Both find optimal solutions, but differ in approach

| Aspect              | DP                              | Backtracking                     |
|--------------------|---------------------------------|----------------------------------|
| Strategy           | Bottom-up, fills table          | Top-down, explores and prunes    |
| Guarantee          | Always finds optimal            | Finds optimal if search completes |
| Memory             | O(G × 2^G) — can be large      | O(N × 2^G) — memoization table  |
| Speed consistency  | Predictable                     | Varies — fast on easy, slow on hard |
| Gem limit          | G ≤ 15 (memory constraint)     | No hard limit, but has iteration cap |

### 6.2 When DP beats Backtracking

- **Dense grids with many obstacles**: Backtracking explores many dead-end branches. DP systematically fills the table without wasted work.
- **G between 5–12**: DP table fits in memory and is computed quickly.

### 6.3 When Backtracking beats DP

- **Sparse grids with clear paths**: The direction heuristic finds a near-optimal solution immediately, and pruning eliminates most branches.
- **Very few gems (G ≤ 4)**: Backtracking finishes almost instantly without needing the overhead of building distance tables.

---

## 7. Detailed Comparison — Backtracking vs D&C

### 7.1 Fundamental Difference

| Aspect              | Backtracking                | D&C                            |
|--------------------|-----------------------------|---------------------------------|
| Approach           | Explore all paths, prune    | Divide problem, solve parts     |
| Optimality         | ✅ Optimal (when completes)  | ❌ Approximate                   |
| Worst case         | O(8^D) — exponential        | O(G × N × L) — polynomial      |
| Best case          | Very fast with good pruning | Consistent speed                |

### 7.2 Why D&C is more predictable

D&C's time complexity is **polynomial** — it scales smoothly with input size.  
Backtracking's time is **exponential in the worst case** — it can be blazing fast OR very slow depending on the grid layout.

### 7.3 Example scenario

**Easy grid** (gems in a line, no obstacles):
- Backtracking: Finds solution in ~50 iterations (heuristic guides it straight)
- D&C: Still does G BFS runs = ~22,500 operations
- **Winner: Backtracking** (450× faster)

**Hard grid** (gems surrounded by mines, complex paths needed):
- Backtracking: May hit the 500,000 iteration limit
- D&C: Still finishes in ~22,500 operations
- **Winner: D&C** (22× faster and more reliable)

---

## 8. Summary — Which Algorithm to Use?

| Situation                              | Best Algorithm   | Why?                                        |
|---------------------------------------|-----------------|---------------------------------------------|
| Few gems (G ≤ 8), need optimal path    | **DP**          | 2^G is small, guaranteed optimal             |
| Many gems (G > 10)                     | **D&C**         | Polynomial time, no exponential blowup        |
| Simple grid, any gem count             | **Backtracking**| Heuristic finds solution quickly              |
| Complex grid with obstacles            | **DP** or **D&C**| Systematic approach avoids dead-ends         |
| Need guaranteed fastest response       | **D&C**         | Most predictable runtime                     |
| Need guaranteed optimal solution       | **DP**          | Mathematically proven optimal                |

---

## 9. Growth Rate Comparison

To understand why 2^G grows so fast compared to G:

| G   | G (linear) | G² (quadratic) | G × log₂G | 2^G (exponential)  |
|-----|-----------|----------------|-----------|-------------------|
| 1   | 1         | 1              | 0         | 2                 |
| 2   | 2         | 4              | 2         | 4                 |
| 3   | 3         | 9              | 5         | 8                 |
| 5   | 5         | 25             | 12        | 32                |
| 8   | 8         | 64             | 24        | 256               |
| 10  | 10        | 100            | 33        | 1,024             |
| 12  | 12        | 144            | 43        | 4,096             |
| 15  | 15        | 225            | 59        | 32,768            |
| 20  | 20        | 400            | 86        | 1,048,576         |

**Key takeaway**: 2^G doubles every time G increases by 1.  
At G = 20, 2^G is already over **1 million** — this is why DP caps at G = 15.

---

> **Conclusion**: Each algorithm has its strengths. DP gives the best results for small gem counts, D&C is the fastest for large gem counts, and Backtracking adapts well to easy grids. For the Inertia Game, a combination of all three provides the most robust solver across all possible grid configurations.
