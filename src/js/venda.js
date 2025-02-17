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
      render("components/cards-venda.html", vendas.data[chave], "cards");
    }
  }
}
