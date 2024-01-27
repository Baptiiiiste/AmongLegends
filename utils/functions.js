module.exports = {

    shuffle(array){
        const newArray = array.slice(); // Create a shallow copy to avoid modifying the original array
        for (let i = newArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    
    ,

    getRandomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    ,

    getRandomFloat(min, max){
      return (Math.random() * (max - min)) + min;
  }

}