async function getProdutos() {
  const tokenDecode = parseJWT(sessionStorage.getItem("token"));

  const produtos = await fetchApi(
    null,
    "GET",
    `${link_api}/pegarProdutos/${tokenDecode.id_empresa}`
  );

  if (!produtos.error && produtos.data.length !== 0) {
    document.getElementById("options-cards").innerHTML = "";
    const div = document.createElement("div");
    div.id = "cards";
    div.className = "_div";
    document.getElementById("options-cards").appendChild(div);

    produtos.data.forEach((data) => {
      render("components/cards-produto.html", data, "cards");
    });

    document.getElementById("options-cards").innerHTML += `
            <div class="btn_insert" onclick="openFormNewProduct()">
                <i class="bi bi-plus-lg"></i>
            </div>
        `;
  }
}

function NotFoundImg(tipo, img) {
  const tiposImgs = {
    pizza: "./img/Pizza_padrao.svg",
    hamburguer: "./img/Hambúrguer_padrao.svg",
    bebida: "./img/Bebida_padrao.svg",
    default: "./img/Pizza_padrao.svg",
  };

  img.src = tiposImgs[tipo] || tiposImgs.default;
}

async function newProduct(product) {
  const newProduct = await fetchApi(product,"POST", `${link_api}/inseriProdutos`);

  if (newProduct.error) {
    console.error(newProduct.message);
    return;
  }

  console.log(newProduct.data);
}

function openFormNewProduct(){
  document.getElementById("other").innerHTML = "";
  render("components/new-product.html", [], "other");
}