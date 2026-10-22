# BioVerde Organics

Projeto acadêmico fictício de comércio de produtos orgânicos, IFSP, DWE1. Seis páginas em HTML, CSS e JavaScript puro. Bootstrap 5.3.3 é o único framework. Não há banco de dados, cadastro real ou envio de mensagens.

## Abrir para apresentar

Com Python instalado, abra o terminal na pasta que contém `index.html`:

```bash
python -m http.server 8000
```

Abra `http://localhost:8000`. No Windows, se necessário, use `py -m http.server 8000`; no Linux/macOS, `python3 -m http.server 8000`. Para encerrar, pressione Ctrl+C. Bootstrap, fontes, imagens e áudio estão no projeto, portanto não precisam de internet.

Abrir o HTML com duplo clique permite ver as páginas e os preços de referência. Para demonstrar o AJAX, use o servidor local: navegadores podem bloquear `fetch` em endereços `file://`.

## Arquivos

- `index.html`: início e áudio MP3/OGG.
- `produtos.html`: 12 produtos e filtros.
- `tabela-precos.html`: preços estáticos de reserva, atualizados pelo JSON.
- `sobre.html`: história fictícia, selo, transcrição e produtores.
- `cadastro.html`: formulário e modal de confirmação.
- `contato.html`: formulário de contato simulado.
- `css/styles.css`: todo o CSS próprio, inclusive o documento.
- `js/scripts.js`: interações, validação e AJAX.
- `tabela.json`: dados dos preços.
- `img/`, `media/`, `fonts/`, `vendor/bootstrap/`: arquivos locais.
- `doc/projeto.html` e `doc/projeto.pdf`: documento do projeto.
- `REQUISITOS.md`: conferência com o enunciado.
- `GUIA-APRESENTACAO.md`: roteiro e conceitos para todos os integrantes.

## Correção de 22/10/2026

As páginas buscavam `js/scripts.js`, mas o repositório tinha `js/script.js`. O nome foi corrigido. Esse erro impedia a tabela AJAX, os filtros, a validação e o botão de voltar ao topo.

A tabela agora preserva as linhas do HTML se o JSON não puder ser lido. Ao mudar preços ou produtos, mantenha `tabela.json`, a reserva em `tabela-precos.html` e os cards de produtos/início consistentes.

As 16 fotos foram mantidas. O logotipo e o selo ilustrativo também. Algumas fotos retratam variedades ou preparos diferentes dos itens fictícios (por exemplo, arroz branco na foto do arroz integral). Os nomes dos produtores não identificam as pessoas fotografadas. Antes de publicar como loja real, seriam necessários fotos correspondentes, procedência e autorização de uso.

## Entrega

O GitHub não substitui o Moodle. O enunciado exige ZIP/RAR de até 10 MB com uma pasta contendo o site, o PDF e todos os arquivos necessários. Não inclua `.git` ou ferramentas de teste.

- Intermediária: **22/10/2026, até 23:59**, requisitos 1–10, exceto implementação JavaScript.
- Final: **18/11/2026, até 23:59**, projeto completo.
- Apresentação: **19/11/2026, a partir das 19h**, até 15 minutos.

O grupo está confirmado com quatro integrantes: Alexander Felipe Duarte Narcizo, Deborah Crystine Ramallo Guimarães, Letícia Oliveira de Jesus e Victoria Lima dos Santos. Os quatro nomes constam na capa do documento. Use o prefixo `ProjetoIntDWE1_` ou `ProjetoFinalDWE1_`, seguido dos nomes e sobrenomes em ordem alfabética, conforme o enunciado.

## Dependências e licenças

Bootstrap 5.3.3 foi obtido de `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/`. Sua licença está em `vendor/bootstrap/LICENSE.txt`. Nunito e Poppins vieram do Google Fonts, foram convertidas para WOFF2 e estão em `fonts/`, com suas licenças OFL. Nenhum recurso externo é necessário para navegar no site.
