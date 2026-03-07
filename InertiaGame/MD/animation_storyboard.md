# 📹 Divide & Conquer Algorithm Animation Storyboard

## Complete Visual Guide for 30-Frame Animation

### Example Data
**6 Gems with coordinates:**
- G1 (2, 3) - Left side, middle height
- G2 (8, 2) - Right-center, low
- G3 (5, 7) - Center, high
- G4 (11, 5) - Far right, middle
- G5 (3, 8) - Left, very high
- G6 (9, 4) - Right-center, middle

---

## Frame 1: Title Slide
**Duration: 2 seconds**

```
┌────────────────────────────────────────┐
│                                        │
│   Divide & Conquer Algorithm          │
│   ═══════════════════════              │
│                                        │
│   Merge Sort Pattern Demonstration    │
│                                        │
│   Example: 6 Gems Pathfinding         │
│                                        │
└────────────────────────────────────────┘
```

**Design Notes:**
- Dark blue gradient background
- White text, centered
- Clean, professional look

---

## Frame 2: Initial Setup
**Duration: 3 seconds**

```
Grid (15 × 10):
    0  1  2  3  4  5  6  7  8  9 10 11 12 13 14
  ┌──────────────────────────────────────────────┐
0 │                                              │
1 │                                              │
2 │              🔷G1      🔷G2                  │
3 │                                🔷G4          │
4 │                    🔷G3     🔷G6             │
5 │                                              │
6 │                                              │
7 │         🔷G5                                 │
8 │                                              │
9 │                                              │
  └──────────────────────────────────────────────┘

Coordinates:
G1 (2, 2)  G2 (8, 2)  G3 (5, 4)
G4 (11, 3) G5 (3, 7)  G6 (9, 4)
```

**Design Notes:**
- Use blue diamond emojis or icons for gems
- Label each gem clearly
- Show coordinate system
- List coordinates in a box

---

## Frame 3: Calculate Ranges
**Duration: 3 seconds**

```
Step 1: Calculate X and Y Ranges
════════════════════════════════

Finding X Range:
┌─────────────────────────────┐
│ min(X) = 2  (from G1)       │
│ max(X) = 11 (from G4)       │
│                             │
│ X Range = 11 - 2 = 9       │
└─────────────────────────────┘

Finding Y Range:
┌─────────────────────────────┐
│ min(Y) = 2  (from G1, G2)   │
│ max(Y) = 7  (from G5)       │
│                             │
│ Y Range = 7 - 2 = 5         │
└─────────────────────────────┘
```

**Design Notes:**
- Highlight min/max positions on grid
- Use arrows to show ranges
- Green box for calculations

---

## Frame 4: Compare and Decide
**Duration: 2 seconds**

```
Step 2: Determine Split Axis
════════════════════════════

┌──────────────────────────────────┐
│  X Range (9) > Y Range (5)  ✓   │
└──────────────────────────────────┘

         ↓

Decision: Sort by X coordinate
```

**Design Notes:**
- Large comparison with green checkmark
- Arrow showing decision flow
- Bold text for decision

---

## Frame 5: Before Sorting
**Duration: 2 seconds**

```
Current Array (Unsorted):
┌────┬────┬────┬────┬────┬────┐
│ G1 │ G2 │ G3 │ G4 │ G5 │ G6 │
│2,2 │8,2 │5,4 │11,3│3,7 │9,4 │
└────┴────┴────┴────┴────┴────┘

X values: 2, 8, 5, 11, 3, 9
          ↑  ↑  ↑   ↑  ↑  ↑
        Not sorted by X!
```

**Design Notes:**
- Show array as boxes
- Highlight X values
- Red "not sorted" indicator

---

## Frame 6: Sorting Process (Timsort)
**Duration: 4 seconds**

```
Step 3: Sort by X Coordinate (Timsort)
═══════════════════════════════════════

Using Timsort Algorithm: O(n log n)

Comparing and arranging:
[2,2] < [8,2] ✓
[2,2] < [5,4] ✓
[3,7] < [5,4] ✓
[5,4] < [8,2] ✓
[8,2] < [9,4] ✓
[9,4] < [11,3] ✓
```

**Design Notes:**
- Show comparison arrows
- Use checkmarks for correct order
- Animated feel with arrows

---

## Frame 7: After Sorting
**Duration: 2 seconds**

