((Utils) => {
    const App = {
        htmlElements: {
            form: document.querySelector('#fibonacci'),
            input: document.querySelector('#inputField'),
            response: document.querySelector('#response')
        },
        init: () => {
            App.htmlElements.form.addEventListener('submit', App.handlers.onFormSubmit);
            App.htmlElements.response.addEventListener('click', App.handlers.onCardClick);
        },
        utils: {
            ...Utils.methods,
        },
        templates: {
            card: (n) => {
                return `<div class="card"><a class="card_exit"><i class="fa-solid fa-circle-minus"></i></a><p>${n}</p></div>`;
            }
        },
        handlers: {
            onCardClick: (e) => {
                if(e.target.className === 'card_exit') {
                    e.target.remove();
                }
            },
            onFormSubmit: (e) => {
                e.preventDefault();

                App.htmlElements.response.innerHTML = '';

                const n = App.htmlElements.input.value;
                App.utils.fibonacci(n).forEach(value => {
                    App.htmlElements.response.innerHTML += App.templates.card(value);
                });
            }
        }
    };
    App.init();
})(document.Utils);