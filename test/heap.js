// Purpose is to create every permutation from the elements in the array
// We can do this by using Heap's algorithm
var start = [1, 2, 3];

// Get the permutations
generate(start.length, start);

// Generate the permutation for a given n (amount of elements) and a given array
function generate(n, arr) {
  // If only 1 element, just output the array
  if (n === 1) {
    console.log(arr);
    return;
  }
  
  for (var i = 0; i < n; i+= 1) {
    generate(n - 1, arr);
    
    // If n is even
    if (n % 2 === 0) {
      swap(arr, i, n - 1);
    } else {
      swap(arr, 0, n - 1);
    }
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
