async function getVendas() {
  const vendas = await fetchApi([], "POST", `${link_api}/pegarVendas/`);

  if (!vendas.error && vendas.data.length !== 0) {
    document.getElementById("options-cards").innerHTML = "";
    const div = document.createElement("div");
    div.id = "cards";
    div.className = "_div2";
    document.getElementById("options-cards").appendChild(div);

    for (const chave in vendas.data) {
      let icon = "<i class='bi bi-check-lg'></i>";
      let color = "green";
      if (vendas.data[chave].status === "pendente") {
        icon = "<i class='bi bi-x-lg'></i>";
        color = "red";
      }
      vendas.data[chave].status = icon;
      vendas.data[chave].color = color;
      vendas.data[chave].id = chave;
      render("components/cards-venda.html", vendas.data[chave], "cards");
    }
  }
}

async function getSale(id) {
  const sales = await fetchApi(
    [],
    "POST",
    `${link_api}/pegarVendas`
  );

  if(sales.error){
    console.error(sales.error);
    return;
  }
  sales.data[id].products = await generateProducts(sales.data[id].produtos);
  sales.data[id].id = id
  document.getElementById("other").innerHTML = "";
  await render("components/card-vendas-detalhes.html", sales.data[id], "other");
}

async function generateProducts(products) {
  let cards = ""; 
  await products.forEach(e => {
    cards += `<li> ${e.nome_produto} R$ ${e.valor} nº ${e.quantidade} desconto ${e.desconto}%</li>`
  });

  return cards;
}

async function updateStatus(id) {
  const updateStatus = await fetchApi({"status":"Entregue"},"POST",`${link_api}/status/${id}`);

  if(updateStatus.error){
    console.error(updateStatus.message)
  }

  await getSale(id);
  await exit();
}
