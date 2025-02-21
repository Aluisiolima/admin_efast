async function getFiles() {
  const files = await fetchApi([], "POST", `${link_api}/pegarArquivo/`);

  if (files.error) {
    console.error(files.message);
    return;
  }

  document.getElementById("options-cards").innerHTML = "";
  const div = document.createElement("div");
  div.id = "cards";
  div.className = "_div";
  document.getElementById("options-cards").appendChild(div);

  files.data.forEach((data) => {
    render("components/card-arquivo.html", data, "cards");
  });
}

function fileNotFound(file) {
  file.src = "/img/images.png";
}