```
Sorted Array (by X coordinate):
┌────┬────┬────┬────┬────┬────┐
│ G1 │ G5 │ G3 │ G2 │ G6 │ G4 │
│2,2 │3,7 │5,4 │8,2 │9,4 │11,3│
└────┴────┴────┴────┴────┴────┘

X values: 2, 3, 5, 8, 9, 11
          ↑  ↑  ↑  ↑  ↑  ↑
        Sorted! ✓
```

**Design Notes:**
- Same box format
- Green "sorted" indicator
- Highlight the X values in order

---

## Frame 8: Split in Half (Merge Sort Pattern)
**Duration: 3 seconds**

```
Step 4: Divide (Merge Sort Pattern)
════════════════════════════════════

mid = floor(6 / 2) = 3

┌────┬────┬────┐ │ ┌────┬────┬────┐
│ G1 │ G5 │ G3 │ │ │ G2 │ G6 │ G4 │
│2,2 │3,7 │5,4 │ │ │8,2 │9,4 │11,3│
└────┴────┴────┘ │ └────┴────┴────┘
  Group A        │    Group B
  (Blue)         │    (Orange)
```

**Design Notes:**
- Vertical split line in middle
- Color code: blue for A, orange for B
- Label each group clearly

---

## Frame 9: Recursion Tree Level 0
**Duration: 3 seconds**

```
Recursion Tree:
                [G1,G5,G3,G2,G6,G4]
                       ↓
            ┌──────────┴──────────┐
            ↓                     ↓
      [G1,G5,G3]            [G2,G6,G4]
       Group A               Group B
```

**Design Notes:**
- Tree diagram
- Root at top
- Branches to two groups
- Use different colors

---

## Frame 10: Process Group A - Calculate Ranges
**Duration: 3 seconds**

```
Focus on Group A: [G1, G5, G3]
══════════════════════════════

Coordinates:
G1 (2, 2)  G5 (3, 7)  G3 (5, 4)

Calculate ranges:
X Range = 5 - 2 = 3
Y Range = 7 - 2 = 5

Y Range (5) > X Range (3) ✓
→ Sort by Y coordinate
```

**Design Notes:**
- Blue highlighted box
- Show calculation
- Decision arrow

---

## Frame 11: Sort Group A by Y
**Duration: 3 seconds**

```
Sort Group A by Y:
Before: [G1(2,2), G5(3,7), G3(5,4)]
         Y:  2      7       4

After:  [G1(2,2), G3(5,4), G5(3,7)]
         Y:  2      4       7
                   ↑
              Sorted by Y! ✓
```

**Design Notes:**
- Show before/after
- Highlight Y values
- Sorting arrows

---

## Frame 12: Split Group A
**Duration: 2 seconds**

```
Split Group A:
mid = floor(3 / 2) = 1

┌────┐ │ ┌────┬────┐
│ G1 │ │ │ G3 │ G5 │
│2,2 │ │ │5,4 │3,7 │
└────┘ │ └────┴────┘
  A1   │     A2
```

**Design Notes:**
- Smaller split
- Light blue vs medium blue
- Clear labels

---

## Frame 13: Base Case A1
**Duration: 3 seconds**

```
Base Case Reached!
══════════════════

A1 = [G1(2,2)]
Only 1 gem → Use BFS

┌─────────────────────────┐
│ Start → G1              │
│ Path: [→, ↓]           │
│ Return: {               │
│   path: [→, ↓],        │
│   success: true         │
│ }                       │
└─────────────────────────┘
```

**Design Notes:**
- Green "Base Case" badge
- Show simple path
- Return value box

---

## Frame 14: Process A2
**Duration: 3 seconds**

```
Process A2: [G3, G5]
════════════════════

Calculate ranges:
X: 5 - 5 = 0
Y: 7 - 4 = 3

Y > X → Sort by Y
Already sorted! ✓

Split:
┌────┐ │ ┌────┐
│ G3 │ │ │ G5 │
│5,4 │ │ │3,7 │
└────┘ │ └────┘
```

**Design Notes:**
- Medium blue highlighting
- Quick check mark
- Already sorted note

---

## Frame 15: Base Cases for A2
**Duration: 3 seconds**

```
Base Cases (A2):
════════════════

G3(5,4):              G5(3,7):
Use BFS →             Use BFS →
Path: [→, ↑]         Path: [←, ↑, ↑]

Both return success! ✓
```

