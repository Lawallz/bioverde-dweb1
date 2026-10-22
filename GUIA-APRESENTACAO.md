# O que todos do grupo precisam saber

Cada integrante deve conseguir explicar o projeto inteiro e demonstrar os recursos básicos, mesmo que tenha trabalhado mais em uma parte.

## A proposta em 30 segundos

“A BioVerde é uma loja fictícia de produtos orgânicos. O site mostra catálogo, preços e origem, apresenta a marca e oferece formulários de cadastro e contato. É um projeto somente de front-end: os formulários validam e mostram dados, mas não salvam nem enviam nada.”

## Quem faz o quê no código

| Parte | Explicação simples | Exemplo para mostrar |
|---|---|---|
| HTML | Organiza conteúdo e significado | `header`, `nav`, `main`, `footer`, tabela e formulário |
| CSS | Define aparência e adaptação à tela | Cores no `:root`, fontes, cards e media queries |
| JavaScript | Reage às ações e muda a página | Clique no filtro, validação e carregamento de preços |
| Bootstrap | Fornece grid e componentes prontos | `row`, `col-md-6`, menu que recolhe e modal |
| JSON | Guarda os produtos em formato de dados | Lista de objetos com nome, categoria, preço, unidade e origem |
| DOM | É a página como elementos manipuláveis | `getElementById`, `querySelectorAll`, `classList` |

`id` identifica um elemento; `class` permite agrupar vários. `data-filtro` e `data-categoria` guardam a categoria que o JS compara. `d-none` esconde os produtos que não correspondem ao filtro.

## A tabela e o defeito corrigido

O HTML apontava para `js/scripts.js`, mas o arquivo se chamava `script.js`. Um nome diferente já causa 404. Como o script não carregava, nenhum recurso dele funcionava. Renomeamos o arquivo para `scripts.js`, como exige o enunciado.

A função `iniciarTabela()` faz `fetch("tabela.json")`, espera a resposta com `await`, verifica se a resposta e os dados são válidos e cria linhas com `criarLinhaProduto()`. `replaceChildren()` atualiza o corpo da tabela. AJAX significa buscar dados sem recarregar a página inteira; aqui isso é feito com Fetch, sem jQuery.

Se der erro, `catch` mostra um aviso e preserva os preços escritos no HTML. Por isso existe tabela estática mesmo sem JavaScript. Ela não substitui o AJAX: com servidor funcionando, os dados vêm do JSON. Para alterar preços, atualize JSON, reserva HTML e cards.

## Cadastro e contato

O cadastro tem 9 tipos de input: text, email, password, tel, date, number, range, radio e checkbox. Também tem select e textarea.

- `novalidate` permite que o JS controle a apresentação dos erros.
- `preventDefault()` impede o envio e o recarregamento do formulário.
- As funções verificam nome, e-mail, telefone, senha com letras e números, idade mínima de 18 anos, quantidade e escolhas obrigatórias.
- `is-invalid`, `is-valid` e as mensagens mostram o resultado.
- A máscara organiza o telefone, mas não prova que o número existe.
- `mostrarConfirmacao()` cria uma lista e abre o modal do Bootstrap.
- `textContent` mostra a entrada como texto, sem executar HTML digitado.
- A senha não aparece no modal; nenhum dado é enviado ou salvo.
- Contato também é simulado. O botão Limpar restaura os valores iniciais.

## CSS que pode cair nas perguntas

- `:root` guarda variáveis reutilizadas, como `--verde-folha`.
- `header.site-header` combina tag e classe; `.card-produto .preco` seleciona um descendente.
- `:hover` representa passar o mouse; `:nth-child(even)` alterna linhas pares.
- `::after` desenha o sublinhado do menu; `::first-letter` seleciona a primeira letra.
- `@media` muda regras conforme a largura. O grid passa de uma coluna para várias.
- `rem` depende do tamanho-base da fonte. `clamp()` limita uma medida fluida entre mínimo e máximo.
- `object-fit: contain` mostra a foto inteira; `cover` preenche o espaço e pode cortar bordas.
- `@font-face` carrega os arquivos WOFF2 locais.

## Acessibilidade e limites

As imagens têm `alt`; campos têm `label`; a tabela usa `th` e `scope`. O teclado tem foco visível. O menu informa seu estado e o modal usa o comportamento do Bootstrap. A transcrição permite acessar a fala sem ouvir o áudio. Preços, negócios e histórias são fictícios. As fotos não certificam produtos nem identificam os personagens citados.

## Como apresentar sem internet

Na pasta do site, execute `python -m http.server 8000` e abra `http://localhost:8000`. Use `py` ou `python3` se for o comando disponível. Todos os recursos estão locais. O servidor só entrega arquivos; não cria um backend de cadastro. Abrir por duplo clique pode bloquear o Fetch, por isso use HTTP local para demonstrar AJAX.

Na aba Network do navegador, a página de preços deve mostrar `scripts.js` e `tabela.json` com status 200. Na aba Console, não deve haver erro de JavaScript.

## Roteiro de até 15 minutos

1. Documento (3 min): objetivo, público, protótipo, mapa, cores e fontes.
2. Site (4 min): seis páginas, áudio, filtro e tabela.
3. Código (5 min): semântica, seletores CSS, responsividade, validação, modal e Fetch.
4. Perguntas (3 min).

Ensaiem: formulário vazio, formulário válido, modal, limpar, filtro de frutas e menu no celular. Todos devem saber abrir o servidor e localizar os arquivos. Falem para os colegas da turma.

## Entrega e presença

Intermediária: 22/10/2026 até 23:59. Final: 18/11/2026 até 23:59. Apresentação: 19/11/2026, a partir das 19h. Um integrante envia ZIP/RAR com uma pasta completa e PDF no Moodle, até 10 MB. GitHub não substitui a entrega. O prefixo do arquivo é ProjetoIntDWE1 ou ProjetoFinalDWE1, com os nomes em ordem alfabética.

O enunciado prevê três integrantes; a capa recebida contém quatro. Confirmem essa composição com o professor. A ausência reduz a nota à metade; atraso desconta 3 pontos; perder a ordem desconta 1 ponto. Sem entrega final no Moodle no prazo, a nota do projeto é zero.
