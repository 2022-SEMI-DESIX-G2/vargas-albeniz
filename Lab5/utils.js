(() => {
    const Utils = {
        methods: {
            fibonacci: (n) => {
                const arr = [];
                for(let i = 1; i <= n; i++){
                    arr.push(i);
                }
                return arr;
            },
        }
    }
    document.Utils = Utils;
})();