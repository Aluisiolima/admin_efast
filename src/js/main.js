const link_api = window.location.hostname != "localhost" ? "https://efastmenu.com/api" : "http://localhost/efast/Efast_api";

/**
 * Funcao responsavel por requisicoes a api
 * @param {Array} data - sao os dados enviado na requisicao
 * @param {String} method - e metodo de requisicao a ser ultizado
 * @param {String} url - e a url de requisicao
 * @returns 
 */
async function fetchApi(data = [], method = "GET", url) {
    try {
        // Recupera o token do sessionStorage
        const token = sessionStorage.getItem("token");

        const headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        };

        const options = {
            method,
            headers,
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);

        const result = await response.json();
        return result;

    } catch (error) {

        console.error("Erro ao chamar a API:", error);
        throw error;
    }
}

/**
 * 
 * @param {String} templatePath - e o path para um arquivo html de template
 * @param {Array} data - sao os dados a serem dicionados em um arquivo de template
 * @param {String} targetElementId - e um id de um elemento do dow aonde aloca esse templates com seus repectivos dados
 */
async function render(templatePath, data, targetElementId) {
    try {
        const response = await fetch(templatePath);
        const template = await response.text();

        const rendered = template.replace(/{{\s*(\w+)}}/g, (match, variavel) => {
            return data[variavel] !== undefined ? data[variavel] : match;
        });

        document.getElementById(targetElementId).innerHTML += rendered;
    } catch (error) {
        console.error(error);
    }
}

async function pegarEmpresa(){
    const dateEmpresa = await fetchApi(null,"GET",`${link_api}/pegarEmpresas/`);
    const select = document.getElementById("empresas");
    if (!dateEmpresa.error){
        dateEmpresa.data.forEach(data => {
            select.innerHTML += `<option value="${data.id_empresa}">${data.nome_empresa}</option>`;
        });
        
    }
}

function parseJWT(token) {
    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join('')
    );
    return JSON.parse(jsonPayload); 
}

document.addEventListener("DOMContentLoaded", pegarEmpresa);