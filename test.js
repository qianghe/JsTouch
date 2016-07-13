function solution(number){
    var preThree = 2, preFive = 1;
    var totalSum = 0, curNumber = 3;

    while(curNumber <= number){
        totalSum += curNumber;

        if(preThree * 3 > preFive * 5){
            curNumber = preFive * 5;
            preFive++;
        }else if(preThree * 3 < preFive * 5){
            curNumber = preThree * 3;
            preThree++;
        }else{
            preThree++;
            preFive++;
        }
    }

    return totalSum;
}


console.log('total',solution(10));

