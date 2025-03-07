async function login(button) {
  const form = button.form;

  document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
  });

  const formData = new FormData(form);

  const dados = {};
  formData.forEach((value, key) => {
    dados[key] = value;
  });

  const result = await fetchApi(dados, "POST", `${link_api}/login`);

  if (!result.error) {
    sessionStorage.setItem("token", result.data.token);
    await render("components/animacao.html", null, "container");

    setTimeout(async () => {
      document.getElementById("container").innerHTML = "";
      await homePage();
      await getUsers();
    }, 2500);
  }
}

async function homePage() {
  const isMobile = window.matchMedia("(max-width:768px)").matches;

  if (isMobile) {
    await render("components/container-mobile.html", null, "container");
    return;
  }

  await render("components/container-desktop.html", null, "container");
}