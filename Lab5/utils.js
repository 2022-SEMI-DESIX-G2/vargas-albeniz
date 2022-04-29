(() => {
    const Utils = {
        methods: {
            fibonacci: (n) => {
                const number = parseInt(n);

                const fiboArr =[];

                let n1 = 0, n2 = 1, nextTerm;
                for (let i = 1; i <= number; i++) {
          
                nextTerm = n1 + n2;
                n1 = n2;
                n2 = nextTerm;

                fiboArr.push(n1);
          
                }

                return fiboArr;
            },
        }
    }
    document.Utils = Utils;
})();