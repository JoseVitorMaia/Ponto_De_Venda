const produtos = [
    {
        id:0,
        desc: "Mouse",
        valor: 30
    },
    {
        id:1,
        desc: "Teclado",
        valor: 50
    },

    {
        id:2,
        desc: "Monitor",
        valor: 1200
    },

    {
        id:3,
        desc: "Gabinete",
        valor: 300
    },

    {
        id:4,
        desc: "Headset",
        valor: 450
    },

    {
        id:5,
        desc: "Cadeira Gamer",
        valor: 800
    },

    {
        id:6,
        desc: "Xbox Series X",
        valor: 4300
    },

    {
        id:7,
        desc: "Playstation 5",
        valor: 4200
    }
]


const itensVenda = document.querySelector('#itensVenda')
const addCarrinho = document.querySelector('#addCarrinho')
const carrinho = document.querySelector('#carrinho')
const totalCompra = document.querySelector('#totalCompra')
const finalizarCompra = document.querySelector('#finalizarCompra')

let total = 0




window.addEventListener("DOMContentLoaded",function(){
    for (i = 0; i < produtos.length; i++){
        const item = document.createElement('option')
        item.innerText = produtos[i].desc + " R$ " + produtos[i].valor
        item.value = produtos[i].valor

        itensVenda.appendChild(item)
    }
    
})


addCarrinho.addEventListener('click',function(){
    itemCarrinho = document.createElement('option')
    itemCarrinho.value = itensVenda.options[itensVenda.selectedIndex].value
    itemCarrinho.setAttribute("class", "item");
    itemCarrinho.setAttribute("ondblclick","excluir()")
    itemCarrinho.innerText = itensVenda.options[itensVenda.selectedIndex].text

    carrinho.appendChild(itemCarrinho)

    somaCompra()
})



function somaCompra() { 
    total += Number(itemCarrinho.value)
    totalCompra.innerText = `Total: R$ ${total}`
}


function excluir() {
    const e = carrinho.selectedIndex
    total -= Number(carrinho[e].value)
    totalCompra.innerText = `Total: R$ ${total}`
    carrinho[e].remove()
    
}

finalizarCompra.addEventListener('click',function(){
    let janelaCarrinho = document.querySelector('#janelaCarrinho')
    let rodape = document.querySelector('#rodape')


    var doc = new jsPDF()
    doc.text(`Obrigado pela preferência! \n - - - - - - - - - - - - - - - - - - -\nSegue a lista com seus itens:\n \n${carrinho.innerText}\n - - - - - - - - - - - - - - - - - - -\n Total da sua compra: R$${total}`,20,30)

    let modal = document.createElement('div')
    modal.setAttribute('class','modal')

    let btn_confirm = document.createElement('button')
    btn_confirm.innerText = "Obrigado(a) pela compra!"
    btn_confirm.setAttribute("class","btn_confirm")
    btn_confirm.setAttribute("onclick","finalizarRefresh()")
    modal.appendChild(btn_confirm)

    janelaCarrinho.appendChild(modal)
    rodape.remove()
    doc.save('Compra.pdf')
})


function finalizarRefresh() {
    window.location.reload(true);
}