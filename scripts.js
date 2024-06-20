const selecaoVoz = document.querySelector("#selecao-voz");
const entradaTexto = document.querySelector("#entrada-de-texto");
const botaoOuvir = document.querySelector("#ouvir-btn");
const botaoBaixarTexto = document.querySelector("#baixar-texto-btn");
const uploadArquivo = document.querySelector("#upload-arquivo");

// Iniciar a PI de voz

const fala = new SpeechSynthesisUtterance();

let vozesDisp = [];

// Preencher o select de vozes (idiomas)

const atualizarValores = () => {
  vozesDisp = window.speechSynthesis.getVoices();

  fala.voice = vozesDisp[0];

  // console.log(vozesDisp);

  vozesDisp.forEach((voz, index) => {
    const opcao = document.createElement("option");
    opcao.value = index;
    opcao.textContent = voz.name;
    selecaoVoz.appendChild(opcao);
  })
}

window.speechSynthesis.onvoiceschanged = atualizarValores;

// Mudar a voz (idioma)

selecaoVoz.addEventListener("change", () => {
  fala.voice = vozesDisp[selecaoVoz.value];
})

// Converter o texto para voz

botaoOuvir.addEventListener("click", () => {
  fala.text = entradaTexto.value;

  window.speechSynthesis.speak(fala);
})

// Baixar o arquivo.txt com o texto digitado

botaoBaixarTexto.addEventListener("click", () => {
  const texto = entradaTexto.value;

  const blob = new Blob([texto], { type: "text/plain" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "texto.txt";

  a.click();

  URL.revokeObjectURL(url);
})

// Importando o texto de um arquivo.txt

uploadArquivo.addEventListener("change", (event) => {
  const arquivo = event.target.files[0];
  
  if (arquivo) {
    const leitor = new FileReader();
    
    leitor.onload = (e) => {
      entradaTexto.value = e.target.result;
    }

    leitor.readAsText(arquivo);
  }
})
