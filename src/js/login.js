async function login(button) {
    const form = button.form;

    document.getElementById("form").addEventListener("submit", function (event) {
        event.preventDefault();
    });

    render("components/animacao.html", [], "container");

    const formData = new FormData(form);

    const dados = {};
    formData.forEach((value, key) => {
        dados[key] = value;
    });

    const result = await fetchApi(dados, "POST", `${link_api}/login`);

    if (!result.error) {
        sessionStorage.setItem('token', result.data.token);
    }
}