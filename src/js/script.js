let secaoProdutos = document.querySelector(".secaoProdutos")

function listarProdutos(database, secao) {

    secao.innerHTML = ""

    const percorrerData = database.forEach((elem) => {
        let produto = elem

        let cardProduto = criarCardProduto(produto)

        secao.append(cardProduto)
    })
}
listarProdutos(produtos, secaoProdutos)

function criarCardProduto(produto) {
    let nome = produto.nome
    let preco = produto.preco
    let secao = produto.secao
    let img = produto.img


    let secaoProdutos = document.querySelector(".secaoProdutos")
    let tagLi = document.createElement("li")
    let tagImg = document.createElement("img")
    let tagTitulo = document.createElement("h3")
    let tagSpan = document.createElement("span")
    let tagPreco = document.createElement("p")

    tagImg.src = img
    tagImg.alt = nome
    tagTitulo.innerText = nome
    tagPreco.innerHTML = `R$${preco}`
    tagSpan.innerText = secao

    secaoProdutos.append(tagLi)
    tagLi.append(tagImg, tagTitulo, tagSpan, tagPreco)

    return tagLi
}

let campoBusca = document.querySelector(".campoBuscaPorNome");

campoBusca.addEventListener("keyup", buscarProduto)

function buscarProduto() {

    let pesquisaUsuario = campoBusca.value

    let buscaFunction = buscarItem(produtos, pesquisaUsuario)
    listarProdutos(buscaFunction, secaoProdutos)
}


function buscarItem(data, pesquisaUsuario) {
    let newArray = []

    let filtroData = data.forEach((elem) => {
        let pesquisa = pesquisaUsuario.toLowerCase()
        let nomeProduto = elem.nome.toLowerCase()
        let departamento = elem.secao.toLowerCase()

        if (nomeProduto.includes(pesquisa) || departamento.includes(pesquisa)) {
            newArray.push(elem)
        }

    })

    return newArray
}


let btnHorti = document.querySelector(".produtosHorti")

btnHorti.addEventListener("click", function () { interceptarHorti(produtos, "Hortifruti")})

precoTotalProducts(produtos)

function interceptarHorti(database, categoria) {
    secaoProdutos.innerHTML = ""

    let newArray = []

    const filtrar = database.filter((elem) => {
        let filtro = elem.secao.includes(categoria)
        if (filtro) {
            newArray.push(elem)
        }

    })
    listarProdutos(newArray, secaoProdutos)
    precoHorti(produtos)
}

let btnAllProducts = document.querySelector(".todosProdutos")

btnAllProducts.addEventListener("click", function () { interceptarTodos(produtos)})

function interceptarTodos(database) {
    secaoProdutos.innerHTML = ""

    let newArray = []

    const filtrar = database.filter((elem) => {
        newArray.push(elem)

    })
    listarProdutos(newArray, secaoProdutos)
    precoTotalProducts (produtos)
}

let btnPani = document.querySelector(".produtosPani")

btnPani.addEventListener("click", function () { interceptarPani(produtos, "Panificadora")})

function interceptarPani(database, categoria) {
    secaoProdutos.innerHTML = ""

    let newArray = []

    const filtrar = database.filter((elem) => {
        let filtro = elem.secao.includes(categoria)
        if (filtro) {
            newArray.push(elem)
        }

    })
    listarProdutos(newArray, secaoProdutos)
    precoPani (produtos)
}

let btnLati = document.querySelector(".produtosLati")

btnLati.addEventListener("click", function () { interceptarLati(produtos, "Laticínio") })

function interceptarLati(database, categoria) {
    secaoProdutos.innerHTML = ""

    let newArray = []

    const filtrar = database.filter((elem) => {
        let filtro = elem.secao.includes(categoria)
        if (filtro) {
            newArray.push(elem)
        }

    })
    listarProdutos(newArray, secaoProdutos)
    precoLati (produtos)
}

function precoTotalProducts(database) {
    let spanPreco = document.querySelector(".spanPreco")

    const precoTotal = database.reduce((valorAntigo, valorAtual) => {
        const soma = { preco: 0 }

        soma.preco = valorAntigo.preco + valorAtual.preco

        return soma    
    })

    spanPreco.innerText = `R$${precoTotal.preco}`
    return spanPreco
}


//Filtrar o que for hortifruti, jogar para dentro de um array 
//Nesse novo array dar um reduce

function precoHorti(database) {
    let spanPreco = document.querySelector(".spanPreco")
    let newArray = []

    const precoHortifruti = database.forEach((elem) => {
        if (elem.secao == "Hortifruti") {
            newArray.push(elem.preco)
            
        }
        return newArray.preco
    })

    const precoFormatado = newArray.reduce((acc, act) => {

        return acc + act
    })

    spanPreco.innerText = `R$${precoFormatado}`
    return spanPreco
}


function precoPani(database) {
    let spanPreco = document.querySelector(".spanPreco")
    let newArray = []

    const precoPanificadora = database.forEach((elem) => {
        if (elem.secao == "Panificadora") {
            newArray.push(elem.preco)
            
        }
        return newArray.preco
    })

    const precoFormatado = newArray.reduce((acc, act) => {

        return acc + act
    })

    spanPreco.innerText = `R$${precoFormatado}`
    return spanPreco
}


function precoLati(database) {
    let spanPreco = document.querySelector(".spanPreco")
    let newArray = []

    const precoLaticinios = database.forEach((elem) => {
        if (elem.secao == "Laticínio") {
            newArray.push(elem.preco)
            
        }
        return newArray.preco
    })

    const precoFormatado = newArray.reduce((acc, act) => {

        return acc + act
    })

    spanPreco.innerText = `R$${precoFormatado}`
    return spanPreco
}



