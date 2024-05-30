const shortenedUrls = [];

async function encurtarUrl() {
    const longUrl = document.getElementById("formUrl").value.trim();
    const apiUrl = 'https://cleanuri.com/api/v1/shorten';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `url=${encodeURIComponent(longUrl)}`
        });

        if (!response.ok) {
            throw new Error('Erro ao encurtar a URL');
        }

        const data = await response.json();
        const shortenedUrl = data.result_url;
        shortenedUrls.push(shortenedUrl);
        exibirUrlsEncurtadas();
        document.getElementById("formUrl").value = '';
    } catch (error) {
        console.error('Erro:', error.message);
    }
}

function exibirUrlsEncurtadas() {
    const ul = document.getElementById("shortenedUrls");
    ul.innerHTML = "";
    shortenedUrls.forEach(url => {
        const li = document.createElement("li");
        li.textContent = url;
        ul.appendChild(li);
    });
}

function copiarUrl() {
    const urlEncurtada = document.getElementById("shortenedUrls").firstChild.textContent;
    const tempInput = document.createElement("input");
    tempInput.value = urlEncurtada;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("URL encurtada copiada para a área de transferência!");
}

function submitForm() {
    try {
        const longUrl = document.getElementById("formUrl").value.trim();

        if (longUrl === "") {
            alert("Por favor, insira uma URL antes de enviar.");
            return;
        }

        encurtarUrl();
    } catch (error) {
        console.error('Erro ao encurtar a URL:', error.message);
        alert('Ocorreu um erro ao encurtar a URL. Por favor, tente novamente mais tarde.');
    }
}

function showError(message) {
    const errorParagraph = document.getElementById("errorParagraph");
    errorParagraph.textContent = message;
    errorParagraph.style.display = "block";
}