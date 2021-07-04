<div align="center">
  <img src="https://github.com/ZaidMade/CatRat/raw/master/logo.gif" alt="CatRat" title="CatRat">
</div>

*A turn and grid based maze game where you play as Captain Squeakers, a rodent space pirate traveling the galaxy to steal as much cheese as they can. The board is a grid 16x12 cells in size. You move Captain Squeakers using WASD controls in rogue-like turn based movement and the cat moves in the opposite direction. If Captain Squeakers and the cat touch, the cat will eat the Captain. Captain Squeakers is a pacifist and will not fight back. If Captain Squeakers dies, the level will be failed.*

## To Do
### Mechanics 🛠
* [X] __WALL__: Stops the cat and the rat from moving into the same cell as it.
* [X] __KILL__: Kills the cat or the rat if one of them are in the same cell as it.
* [X] __PUSH__: A wall entity that can be pushed by the cat but not by the rat.
* [ ] __GATE&KEY__: A wall cell that is deleted when a linked key entity is brought to it.
* [X] __MOUSEHOLE__: A wall block with a small hole in it the rat can pass through but the cat cannot.
* [X] __RATTRAP__: A trap which only kills the rat, not the cat. Can be set off by the cat to destroy it.
* [X] __CHEESE__: Actual cheese blocks to collect.
* [X] __SHIP__: The goal that Captain Squeakers will return to after stealing cheese.

### Screens 📺
* [X] __Level__: The actual game. (Pause menu should be included here. Keep it to just exiting the level.)
* [X] __Logo__: My logo just to plug my own website because I need that __CLOUT__.
* [X] __Title__: The title screen. Just to be cute and so you know what game you're playing.
* [ ] __Level Select__: Allows you to select a level to play. Shows you what levels are locked and passed and what grade you got on the passed levels.
* [X] __Passed__: A cute screen for when you pass a level and what grade you got on it.
* [X] __Failed__: Another cute screen for when you failed a level encouraging the player to try again.
* [ ] __Winner__: A third cute screen for when you've won the game.
* [X] __Editor__: A place to make levels for the game.

### Other
* [ ] __Sound__: Add sound effects.
* [ ] __Saving(???)__: Some way to save progress & share created levels.

## Known Bugs 🐞
* Screen wrapping does not work with mouse hole blocks. Position invalid for move. (Player.js:42->132)

## Dependencies
* JQuery 3.5.1
