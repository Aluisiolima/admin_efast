async function getProdutos() {
  const tokenDecode = parseJWT(sessionStorage.getItem("token"));

  const produtos = await fetchApi(
    null,
    "GET",
    `${link_api}/pegarProdutos/${tokenDecode.id_empresa}`
  );

  if (produtos.error) {
    console.log(produtos.message);
    return;
  }
  document.getElementById("options-cards").innerHTML = "";
  const div = document.createElement("div");
  div.id = "cards";
  div.className = "_div";

  if (window.matchMedia("(max-width:768px)").matches) {
    div.className = "_div_mobile";
  }

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

async function getTypesProducts(id) {
  const types = await fetchApi([], "POST", `${link_api}/getTypes/${id}`);

  if (types.error) {
    console.error(types.message);
    return;
  }
  return types.data;
}

function NotFoundImg(tipo, img) {
  const tiposImgs = {
    pizza: "./img/default/Pizza_padrao.svg",
    hamburguer: "./img/default/Hambúrguer_padrao.svg",
    hambuguer: "./img/default/Hambúrguer_padrao.svg",
    bebida: "./img/default/Bebida_padrao.svg",
    bebidas: "./img/default/Bebida_padrao.svg",
    adicionais: "./img/default/adicionais.jpeg",
    artesanal: "./img/default/artersanais.png",
    porção: "./img/default/batatinha.webp",
    sucos: "./img/default/sucos.webp",
    default: "./img/default/Pizza_padrao.svg",
  }
  const tipoSemEspaco = tipo.replace(/\s+/g, "");

  img.src = tiposImgs[tipoSemEspaco] || tiposImgs.default;
}

async function newProduct(form_product) {
  const form = form_product.form;
  const productDate = collectionDatesForm(form);

  const newProduct = await fetchApi(
    productDate,
    "POST",
    `${link_api}/inseriProdutos`
  );

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

  const newProduct = await fetchApi(
    productDate,
    "PUT",
    `${link_api}/updateProdutos`
  );

  if (newProduct.error) {
    console.error(newProduct.message);
    return;
  }

  exit();
  getProdutos();
}

async function removeProduct(id) {
  document
    .getElementById("meuForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
    });
  const remove = await fetchApi(
    { id: id },
    "DELETE",
    `${link_api}/desativaProdutos`
  );

  if (remove.error) {
    console.error(remove.message);
    return;
  }

  exit();
  getProdutos();
}

async function openFormNewProduct() {
  let options = "";
  const tokenDecode = parseJWT(sessionStorage.getItem("token"));
  const types = await getTypesProducts(tokenDecode.id_empresa);

  types.forEach((e) => {
    options += `<option value="${e.tipo}">${e.tipo}</option>`;
  });

  options += `<option value="other" id="typeOther"> Outro </option>`;

  document.getElementById("other").innerHTML = "";
  render("components/new-product.html", { options: options }, "other");
}

async function openFormUpdateProduct(id) {
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

  types.forEach((e) => {
    options += `<option value="${e.tipo}">${e.tipo}</option>`;
  });

  options += `<option value="other" id="typeOther"> Outro </option>`;

  document.getElementById("other").innerHTML = "";
  product.data.forEach((data) => {
    data["options"] = options;
    render("components/update-product.html", data, "other");
  });
}

function checkOptions() {
  const optionsValue = document.getElementById("typePrimary").value;

  if (optionsValue === "other") {
    document.getElementById("otherType").style.display = "block";
    document.getElementById("tipoOther").setAttribute("required", "");
  } else {
    document.getElementById("otherType").style.display = "none";
    document.getElementById("tipoOther").removeAttribute("required");
  }
}

function passValue() {
  const select = document.getElementById("typeOther");
  const optionsValue = document.getElementById("tipoOther").value;

  select.value = optionsValue;
}
