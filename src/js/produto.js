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

async function getTypesProducts(id) {
  const types = await fetchApi([], "POST", `${link_api}/getTypes/${id}`);

  if(types.error){
    console.error(types.message);
    return;
  }
  return types.data;
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

async function newProduct(form_product) {
  const form = form_product.form;
  const productDate = collectionDatesForm(form);
  const newProduct = await fetchApi(productDate, "POST", `${link_api}/inseriProdutos`);

  if (newProduct.error) {
    console.error(newProduct.message);
    return;
  }

  exit();
  getProdutos();
}

async function updateProduct(form_product) {
  const form = form_product.form;
  const productDate = collectionDatesForm(form);

  const newProduct = await fetchApi(productDate, "PUT", `${link_api}/updateProdutos`);

  if (newProduct.error) {
    console.error(newProduct.message);
    return;
  }

  exit();
  getProdutos();
}

async function openFormNewProduct(){
  let options = "";
  const tokenDecode = parseJWT(sessionStorage.getItem("token"));
  const types = await getTypesProducts(tokenDecode.id_empresa);

  types.forEach(e => {
    options += `<option value="${e.tipo}">${e.tipo}</option>`;
  });

  document.getElementById("other").innerHTML = "";
  render("components/new-product.html", {"options":options}, "other");
}

async function openFormUpdateProduct(id){
  const product = await fetchApi(
    null,
    "GET",
    `${link_api}/pegarProduto/unico/${id}`
  );

  if (product.error) {
    console.error(product.message);
    return;
  }

  let options = "";
  const tokenDecode = parseJWT(sessionStorage.getItem("token"));
  const types = await getTypesProducts(tokenDecode.id_empresa);

  types.forEach(e => {
    options += `<option value="${e.tipo}">${e.tipo}</option>`;
  });

  document.getElementById("other").innerHTML = "";
  product.data.forEach((data) => {
    data["options"] = options;
    render("components/update-product.html", data, "other");
  });
}