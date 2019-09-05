
export default function checkCollision(game, mario) {

  const isMarioFetchFood = checkElementsCollision(game.Food,mario);
  const isPoisionCollided = game.poisions.find(element=>{
        return checkElementsCollision(element,mario);
  }) ;
  return {
    mashroom: isMarioFetchFood,
    poision: Boolean(isPoisionCollided),
  };
}

function checkElementsCollision(element1,element2){

  const rect1 = { x: element1.position.x, y: element1.position.y, width: element1.myWidth, height: element1.myWidth }
  const rect2 = { x: element2.position.x, y: element2.position.y, width: element2.myWidth, height: element2.myWidth }

  if (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y) {
    // collision detected!
    return true;
  }
  return false;
}
