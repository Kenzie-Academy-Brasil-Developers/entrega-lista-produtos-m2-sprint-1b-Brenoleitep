let secaoProdutos = document.querySelector(".secaoProdutos");
let carrinhoUl = document.querySelector(".carrinho__ul");
let campoBusca = document.querySelector(".campoBuscaPorNome");
let carrinhoTitulo = document.querySelector(".carrinho__titulo");

let arrayVazio = []


function listarProdutos(database, secao) {
  secao.innerHTML = "";

  const percorrerData = database.forEach((elem, index) => {
    let produto = elem;

    let cardProduto = criarCardProduto(produto, index);

    secao.append(cardProduto);
  });
}
listarProdutos(produtos, secaoProdutos);

function criarCardProduto(produto, index) {
  const { nome, preco, secao, img } = produto;

  let secaoProdutos = document.querySelector(".secaoProdutos");
  let tagLi = document.createElement("li");
  let tagImg = document.createElement("img");
  let tagTitulo = document.createElement("h3");
  let tagSpan = document.createElement("span");
  let tagPreco = document.createElement("p");
  let tagBtn = document.createElement("button");
  let tagDiv = document.createElement("div");

  tagImg.src = img;
  tagImg.alt = nome;
  tagTitulo.innerText = nome;
  tagPreco.innerHTML = `R$${preco}`;
  tagSpan.innerText = secao;
  tagBtn.innerText = "Comprar";
  tagBtn.id = index
  
  secaoProdutos.append(tagLi);
  tagLi.append(tagImg, tagTitulo, tagSpan, tagDiv);
  tagDiv.append(tagPreco, tagBtn);

  return tagLi;
}

secaoProdutos.addEventListener("click", adicionarProduto)


function listarCarrinho (produtos) {
  carrinhoUl.innerHTML = ""

  for (let i = 0; i < produtos.length; i++) {
    let produto = produtos[i]
    
    let cardFeito = criarCard(produto, i)

    carrinhoUl.append(cardFeito)
  }
}

function criarCard (produto, index) {
  const {nome, preco, secao, img, id} = produto

  let tagLi = document.createElement("li")
  let tagImg = document.createElement("img")
  let tagNome = document.createElement("h2")
  let tagPreco = document.createElement("p")
  let tagSecao = document.createElement("span")
  let tagRemocao = document.createElement("button")

  tagImg.src = img
  tagImg.alt = nome
  tagNome.innerText = nome
  tagPreco.innerHTML = `<strong>R$${preco}</strong>`
  tagSecao.innerText = secao
  tagRemocao.innerText = "X"
  
  tagRemocao.id = index
    
  tagLi.append(tagImg, tagNome, tagPreco, tagRemocao)
  return tagLi
}

function adicionarProduto (event) {
  let btnComprar = event.target

  if (btnComprar.tagName === 'BUTTON') {
    
    let idProduto = btnComprar.id

    let produto = produtos.find((produto) => {
      if (produto.id == idProduto) {
        return produto
      }
    })
  adicionarCarrinho (produto)
  }
}

function adicionarCarrinho(produto) {
  if (produto !== undefined) {
    arrayVazio.push(produto) 
    listarCarrinho (arrayVazio)
    carrinhoInfo(arrayVazio)
    
  }
}


function removerItens (event) {

  let btnRemover = event.target

  if (btnRemover.tagName === 'BUTTON') {

    let index = btnRemover.id
console.log(btnRemover)
    carrinhoUl.innerHTML = ""

    arrayVazio.splice(index, 1)
    listarCarrinho(arrayVazio)
    carrinhoInfo(arrayVazio)
  }

}
carrinhoUl.addEventListener("click", removerItens)

let carrinhoVazio = document.createElement("h1")
let divVazio = document.createElement("div")
let imgFodas = document.createElement("img")

  imgFodas.src = "./src/img/carrinhoVazio.png"

  carrinhoVazio.innerHTML = "Carrinho vazio :( <br> Adicione itens."

  divVazio.append(imgFodas, carrinhoVazio)

  if (arrayVazio.length == 0) {
    carrinhoUl.appendChild(divVazio)
  }

function carrinhoInfo(arr) {
  let fodas = document.querySelector(".carrinho__titulo--Info")
  let qtdProdutos = document.querySelector(".qtdProdutos")
  let precoTotal = document.querySelector(".precoTotal")


  let length = arr.length
  let preco = somar(arrayVazio)

  qtdProdutos.innerHTML = `<strong>QTD Produtos:</strong> ${length}`
  precoTotal.innerHTML = `<strong>Preço Total:</strong> R$${preco}`

  let carrinhoVazio = document.createElement("h1")

  carrinhoVazio.innerHTML = "Carrinho vazio :( <br> Adicione itens."

  if (arrayVazio.length == 0) {
    carrinhoUl.appendChild(divVazio)
  }
}