**Design Notes:**
- Side-by-side display
- Green badges
- Simple path arrows

---

## Frame 16: Merge A2
**Duration: 3 seconds**

```
Merge A2 Solutions:
═══════════════════

Path to G3: [→, ↑]
      +
Path to G5: [←, ↑, ↑]
      ↓
Combined: [→, ↑, ←, ↑, ↑]

Gems collected: {G3, G5} ✓
```

**Design Notes:**
- Plus sign between paths
- Arrow showing combination
- List of collected gems

---

## Frame 17: Complete Group A Merge
**Duration: 3 seconds**

```
Merge Group A:
══════════════

Path A1: [→, ↓]
      +
Path A2: [→, ↑, ←, ↑, ↑]
      ↓
Complete Path A: [→, ↓, →, ↑, ←, ↑, ↑]

All Group A gems collected: {G1, G3, G5} ✓
```

**Design Notes:**
- Blue theme
- Complete checkmark
- Full path display

---

## Frame 18: Switch to Group B
**Duration: 2 seconds**

```
Recursion Tree Progress:
        [G1,G5,G3,G2,G6,G4]
               ↓
        ┌──────┴──────┐
        ↓             ↓
  [G1,G5,G3] ✓   [G2,G6,G4] ←
   Group A         Group B
  (Complete)     (Processing)
```

**Design Notes:**
- Green checkmark on A
- Orange highlight on B
- Arrow showing focus

---

## Frame 19: Process Group B
**Duration: 3 seconds**

```
Focus on Group B: [G2, G6, G4]
══════════════════════════════

Coordinates:
G2 (8, 2)  G6 (9, 4)  G4 (11, 3)

X Range = 11 - 8 = 3
Y Range = 4 - 2 = 2

X Range (3) > Y Range (2) ✓
→ Sort by X coordinate
```

**Design Notes:**
- Orange theme
- Calculation boxes
- Decision arrow

---

## Frame 20: Group B Already Sorted
**Duration: 2 seconds**

```
Group B Sorting:
════════════════

Current: [G2(8,2), G6(9,4), G4(11,3)]
X values:   8       9       11

Already sorted by X! ✓
No need to sort again!
```

**Design Notes:**
- Green checkmark
- "Already sorted" emphasis
- X values highlighted

---

## Frame 21: Split Group B
**Duration: 2 seconds**

```
Split Group B:
mid = floor(3 / 2) = 1

┌────┐ │ ┌────┬────┐
│ G2 │ │ │ G6 │ G4 │
│8,2 │ │ │9,4 │11,3│
└────┘ │ └────┴────┘
  B1   │     B2
```

**Design Notes:**
- Orange coloring
- Light/medium orange split
- Clear labels

---

## Frame 22: Base Case B1
**Duration: 2 seconds**

```
Base Case!
══════════

B1 = [G2(8,2)]
Path: [→, →, ↓]

Return: success ✓
```

**Design Notes:**
- Green badge
- Simple display
- Quick frame

---

## Frame 23: Process B2
**Duration: 3 seconds**

```
Process B2: [G6, G4]
════════════════════

Split:
┌────┐ │ ┌────┐
│ G6 │ │ │ G4 │
│9,4 │ │ │11,3│
└────┘ │ └────┘

Base Cases:
G6: Path [→, ↑]
G4: Path [→, →, ↓]
```

**Design Notes:**
- Both base cases shown
- Paths displayed
- Green badges

---

## Frame 24: Merge B2
**Duration: 2 seconds**

```
Merge B2:
═════════

Path G6: [→, ↑]
       +
Path G4: [→, →, ↓]
       ↓
Combined: [→, ↑, →, →, ↓]
```

**Design Notes:**
- Merge operation
- Orange theme
- Path combination

---

## Frame 25: Complete Group B Merge
**Duration: 3 seconds**

```
Merge Group B:
══════════════

Path B1: [→, →, ↓]
      +
Path B2: [→, ↑, →, →, ↓]
      ↓
Complete Path B: [→, →, ↓, →, ↑, →, →, ↓]

All Group B gems: {G2, G6, G4} ✓
```

**Design Notes:**
- Orange theme
- Complete checkmark
- Full path

---

## Frame 26: Complete Recursion Tree
**Duration: 4 seconds**

