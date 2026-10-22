/* ==========================================================
   BioVerde Organics - scripts.js
   Finalidade: único arquivo de JavaScript do site.
   Contém: voltar ao topo, filtro de categorias, máscara de
   telefone, validação dos formulários (cadastro e contato)
   e tabela de preços carregada do tabela.json por AJAX.
   Como cada página só tem alguns elementos, cada bloco
   confere se o elemento existe antes de usá-lo.
   ========================================================== */

/* Atalho: pega um elemento pelo id */
const $ = (id) => document.getElementById(id);

/* ---------- 1. BOTÃO "VOLTAR AO TOPO" ---------- */
function iniciarVoltarAoTopo() {
  const botao = $("btn-topo");
  if (!botao) return;

  // Mostra o botão depois de rolar 300px; esconde quando volta ao início
  window.addEventListener("scroll", () => {
    botao.classList.toggle("visivel", window.scrollY > 300);
  });

  // Ao clicar, sobe suavemente (o CSS já tem scroll-behavior: smooth)
  botao.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- 2. FILTRO DE CATEGORIAS (produtos.html) ---------- */
function iniciarFiltro() {
  const botoes = document.querySelectorAll("[data-filtro]");
  const itens = document.querySelectorAll("#lista-produtos [data-categoria]");
  if (botoes.length === 0 || itens.length === 0) return;

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      const filtro = botao.dataset.filtro; // ex.: "frutas" ou "todos"

      // Destaca só o botão clicado
      botoes.forEach((b) => b.classList.remove("ativo"));
      botao.classList.add("ativo");

      // Esconde (d-none do Bootstrap) o que não pertence à categoria
      itens.forEach((item) => {
        const mostrar = filtro === "todos" || item.dataset.categoria === filtro;
        item.classList.toggle("d-none", !mostrar);
      });
    });
  });
}

/* ---------- 3. MÁSCARA DE TELEFONE ---------- */
// Transforma "11912345678" em "(11) 91234-5678"
function aplicarMascaraTelefone(valor) {
  const d = valor.replace(/\D/g, "").slice(0, 11); // só números, máx. 11
  if (d.length === 0) return "";
  if (d.length <= 2) return "(" + d;
  if (d.length <= 6) return "(" + d.slice(0, 2) + ") " + d.slice(2);
  if (d.length <= 10) return "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6);
  return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
}

function iniciarMascara() {
  const campo = $("cadastro-telefone");
  if (!campo) return;
  campo.addEventListener("input", () => {
    campo.value = aplicarMascaraTelefone(campo.value);
  });
}

/* ---------- 4. FUNÇÕES DE VALIDAÇÃO ----------
   Cada função recebe um valor e devolve:
   - texto vazio ("") se estiver tudo certo
   - uma mensagem de erro se estiver errado            */

