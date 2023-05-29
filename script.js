document.querySelector(".control-buttons span").onclick = function () {
    let yourName = prompt(" What is your Name");

    if(yourName == null || yourName == ""){

        document.querySelector(".name span").innerHTML = 'unKnown' ;

    } else {
        document.querySelector(".name span").innerHTML = yourName ;
    }

    document.querySelector(".control-buttons").remove();
   
};


let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

//let orderRange = [...Array(blocks.length).keys()];

let orderRange = Array.from(Array(blocks.length).keys());

//console.log(orderRange);
shuffle(orderRange);
//console.log(orderRange);
//console.log(orderRange[0]);
//console.log(orderRange[1]);
//console.log(orderRange[2]);
//console.log(orderRange[3]);

//let testOrderRange = [1, 11, 13, 12, 18, 17, 19, 0, 2, 16, 5, 7, 9, 3, 10, 4, 6, 8, 14, 15]

//console.log(orderRange);
//add order css property
blocks.forEach((block, index) => {

    block.style.order = orderRange[index];

    block.addEventListener('click', function () {

     flipBlock(block);

    });

});
// flip block functon

function flipBlock(selectedBlock) {

 selectedBlock.classList.add('is-flipped');

 let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

if(allFlippedBlocks.length === 2) {
 
 //   console.log('Two Flipped Blocks Selected');

stopClicking();

checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

}

  

}

function stopClicking() {

  blocksContainer.classList.add('no-clicking');

  setTimeout(() => {

    blocksContainer.classList.remove('no-clicking');


  }, duration);

}

function checkMatchedBlocks(firstBlock, secondBlock) {

    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

     firstBlock.classList.remove('is-flipped');
     secondBlock.classList.remove('is-flipped');

     firstBlock.classList.add('has-match');
     secondBlock.classList.add('has-match');

     document.getElementById('success').play();

    }
    else{

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

        }, duration);

        document.getElementById('fail').play();
    }


}


//suffle function

function shuffle(array) {
    let current = array.length,
        temp,
        random;

    while (current > 0) {

        random = Math.floor(Math.random() * current);
        
        current--;
      
        temp = array[current];

        array[current] = array[random];

        array[random] = temp;
    }

    return array;
}

// Current Array [9, 2, 10, 4, 5, 6, 7, 3, 1, 8]

/*
  [1] Save Current Element in Stash
  [2] Current Element = Random Element
  [3] Random Element =  Get Element From Stash
  */
