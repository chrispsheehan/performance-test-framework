const uuidLength = 24;
const uuidCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];


export function createUuid() {

    let result = [];
  
    for (let n = 0; n < uuidLength; n++) {
      
        result.push(uuidCharacters[Math.floor(Math.random() * 16)]);
    }
    return result.join('');
}