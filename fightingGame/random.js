function random(arr){
    const ranNum = Math.floor(Math.random() * arr.length);
    return ranNum;
}

module.exports = random;