```
Complete Recursion Tree:
════════════════════════

                [G1,G5,G3,G2,G6,G4] ✓
                       ↓
            ┌──────────┴──────────┐
            ↓                     ↓
      [G1,G5,G3] ✓          [G2,G6,G4] ✓
       Group A               Group B
            ├──────┐              ├──────┐
            ↓      ↓              ↓      ↓
        [G1] ✓  [G3,G5] ✓     [G2] ✓  [G6,G4] ✓
                    ↓                      ↓
                ┌───┴───┐              ┌───┴───┐
                ↓       ↓              ↓       ↓
           [G3] ✓  [G5] ✓         [G6] ✓  [G4] ✓

All base cases solved! ✓
```

**Design Notes:**
- Full tree visualization
- Green checkmarks everywhere
- Color-coded branches

---

## Frame 27: Final Merge - Try Both Orders
**Duration: 3 seconds**

```
Final Merge: Choose Best Path
══════════════════════════════

Option 1: A → B
Path A: 7 moves
Path B: 8 moves
Total: 15 moves

Option 2: B → A
Path B: 8 moves
Path A: 7 moves
Total: 15 moves

Same length! Choose Option 1 ✓
```

**Design Notes:**
- Comparison table
- Highlight chosen option
- Move counts shown

---

## Frame 28: Final Solution Path
**Duration: 4 seconds**

```
Complete Solution!
══════════════════

Full Path:
[→, ↓, →, ↑, ←, ↑, ↑, →, →, ↓, →, ↑, →, →, ↓]

Gems collected in order:
G1 → G3 → G5 → G2 → G6 → G4

Total moves: 15
All 6 gems collected! ✓
```

**Design Notes:**
- Success theme (green)
- Show complete path
- List gem collection order
- Trophy icon

---

## Frame 29: Path Visualization on Grid
**Duration: 5 seconds**

```
Path on Grid:
═════════════

    0  1  2  3  4  5  6  7  8  9 10 11 12
  ┌────────────────────────────────────────┐
0 │                                        │
1 │                                        │
2 │  START ──→ 💎1 ──── → → 💎2          │
3 │     ↓              ↑        ↓ → 💎4   │
4 │     ↓     💎3 ─────┘    💎6 ─┘        │
5 │     ↓      ↑                           │
6 │     ↓      ↑                           │
7 │  ← ←←─ 💎5                            │
8 │                                        │
  └────────────────────────────────────────┘

Arrows show movement path
Numbers show collection order
```

**Design Notes:**
- Animated path with arrows
- Numbered gems (collection order)
- Start and end marked

---

## Frame 30: Algorithm Summary
**Duration: 5 seconds**

```
Divide & Conquer Summary
════════════════════════

✓ Merge Sort Pattern
  - Recursive divide in half
  - Depth: O(log n)

✓ Timsort for Ordering
  - Sort by spatial coordinates
  - Time: O(n log n)

✓ Divide-Conquer-Merge
  - Split problem
  - Solve subproblems
  - Combine solutions

Total Complexity: O(G log G × b^d) + O(G²)

Success! All 6 gems collected ✓
```

**Design Notes:**
- Summary bullets
- Checkmarks
- Complexity notation
- Professional closing

---

## Creating the Animation

### Tools You Can Use:
1. **PowerPoint** - Create each frame as a slide, export as images
2. **Google Slides** - Same as PowerPoint, free
3. **Canva** - Professional design templates
4. **Figma** - Advanced design tool
5. **Draw.io** - For diagrams and trees

### Compiling into Video:
1. Export each frame as PNG/JPG
2. Use video editing software:
   - **Windows**: Photos app, Movie Maker
   - **Online**: Canva Video, Kapwing
   - **Advanced**: DaVinci Resolve (free)

### Frame Duration Recommendations:
- Title: 2-3 seconds
- Simple frames: 2-3 seconds
- Complex frames: 4-5 seconds  
- Summary: 5-6 seconds

### Total Video Length:
Approximately 90-120 seconds (1.5-2 minutes)

---

## Tips for Best Results:

1. **Consistent Design**
   - Use same colors throughout
   - Same font family
   - Same icon style

2. **Color Coding**
   - Blue for Group A
   - Orange for Group B
   - Green for success/base cases
   - Red for comparisons

3. **Clear Labels**
   - Large, readable text
   - High contrast
   - Bold key information

4. **Smooth Transitions**
   - Use fade effects
   - Maintain visual continuity
   - Keep layout consistent

Good luck with your presentation! 🚀