function validarNome(valor) {
  const nome = valor.trim();
  if (nome.length < 3) return "Informe pelo menos 3 letras.";
  if (!/^[A-Za-zÀ-ÿ' ]+$/.test(nome)) return "Use apenas letras e espaços.";
  return "";
}

function validarEmail(valor) {
  const email = valor.trim();
  if (email === "") return "Informe seu e-mail.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return "E-mail inválido. Exemplo: nome@dominio.com";
  return "";
}

function validarTelefone(valor) {
  const d = valor.replace(/\D/g, "");
  if (d.length < 10 || d.length > 11) return "Digite DDD + número (10 ou 11 dígitos).";
  if (d.length === 11 && d[2] !== "9") return "Celular deve começar com 9 depois do DDD.";
  return "";
}

function validarSenha(valor) {
  if (valor.length < 8) return "A senha precisa ter no mínimo 8 caracteres.";
  if (!/[A-Za-z]/.test(valor) || !/\d/.test(valor)) return "Use letras e números na senha.";
  return "";
}

function validarNascimento(valor) {
  if (valor === "") return "Informe a data de nascimento.";
  const nasc = new Date(valor + "T00:00:00");
  const hoje = new Date();
  if (nasc > hoje) return "A data não pode estar no futuro.";
  // Calcula a idade completa
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const jaFezAniversario =
    hoje.getMonth() > nasc.getMonth() ||
    (hoje.getMonth() === nasc.getMonth() && hoje.getDate() >= nasc.getDate());
  if (!jaFezAniversario) idade--;
  if (idade < 18) return "É necessário ter 18 anos ou mais.";
  return "";
}

function validarQuantidade(valor) {
  const n = Number(valor);
  if (valor === "" || !Number.isInteger(n) || n < 1 || n > 10) return "Informe um número inteiro de 1 a 10.";
  return "";
}

function validarObrigatorio(valor, mensagem) {
  return valor.trim() === "" ? mensagem : "";
}

/* ---------- 5. MOTOR DE VALIDAÇÃO ----------
   Cada "regra" é um objeto: { campo, erro, validar }
   - campo:   elemento que recebe is-invalid / is-valid
   - erro:    id do <small class="invalid-feedback">
   - validar: função que devolve "" (ok) ou a mensagem  */

function validarRegra(regra) {
  const mensagem = regra.validar();
  const area = $(regra.erro);
  const ehGrupo = regra.campo.tagName === "FIELDSET";

  area.textContent = mensagem;
  area.style.display = mensagem ? "block" : "none"; // mostra/esconde a mensagem
  regra.campo.classList.toggle("is-invalid", mensagem !== "");
  if (!ehGrupo) regra.campo.classList.toggle("is-valid", mensagem === "");
  return mensagem === "";
}

function limparRegras(regras) {
  regras.forEach((r) => {
    const area = $(r.erro);
    area.textContent = "";
    area.style.display = "none";
    r.campo.classList.remove("is-invalid", "is-valid");
  });
}

// Liga as regras a um formulário. "aoSucesso" roda se tudo estiver válido.
function ligarFormulario(form, regras, aoSucesso) {
  // Revalida o campo quando o usuário sai dele ou altera seu valor
  const revalidar = (evento) => {
    regras.forEach((r) => {
      if (r.campo === evento.target || r.campo.contains(evento.target)) validarRegra(r);
    });
  };
  form.addEventListener("focusout", revalidar);
  form.addEventListener("change", revalidar);
  form.addEventListener("input", (evento) => {
    // Durante a digitação, só corrige quem já estava com erro
    regras.forEach((r) => {
      const tocado = r.campo.classList.contains("is-invalid");
      if (tocado && (r.campo === evento.target || r.campo.contains(evento.target))) validarRegra(r);
    });
  });

  form.addEventListener("submit", (evento) => {
    evento.preventDefault(); // não envia para lugar nenhum
    const resultados = regras.map(validarRegra);
    if (resultados.every(Boolean)) {
      aoSucesso();
    } else {
      // Leva o foco para o primeiro campo com erro
      const primeiro = regras.find((r) => r.campo.classList.contains("is-invalid"));
      const alvo = primeiro.campo.tagName === "FIELDSET" ? primeiro.campo.querySelector("input") : primeiro.campo;
      alvo.focus();
    }
  });

  form.addEventListener("reset", () => {
    limparRegras(regras);
    setTimeout(() => {
      const saida = $("cadastro-frequencia-valor");
      if (saida) saida.textContent = $("cadastro-frequencia").value; // volta o número do range
    }, 0);
  });
}

/* ---------- 6. FORMULÁRIO DE CADASTRO ---------- */
function iniciarCadastro() {
  const form = $("form-cadastro");
  if (!form) return;

  // Data de nascimento: não permite escolher datas futuras
  $("cadastro-nascimento").max = new Date().toISOString().split("T")[0];

  // Mostra o valor do range ao lado do rótulo
  $("cadastro-frequencia").addEventListener("input", (e) => {
    $("cadastro-frequencia-valor").textContent = e.target.value;
  });

  const regras = [
    { campo: $("cadastro-nome"), erro: "erro-cadastro-nome", validar: () => validarNome($("cadastro-nome").value) },
    { campo: $("cadastro-email"), erro: "erro-cadastro-email", validar: () => validarEmail($("cadastro-email").value) },
    { campo: $("cadastro-senha"), erro: "erro-cadastro-senha", validar: () => validarSenha($("cadastro-senha").value) },
    { campo: $("cadastro-telefone"), erro: "erro-cadastro-telefone", validar: () => validarTelefone($("cadastro-telefone").value) },
    { campo: $("cadastro-nascimento"), erro: "erro-cadastro-nascimento", validar: () => validarNascimento($("cadastro-nascimento").value) },
    { campo: $("cadastro-quantidade"), erro: "erro-cadastro-quantidade", validar: () => validarQuantidade($("cadastro-quantidade").value) },
    { campo: $("cadastro-estado"), erro: "erro-cadastro-estado", validar: () => validarObrigatorio($("cadastro-estado").value, "Selecione seu estado.") },
    {
      campo: $("cadastro-frequencia"), erro: "erro-cadastro-frequencia",
      validar: () => {
        const n = Number($("cadastro-frequencia").value);
        return n >= 1 && n <= 4 ? "" : "Escolha de 1 a 4 compras por mês.";
      }
    },
    {
      campo: $("cadastro-entrega-grupo"), erro: "erro-cadastro-entrega",
      validar: () => (form.querySelector('input[name="entrega"]:checked') ? "" : "Escolha uma forma de entrega.")
    },
    {
      campo: $("cadastro-categorias-grupo"), erro: "erro-cadastro-categorias",
      validar: () => (form.querySelector('input[name="categorias"]:checked') ? "" : "Marque pelo menos uma categoria.")
    },
    {
      campo: $("cadastro-observacoes"), erro: "erro-cadastro-observacoes",
      validar: () => ($("cadastro-observacoes").value.length > 200 ? "Use no máximo 200 caracteres." : "")
    },
    {
      campo: $("cadastro-termos"), erro: "erro-cadastro-termos",
      validar: () => ($("cadastro-termos").checked ? "" : "Você precisa aceitar os termos.")
    }
  ];

  ligarFormulario(form, regras, () => mostrarConfirmacao(form));
}

// Monta a lista de dados e abre o modal do Bootstrap
function mostrarConfirmacao(form) {
  const rotulo = (input) => document.querySelector('label[for="' + input.id + '"]').textContent;
  const entrega = form.querySelector('input[name="entrega"]:checked');
  const categorias = Array.from(form.querySelectorAll('input[name="categorias"]:checked')).map(rotulo);
  const [ano, mes, dia] = $("cadastro-nascimento").value.split("-");
  const estado = $("cadastro-estado");

  const dados = [
    ["Nome", $("cadastro-nome").value.trim()],
    ["E-mail", $("cadastro-email").value.trim()],
    ["Telefone", $("cadastro-telefone").value],
    ["Nascimento", dia + "/" + mes + "/" + ano],
    ["Pessoas na casa", $("cadastro-quantidade").value],
    ["Estado", estado.options[estado.selectedIndex].text],
    ["Compras por mês", $("cadastro-frequencia").value],
    ["Entrega", rotulo(entrega)],
    ["Categorias", categorias.join(", ")],
    ["Observações", $("cadastro-observacoes").value.trim() || "Nenhuma"]
  ];

  // textContent evita que o texto digitado seja interpretado como HTML
  const lista = document.createElement("dl");
  dados.forEach(([nome, valor]) => {
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = nome;
    dd.textContent = valor;
    lista.append(dt, dd);
  });
  $("dados-confirmacao").replaceChildren(lista);

  bootstrap.Modal.getOrCreateInstance($("modal-confirmacao")).show();
}

/* ---------- 7. FORMULÁRIO DE CONTATO ---------- */
function iniciarContato() {
  const form = $("form-contato");
  if (!form) return;

  const regras = [
    { campo: $("contato-nome"), erro: "erro-contato-nome", validar: () => validarNome($("contato-nome").value) },
    { campo: $("contato-email"), erro: "erro-contato-email", validar: () => validarEmail($("contato-email").value) },
    { campo: $("contato-assunto"), erro: "erro-contato-assunto", validar: () => validarObrigatorio($("contato-assunto").value, "Selecione um assunto.") },
    {
      campo: $("contato-mensagem"), erro: "erro-contato-mensagem",
      validar: () => ($("contato-mensagem").value.trim().length < 10 ? "Escreva pelo menos 10 caracteres." : "")
    }
  ];

  ligarFormulario(form, regras, () => {
    alert("Mensagem enviada (simulação)!\n\nNome: " + $("contato-nome").value.trim() +
      "\nE-mail: " + $("contato-email").value.trim() +
      "\nAssunto: " + $("contato-assunto").selectedOptions[0].text);
    form.reset();
  });
}

/* ---------- 8. TABELA DE PREÇOS POR AJAX (tabela-precos.html) ---------- */
// Escreve uma única linha de aviso dentro do tbody (carregando ou erro)
function mostrarAvisoTabela(tbody, texto, ehErro) {
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  td.colSpan = 5;
  td.textContent = texto;
  if (ehErro) {
    td.classList.add("text-danger");
    td.setAttribute("role", "alert");
  }
  tr.append(td);
  tbody.replaceChildren(tr);
}

// Cria uma linha da tabela a partir de um registro do JSON
function criarLinhaProduto(produto) {
  const tr = document.createElement("tr");

  // Primeira coluna: <th scope="row"> com o nome do produto
  const th = document.createElement("th");
  th.scope = "row";
  th.textContent = produto.nome;
  tr.append(th);

  // Demais colunas: categoria, preço (formatado em reais), unidade e origem
  const preco = Number(produto.preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  [produto.categoria, preco, produto.unidade, produto.origem].forEach((texto) => {
    const td = document.createElement("td");
    td.textContent = texto; // textContent: o texto nunca é interpretado como HTML
    tr.append(td);
  });
  return tr;
}

// Lê o tabela.json com fetch e monta as linhas. Só roda se a tabela existir na página.
async function iniciarTabela() {
  const tbody = $("tabela-produtos");
  if (!tbody) return; // nas outras páginas não faz nada

  mostrarAvisoTabela(tbody, "Carregando preços...", false);

  try {
    const resposta = await fetch("tabela.json");
    if (!resposta.ok) throw new Error("HTTP " + resposta.status);

    const produtos = await resposta.json();
    if (!Array.isArray(produtos) || produtos.length === 0) throw new Error("JSON vazio ou inválido");

    tbody.replaceChildren(...produtos.map(criarLinhaProduto));
  } catch (erro) {
    console.error("Falha ao carregar tabela.json:", erro);
    mostrarAvisoTabela(
      tbody,
      "Não foi possível carregar a tabela de preços agora. Tente atualizar a página em alguns instantes.",
      true
    );
  }
}

/* ---------- 9. INICIALIZAÇÃO ---------- */
// O script usa "defer": roda depois que o HTML foi lido.
iniciarVoltarAoTopo();
iniciarFiltro();
iniciarMascara();
iniciarCadastro();
iniciarContato();
iniciarTabela();
