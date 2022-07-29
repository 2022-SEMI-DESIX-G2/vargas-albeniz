(function() {
    const series = 10;
    const fiboArr =[];
    let n1 = 0, n2 = 1, nextTerm;
    for (let i = 1; i <= series; i++) {

        nextTerm = n1 + n2;
        n1 = n2;
        n2 = nextTerm;
        fiboArr.push(n1);
    }
    console.log(fiboArr);
 })();