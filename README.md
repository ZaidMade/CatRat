# CatRat
A game I'm making for no reason.

### Description
*A turn and grid based maze game where you must feed the rat to the cat by getting them both on the same grid cell. The grid is 16x12 cells large. You move the cat using WASD controls in rogue-like turn based movement and the rat moves in the opposite direction of the cat. In some levels there will be a devil which will seek out the closest animal (the cat or the rat) with a preference for the cat since it is larger, moving 1 cell per-turn. If the devil touches one of them, it will kill them. If either the cat or the rat dies, the level will be failed.*

### Mechanics
* __WALL__: Stops the cat and the rat from moving into the same cell as it.
* __KILL__: Kills the cat or the rat if one of them are in the same cell as it.
* __PUSH__: A wall entity that can be pushed by the cat but not by the rat.
* __SWAP__: A cell which swaps the positions of the cat and the rat when touched by one of them.
* __PORTAL__: Two linked entities that either the cat or the rat will warp to when touched.
* __GATE&KEY__: A wall cell that is deleted when a linked key entity is brought to it.
