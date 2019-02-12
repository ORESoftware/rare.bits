// Purpose is to create every permutation from the elements in the array
// We can do this by using Heap's algorithm
// var start = [1, 2, 3];

var start = [0, 0, 0];

let count = 0;

// Get the permutations
generate( 0, start);

// Generate the permutation for a given n (amount of elements) and a given array
function generate( n, arr) {
  
  if(n > 2){
    return;
  }
  
  for (let j = 0; j < 3; j++) {
    
    const sliced = arr.slice(0);
    arr[n] = j;
    console.log(arr);
    // console.log(arr);
    generate( n + 1, sliced);
    
  }
  
}

// function swap(arr, idxA, idxB) {
//   var tmp = arr[idxA];
//   arr[idxA] = arr[idxB];
//   arr[idxB] = tmp;
// }

function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]];
}
