let fruits = [
    {id: 1, title: 'Apples', price: 20, img: 'https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg'},
    {id: 2, title: 'Oranges', price: 30, img: 'https://i.pinimg.com/originals/50/91/3e/50913eeb04768a5b1fa9985c16704d96.jpg'},
    {id: 3, title: 'Mango', price: 40, img: 'https://cdn.myshoptet.com/usr/www.virunga.cz/user/shop/big/86_nejlepsi-mango-domaci-ovoce-farmarske-ovoce-farmari-exoticke-ovoce-tropicke-ovoce-z-ugandy-africa-raw-vegan-vegetariani-bio-organic-mango-shake-mango-smoothie-mango-koktejl-salat-s-mangem-mango-chutney-1.jpg?584aab3e'}
];

const toHTML = fruit => `
    <div class="col" >
        <div class="card">
            <img class ="card-img-top" style="height: 300px" src="${fruit.img}" alt="${fruit.title}">
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Price</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete</a>
            </div>
        </div>
    </div>
`;
function render() {
    const html = fruits.map(fruit => toHTML(fruit)).join('');
    document.querySelector('#fruits').innerHTML = html;
}

render();

const priceModal = $.modal(
    {
        title: 'Cost',
        closable: true, 
        width: '400px',
        footerButtons: [
            {text: 'Cancel ', type: 'secondary', handler() {
                 priceModal.close();
                }
            }
        ]
    }
);



 

document.addEventListener('click', event => {
    event.preventDefault(); 
    const btnType = event.target.dataset.btn;
    const id = +event.target.dataset.id;
    const fruit = fruits.find(f => f.id === id);
    if(btnType === 'price') {
        priceModal.setContent(`
        <p>Price ${fruit.title} is <strong>${fruit.price}</strong></p>
        `);
        console.log('price');
        priceModal.open();

        console.log(fruit);
    }else if (btnType === "remove") {
        $.confirm({
            title: "Are you shure?",
            content: `<p>You are deleting fruit: <strong>${fruit.title}$</strong></p>`
        }).then(()=> {
            fruits = fruits.filter(f => f.id !== id);
            render();
        }).catch(()=>{
            console.log('Cancel');
        });
        


    }
});


