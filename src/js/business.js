async function getBusiness() {
  const tokenDecode = parseJWT(sessionStorage.getItem("token"));
  const business = await fetchApi(
    null,
    "GET",
    `${link_api}/pegarEmpresa/${tokenDecode.id_empresa}`
  );

  if (business.error) {
    console.error(business.message);
    return;
  }

  document.getElementById("options-cards").innerHTML = "";

  render("components/card_bussiness.html", business.data, "options-cards");
}

async function updateBusiness(form_Business) {
  const form = form_Business.form;
  const BusinessDate = collectionDatesForm(form);

  const business = await fetchApi(
    BusinessDate,
    "PUT",
    `${link_api}/updateEmpresa`
  );

  if (business.error) {
    console.error(business.message);
    return;
  }

  exit();
  getBusiness();
}

async function openFormUpdateBusiness(id) {
  const Business = await fetchApi(
    null,
    "GET",
    `${link_api}/pegarEmpresa/${id}`
  );

  if (Business.error) {
    console.error(Business.message);
    return;
  }

  render("components/update-business.html", Business.data, "other");
}

async function qrcode() {
  const tokenDecode = parseJWT(sessionStorage.getItem("token"));
  fetch(`${link_api}/empresa/qrcode/${tokenDecode.id_empresa}`, {
    method: "POST",
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qrcode.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    });
}

async function frete(form_frete){
  const form = form_frete.form;
  const BusinessDate = collectionDatesForm(form);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        const dates = {
          lat: latitude,
          lon: longitude,
          t_frete: BusinessDate.valor
        };

        const frete = await fetchApi(
          dates,
          "PUT",
          `${link_api}/frete`
        );

        if (!frete.error) {
          exit();
        }
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 1000000,
        maximumAge: 0,
      }
    );
  } else {
    console.error("Geolocalização não é suportada pelo navegador.");
  }
}
