let arr = [2,5,1,3,4];
// let arr = [12,33,3,44,100];
// let arr = [0,1];

function arrSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }}}
  return arr
}

console.log(arrSort(arr))
