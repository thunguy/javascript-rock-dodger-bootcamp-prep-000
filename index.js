const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  
  // the rock is 20px wide
  // the DODGER is 40px wide
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    const isCollision =
    (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
    (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
    (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
    
    return isCollision;
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = top
   
  GAME.appendChild(rock) // append rock to GAME 
 
  // this function moves the rock 2 pixels at a time
  
  function moveRock() {
    rock.style.top = `${top += 2}px`
    
    // if a rock collides with the DODGER, call endGame()
    // otherwise, if the rock hasn't reached the bottom of the GAME, move it again.
    // if the rock *has* reached the bottom of the GAME, remove the rock from the DOM
    
    if (checkCollision(rock)) { 
      return endGame() 
    }
    else if (top < 360) {
      window.requestAnimationFrame(moveRock)
    }
    else {
      rock.remove();
    }
  }

  // kick off the animation of the rock around here
  // add the rock to ROCKS to remove all rocks when there's a collision
  // finally, return the rock element created
  
  window.requestAnimationFrame(moveRock)

  ROCKS.push(rock)
  
  return rock
}

// end the game by clearing `gameInterval`,
// removing all ROCKS from the DOM,
// and removing the `moveDodger` event listener.
// finally, alert "YOU LOSE!" to the player.

function endGame() {
  clearInterval(gameInterval);
  document.removeEventListener('keydown', moveDodger); 
  alert('YOU LOSE!');
}

function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
  if (e.which === LEFT_ARROW) {
     moveDodgerLeft()
  }
  else if (e.which === RIGHT_ARROW) {
    moveDodgerRight()
  }
}

function moveDodgerLeft() {
  window.requestAnimationFrame(function() {
    var leftNumbers = dodger.style.left.replace('px', '')
    var left = parseInt(leftNumbers, 10)
    
    if (left > 0) {
    dodger.style.left = `${left - 4}px` 
    }
  })
}

function moveDodgerRight() {
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  const method = 'moveDodgerRight';
  console.log(method);
  var leftNumbers = dodger.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)
 
  if (left < 360) {
    console.log(method, 'left', dodger.style.left);
    dodger.style.left = `${left + 4}px`
  }
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  document.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}