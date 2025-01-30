async function getUsers() {
    const users = await fetchApi([],"POST", `${link_api}/pegarUser`);
    document.getElementById("options-cards").innerHTML = "";

    const div = document.createElement("div");
    div.id = "cards";
    div.className = "_div";
    document.getElementById("options-cards").appendChild(div)
    
    if (!users.error && users.data.length !== 0) {
        users.data.forEach(data => {
            render("components/cards-user.html", data, "cards");
        });
    }
}