function somar(arr) {
  let valorTotal = 0
  for (let i = 0; i < arr.length; i++) {
    valorTotal += arr[i].preco
  }

  return valorTotal
}


campoBusca.addEventListener("keyup", buscarProduto);

function buscarProduto() {
  let pesquisaUsuario = campoBusca.value;

  let buscaFunction = buscarItem(produtos, pesquisaUsuario);
  listarProdutos(buscaFunction, secaoProdutos);
}

function buscarItem(data, pesquisaUsuario) {
  let newArray = [];

  let filtroData = data.forEach((elem) => {
    let pesquisa = pesquisaUsuario.toLowerCase();
    let nomeProduto = elem.nome.toLowerCase();
    let departamento = elem.secao.toLowerCase();

    if (nomeProduto.includes(pesquisa) || departamento.includes(pesquisa)) {
      newArray.push(elem);
    }
  });

  return newArray;
}

let btnHorti = document.querySelector(".produtosHorti");

btnHorti.addEventListener("click", function () {
  interceptarHorti(produtos, "Hortifruti");
});

precoTotalProducts(produtos);

function interceptarHorti(database, categoria) {
  secaoProdutos.innerHTML = "";

  let newArray = [];

  const filtrar = database.filter((elem) => {
    let filtro = elem.secao.includes(categoria);
    if (filtro) {
      newArray.push(elem);
    }
  });
  listarProdutos(newArray, secaoProdutos);
  precoHorti(produtos);
}

let btnAllProducts = document.querySelector(".todosProdutos");

btnAllProducts.addEventListener("click", function () {
  interceptarTodos(produtos);
});

function interceptarTodos(database) {
  secaoProdutos.innerHTML = "";

  let newArray = [];

  const filtrar = database.filter((elem) => {
    newArray.push(elem);
  });
  listarProdutos(newArray, secaoProdutos);
  precoTotalProducts(produtos);
}

let btnPani = document.querySelector(".produtosPani");

btnPani.addEventListener("click", function () {
  interceptarPani(produtos, "Panificadora");
});

function interceptarPani(database, categoria) {
  secaoProdutos.innerHTML = "";

  let newArray = [];

  const filtrar = database.filter((elem) => {
    let filtro = elem.secao.includes(categoria);
    if (filtro) {
      newArray.push(elem);
    }
  });
  listarProdutos(newArray, secaoProdutos);
  precoPani(produtos);
}

let btnLati = document.querySelector(".produtosLati");

btnLati.addEventListener("click", function () {
  interceptarLati(produtos, "Laticínio");
});

function interceptarLati(database, categoria) {
  secaoProdutos.innerHTML = "";

  let newArray = [];

  const filtrar = database.filter((elem) => {
    let filtro = elem.secao.includes(categoria);
    if (filtro) {
      newArray.push(elem);
    }
  });
  listarProdutos(newArray, secaoProdutos);
  precoLati(produtos);
}

function precoTotalProducts(database) {
  let spanPreco = document.querySelector(".spanPreco");

  const precoTotal = database.reduce((valorAntigo, valorAtual) => {
    const soma = { preco: 0 };

    soma.preco = valorAntigo.preco + valorAtual.preco;

    return soma;
  });

  spanPreco.innerText = `R$${precoTotal.preco}`;
  return spanPreco;
}

//Filtrar o que for hortifruti, jogar para dentro de um array
//Nesse novo array dar um reduce

function precoHorti(database) {
  let spanPreco = document.querySelector(".spanPreco");
  let newArray = [];

  const precoHortifruti = database.forEach((elem) => {
    if (elem.secao == "Hortifruti") {
      newArray.push(elem.preco);
    }
    return newArray.preco;
  });

  const precoFormatado = newArray.reduce((acc, act) => {
    return acc + act;
  });

  spanPreco.innerText = `R$${precoFormatado}`;
  return spanPreco;
}

function precoPani(database) {
  let spanPreco = document.querySelector(".spanPreco");
  let newArray = [];

  const precoPanificadora = database.forEach((elem) => {
    if (elem.secao == "Panificadora") {
      newArray.push(elem.preco);
    }
    return newArray.preco;
  });

  const precoFormatado = newArray.reduce((acc, act) => {
    return acc + act;
  });

  spanPreco.innerText = `R$${precoFormatado}`;
  return spanPreco;
}

function precoLati(database) {
  let spanPreco = document.querySelector(".spanPreco");
  let newArray = [];

  const precoLaticinios = database.forEach((elem) => {
    if (elem.secao == "Laticínio") {
      newArray.push(elem.preco);
    }
    return newArray.preco;
  });

  const precoFormatado = newArray.reduce((acc, act) => {
    return acc + act;
  });

  spanPreco.innerText = `R$${precoFormatado}`;
  return spanPreco;
}
