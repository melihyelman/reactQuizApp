export function shuffleArray(array) {
    let tempArray = array;
    for (var i = tempArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = tempArray[i];
        tempArray[i] = tempArray[j];
        tempArray[j] = temp;
    }
    return tempArray
}