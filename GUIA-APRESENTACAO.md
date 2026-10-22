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

1. Alexander (3 min): documento, objetivo, público, protótipo, mapa, cores e fontes.
2. Deborah (3 min): navegação pelo site, áudio, filtro, tabela e responsividade.
3. Letícia (3 min): HTML semântico, CSS e Bootstrap.
4. Victoria (3 min): JavaScript, validação, modal e AJAX.
5. Perguntas (3 min).

1. Alexander: apresentação e documento — 3 minutos

Na tela: abrir doc/projeto.pdf.
“Boa noite! Nosso grupo é formado por Alexander, Deborah, Letícia e Victoria. Desenvolvemos a BioVerde Organics, um site fictício de comércio de produtos orgânicos para a disciplina DWE1.”

“O objetivo é permitir que o visitante conheça os produtos, consulte preços e origens e encontre informações sobre a empresa. Também criamos formulários de cadastro e contato.”

“O público pensado para o projeto são pessoas que procuram alimentos orgânicos e querem consultar essas informações de forma simples, inclusive pelo celular.”

Mostrar o protótipo e o mapa das páginas.
“Antes da implementação, organizamos a estrutura do site neste protótipo. Dividimos o conteúdo em seis páginas: Início, Produtos, Preços, Sobre, Cadastro e Contato.”

“Todas compartilham o mesmo menu e rodapé, para facilitar a navegação.”

Mostrar identidade visual.
“Usamos verde, marrom, creme e laranja para relacionar a identidade visual aos alimentos e à produção rural. Os títulos usam Poppins e os textos usam Nunito.”

“As fotos estão em JPG. O logotipo e o selo usam PNG, e também temos elementos vetoriais em SVG.”

Passagem:
“Agora a Deborah vai mostrar como essa estrutura aparece no site.”

2. Deborah: navegação pelo site — 3 minutos

Na tela: abrir o site, já com o servidor local funcionando.
“Na página inicial, temos a apresentação da BioVerde, alguns produtos em destaque e o áudio institucional.”

Tocar alguns segundos do áudio.
“O áudio tem controles de reprodução. A transcrição está na página Sobre, permitindo acessar o conteúdo também por texto.”

Abrir Produtos. Clicar em “Frutas” e depois em “Todos”.
“O catálogo organiza os produtos por categoria. Ao selecionar Frutas, aparecem apenas os produtos dessa categoria. O filtro muda o conteúdo visível sem abrir outra página.”

Abrir Preços.
“A tabela apresenta nome, categoria, preço, unidade e origem. Os valores são fictícios, porque este é um trabalho acadêmico.”

Abrir Sobre, Cadastro e Contato, sem preencher ainda.
“A página Sobre apresenta a história fictícia da marca, a transcrição e os produtores. As fotos são ilustrativas.”

“O Cadastro permite preencher informações e conferir os dados em uma janela de confirmação. O Contato também possui validação, mas o envio é apenas uma simulação.”

Diminuir a janela ou ativar a visualização de celular.
“O layout se adapta à largura da tela. As colunas se reorganizam e o menu fica recolhido no celular.”

Passagem:
“A Letícia vai explicar como organizamos o HTML e os estilos para construir essas páginas.”

3. Letícia: HTML, CSS e Bootstrap — 3 minutos

Na tela: abrir index.html no editor.
“O HTML organiza o conteúdo. Usamos elementos semânticos, como header para o cabeçalho, nav para a navegação, main para o conteúdo principal e footer para o rodapé.”

“Esses elementos ajudam a identificar a função de cada parte da página.”

Mostrar um trecho com row e col-md-4.
“O Bootstrap é o único framework utilizado. Ele fornece o sistema de colunas e componentes como o menu responsivo e o modal. Essas classes ajudam a organizar o layout conforme o tamanho da tela.”

Abrir css/styles.css.
“Os estilos próprios estão concentrados neste arquivo. No início, temos as fontes locais e as variáveis de cores, que permitem reutilizar a mesma paleta.”

“Também atendemos aos requisitos de seletores CSS. header.site-header combina uma tag com uma classe. .card-produto .preco seleciona o preço dentro do card.”

“A pseudoclasse :hover aplica um estilo ao passar o mouse. Já :nth-child(even) permite diferenciar as linhas pares da tabela.”

“Os pseudoelementos incluem ::after, usado no sublinhado do menu, e ::first-letter, que estiliza a primeira letra de alguns títulos.”

Mostrar uma regra @media.
“As media queries ajustam os estilos conforme a largura da tela. Também incluímos Bootstrap e fontes dentro do projeto, permitindo apresentar sem depender da internet.”

Passagem:
“A Victoria vai mostrar as interações feitas com JavaScript e o carregamento da tabela.”

4. Victoria: JavaScript, formulário e AJAX — 3 minutos

Na tela: abrir Cadastro e clicar em Enviar com os campos vazios.
“As interações ficam em js/scripts.js. No cadastro, o JavaScript verifica os campos e mostra mensagens quando alguma informação está incorreta ou faltando.”

“O formulário possui nove tipos de input, além de select e textarea. Entre as verificações estão nome, e-mail, telefone, senha, idade e escolhas obrigatórias.”

Preencher com dados fictícios preparados durante o ensaio e enviar.
“Quando os dados estão válidos, abrimos um modal do Bootstrap para conferência. A senha não aparece nessa confirmação.”

“O projeto não possui backend nem banco de dados. Portanto, os dados não são enviados nem armazenados.”

Abrir js/scripts.js, na função iniciarTabela(), e depois tabela.json.
“A tabela usa AJAX por meio da função Fetch. Ao abrir a página, o JavaScript busca o arquivo tabela.json, lê os produtos e monta as linhas da tabela.”

“JSON é um formato de dados. Aqui, cada produto possui nome, categoria, preço, unidade e origem.”

“Se o carregamento falhar, o site mantém os preços de referência escritos no HTML e mostra um aviso.”

Apontar os nomes do arquivo e da referência no HTML.
“Durante os testes, encontramos um problema no nome do arquivo JavaScript: as páginas buscavam scripts.js, mas o arquivo estava como script.js. Corrigir esse caminho fez as interações voltarem a funcionar.”

“Testamos as seis páginas em três larguras de tela, além dos filtros, formulários, áudio e carregamento da tabela. Obrigada! Podemos responder às perguntas.”

Ensaiem: formulário vazio, formulário válido, modal, limpar, filtro de frutas e menu no celular. Todos devem saber abrir o servidor e localizar os arquivos. Falem para os colegas da turma.

## Entrega e presença

Intermediária: 22/10/2026 até 23:59. Final: 18/11/2026 até 23:59. Apresentação: 19/11/2026, a partir das 19h. Um integrante envia ZIP/RAR com uma pasta completa e PDF no Moodle, até 10 MB. GitHub não substitui a entrega. O prefixo do arquivo é ProjetoIntDWE1 ou ProjetoFinalDWE1, com os nomes em ordem alfabética.

O grupo está confirmado com quatro integrantes: Alexander, Deborah, Letícia e Victoria. Todos participam da apresentação, conforme o roteiro acima. A ausência reduz a nota à metade; atraso desconta 3 pontos; perder a ordem desconta 1 ponto. Sem entrega final no Moodle no prazo, a nota do projeto é zero.
