const nomes = [
 "ANNA LUISA ASSUMPÇÃO",
 "ARTHUR VINICIUS NUNES",
 "FELIPE AUGUSTO OLIVEIRA",
 "MARINA RODRIGUES VILAÇA",
 "BERNARDO MEIRA",
 "BRUNA GARCIA TRINDADE",
 "ISABELA UTSCH",
 "CARLOS EDUARDO SALES",
 "ANA CAROLINA EVANGELISTA",
 "CECILIA ALVES CARMO",
 "CLARA ROCHA REIS",
 "MARIA EDUARDA DE PAULA",
 "ELTON JUNIO RODRIGUES",
 "FERNANDO GUSTAVO DIAS",
 "FELIPE COTTA GUIMARAES",
 "ISABELLE GOMES",
 "ISABELA AMARAL",
 "JOAQUIM DE ARAUJO GODOY",
 "JOÃO LUIZ",
 "LAURA MARIANA BARBOSA",
 "LUCAS HENRIQUE GONÇALVES",
 "DANIEL LUCAS",
 "LUCAS VANDRE",
 "LEANDRO CARVALHO PONTES",
 "LUIS FELIPE GONÇALVES",
 "MARINA LOPES NASCIMENTO",
 "MARIA EDUARDA MIRANDA SANTOS",
 "MARIA FERNANDA GUIMARAES SA",
 "MIGUEL SERGIO MAPA VITORIO",
 "MARCO TULIO",
 "MATHEUS SANTOS MOREIRA",
 "MARIA FERNANDA CHAVES",
 "GABRIEL RODRIGUES",
 "SOFIA TEIXEIRA DIAS CREPALDI SANTOS",
 "SOPHIA CAROLINE",
 "VICTOR AUGUSTO CALIXTO PRADO",
 "GABRIEL VANDRÉ",
 "VITOR HUGO",
 "YASMIM CAROLINA RODRIGUES OLIVEIRA",
 "ANA JULIA SILVA DOS SANTOS",
 "ANA BEATRIZ"
];

nomes.sort((a, b) => a.localeCompare(b, 'pt-BR'));

let dados = JSON.parse(localStorage.getItem("crisma")) || { datas: {} };

function salvar() {
  localStorage.setItem("crisma", JSON.stringify(dados));
}

function carregarData() {
  const data = document.getElementById("data").value;
  if (!data) return;

  if (!dados.datas[data]) {
    dados.datas[data] = {};
    nomes.forEach(n => dados.datas[data][n] = "");
    salvar();
  }
  renderizar();
}

function marcar(nome, valor) {
  const data = document.getElementById("data").value;
  dados.datas[data][nome] = valor;
  salvar();
  renderizar();
}

function calcularPorcentagem(nome) {
  let presencas = 0;
  let total = 0;

  for (const d in dados.datas) {
    if (dados.datas[d][nome]) {
      total++;
      if (dados.datas[d][nome] === "P") presencas++;
    }
  }
  return total === 0 ? "0%" : ((presencas / total) * 100).toFixed(0) + "%";
}

function renderizar() {
  const data = document.getElementById("data").value;
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  nomes.forEach(nome => {
    const status = dados.datas[data][nome];
    lista.innerHTML += `
      <tr>
        <td>${nome}</td>
        <td><button onclick="marcar('${nome}','P')" ${status==='P'?'disabled':''}>✔</button></td>
        <td><button onclick="marcar('${nome}','F')" ${status==='F'?'disabled':''}>✖</button></td>
        <td>${calcularPorcentagem(nome)}</td>
      </tr>
    `;
  });

  function limparData() {
  const data = document.getElementById("data").value;
  if (!data) return alert("Selecione uma data");

  if (!confirm("Deseja limpar a presença desta data?")) return;

  nomes.forEach(n => dados.datas[data][n] = "");
  salvar();
  renderizar();
}

function exportar() {
  const blob = new Blob(
    [JSON.stringify(dados, null, 2)],
    { type: "application/json" }
  );

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "presenca-crisma.json";
  a.click();
}

function importar(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    dados = JSON.parse(e.target.result);
    salvar();
    renderizar();
    alert("Dados importados com sucesso!");
  };
  reader.readAsText(file);
}

}