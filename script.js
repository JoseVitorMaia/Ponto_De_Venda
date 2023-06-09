const inventario = {
    "001":{
        "nome": "Teclado Logitech",
        "valor": "120.00"
    },

    "002":{
        "nome": "Mouse Logitech",
        "valor": "80.00"
    },

    "003":{
        "nome": "Mousepad Warrior",
        "valor": "40.00"
    },

    "004":{
        "nome": "Monitor Lg Ultragear 27''",
        "valor": "1200.00"
    },

    "005":{
        "nome": "Caixa de Som",
        "valor": "40.00"
    },

    "006":{
        "nome": "Headset Corsair Raptor HS30",
        "valor": "220.00"
    },

    "007":{
        "nome": "Gabinete Warrior",
        "valor": "180.00"
    }
}


/*
function mostrarVenda() {
    let mostrarVenda = document.querySelector('#venda')
    if (mostrarVenda.style.display == "none") {
        mostrarVenda.style.display = "block"
    } else {
        mostrarVenda.style.display = "none"
    }
}


function mostrarProdutos() {
    let listaProdutos = document.querySelector('#listaProdutos')
    if (listaProdutos.style.display == "none") {
        listaProdutos.style.display = "block"
    } else {
        listaProdutos.style.display = "none"
    }
}

*/

function selecionarProduto() {
    let produtos = document.querySelector('#produtos')
    console.log(`Escolheu o item ${inventario[produtos.value].nome} com o valor de ${inventario[produtos.value].valor} `)
}


let soma = 0;
let id = 0;
let carrinho = [];
let resumo = [];

let data = new Date()
let hora = data.getHours()
let minutos = data.getMinutes()
let dia = String(data.getDate()).padStart(2 ,'0')
let mes = String(data.getMonth() + 1).padStart(2,'0')
let ano = data.getFullYear()
let dataAtual = `${dia}/${mes}/${ano} às ${hora}:${minutos}`


function addCarrinho() {
    //Mostrar itens que estão sendo comprando
    let compra = document.querySelector('#compra')
    let produtos = document.querySelector('#produtos')

    let item = document.createElement('option')
    item.setAttribute("value",id)
    item.setAttribute("ondblclick","deletarItem(this.value)")
    item.innerHTML = (`- Item : ${inventario[produtos.value].nome} - Valor: R$${inventario[produtos.value].valor} `)

    
    let itemValor = document.createElement('option')
    itemValor.setAttribute("value",inventario[produtos.value].valor)
    itemValor.setAttribute("ondblclick","deletarItem(this.value)")
    itemValor.innerHTML = inventario[produtos.value].valor

    resumo.push(itemValor)

    carrinho.push(item)
    compra.appendChild(carrinho[id])


    id++;


    //Atualizar valor total no rodapé
    valorDaCompra()

}


function valorDaCompra() {
    //Mostrar valor total no rodapé
    let totalCompra = document.querySelector('.totalCompra')
    let total = 0

    for (i = 0; i < resumo.length; i++){
        total += Number(resumo[i].value)
    }

    totalCompra.innerText = (`Resumo: R$` + total)
    totalRecibo.innerText = (`Total: R$` + total)

    soma = total
}

function deletarItem(x) {
    carrinho[x].remove()
    resumo.splice(0,1)
    
    //Atualizar valor total no rodapé
    valorDaCompra()
    
}


function gerarRecibo() {
    let telaFinalizarCompra = document.querySelector('#telaFinalizarCompra')
    let telaReciboCompra = document.querySelector('#telaReciboCompra')
    telaFinalizarCompra.style.display = "block"
    venda.style.display = 'none'
    //containerLateral.style.display = 'none'
    console.log(resumo)
    console.log(carrinho)

    for (i = 0; i < compra.length; i++) {
        telaReciboCompra.innerHTML += compra[i].innerHTML + "\n"
    }

    
}

function voltarCarrinho() {
    telaFinalizarCompra.style.display = "none"
    venda.style.display = 'block'
    //containerLateral.style.display = 'grid'
    telaReciboCompra.innerHTML = ''
}

function finalizarRecibo() {
    let telaReciboCompra = document.querySelector('#telaReciboCompra')

    var doc = new jsPDF()
    doc.text("Obrigado(a) pela preferência !!\n" + "--------------------------------------\n" + "Resumo da sua compra: \n" + telaReciboCompra.innerHTML + "--------------------------------------\n" + `Total a pagar: R$` + soma + `\nCompra realizada ${dataAtual}`,20,30)
    doc.save('Compra.pdf')
    console.log(telaReciboCompra.innerHTML)
}