# Conferência do enunciado SPODWE1

Versão revisada em 22/10/2026. Esta conferência cobre o projeto técnico; não substitui a avaliação do professor.

| Nº | Requisito | Onde conferir |
|---|---|---|
| 1 | Apenas front-end | HTML, CSS e JS; sem backend ou banco |
| 2 | PDF de 5 a 10 páginas | `doc/projeto.pdf`: concepção, público, referências, protótipo, arquitetura, identidade e tipografia |
| 3 | HTML, CSS e JavaScript | Seis páginas e dois arquivos próprios de estilo/script |
| 4 | Framework CSS | Bootstrap 5.3.3 local; sem jQuery ou outros frameworks |
| 5 | Semântica HTML5 | header, nav, main, section, article, figure, footer e address |
| 6 | Mídia e cinco imagens | Áudio real MP3/OGG no início; 16 fotos JPG, logo e selo |
| 7 | Oito tipos, validação e diálogo | Cadastro com 9 tipos de input, select e textarea; regras JS e modal |
| 8 | Tabela estática | 12 linhas escritas em `tabela-precos.html`, disponíveis sem JS |
| 9 | 15 regras CSS e seletores | Mais de 15 regras; exemplos abaixo |
| 10 | CSS externo styles.css | `css/styles.css`, incluindo os estilos do documento |
| 11 | JS externo scripts.js | `js/scripts.js`, com o caminho correto nas seis páginas |
| 12 | AJAX tabela.json | `iniciarTabela()` faz fetch e substitui as linhas ao carregar |
| 13 | Layout fluido | Grid Bootstrap, media queries, imagens flexíveis e rolagem da tabela |

Exemplos de seletores em `css/styles.css`:

- Compostos: `header.site-header` e `.card-produto .preco`.
- Pseudoclasses: `a:hover` e `tbody tr:nth-child(even)`.
- Pseudoelementos: `nav .nav-link::after` e `section.destaque h2::first-letter`.

## Compatibilidade mantida

Os IDs dos formulários, modal, dados de confirmação, botões, lista de produtos, tabela e mensagens de erro foram preservados. Também foram mantidos `data-filtro`, `data-categoria` e as classes `d-none`, `is-invalid`, `is-valid`, `visivel` e `ativo`.

## Fotos e áudio

Nenhuma das 16 fotos esperadas está faltando. O arquivo recebido como `produtora-ana.jfif` já corresponde a `img/produtor-ana.jpg`. Logo e selo seguem ilustrativos. Os JPGs recebidos foram preservados; descrições e enquadramento foram ajustados nas páginas. A transcrição foi sincronizada com a saudação real. Os arquivos de áudio já estavam no repositório e foram mantidos.

## Integrantes

Grupo confirmado com quatro integrantes: Alexander Felipe Duarte Narcizo, Deborah Crystine Ramallo Guimarães, Letícia Oliveira de Jesus e Victoria Lima dos Santos. Os quatro nomes estão mantidos na capa.

## Pendências de entrega

- Enviar o arquivo compactado no Moodle dentro do prazo. Link do GitHub não é aceito como entrega.
- Ensaiar no computador e nos alto-falantes que serão usados no campus.
- O conteúdo comercial é fictício. As imagens não comprovam variedades, certificação orgânica ou identidade dos produtores.

## Testes executados

Em Chromium, com servidor HTTP local e bloqueio de requisições externas:

- Seis páginas em 360, 768 e 1200 px, sem transbordamento horizontal da página.
- Caminhos locais válidos, imagens decodificadas e fontes carregadas.
- Menu móvel e filtros: 2 frutas ou 12 produtos.
- Cadastro vazio rejeitado; preenchimento válido abre modal; entrada HTML aparece como texto; senha não aparece; limpar restaura campos.
- Contato vazio rejeitado e confirmação do preenchimento válido.
- JSON carregado com 12 registros; falha HTTP simulada preserva 12 linhas estáticas; tabela presente sem JavaScript.
- Áudio MP3 decodificado e reprodução iniciada no navegador; duração de 12,45 segundos. Arquivo mono, 64 kbps confirmado com ffprobe.
- Sintaxe JavaScript verificada com `node --check`, sem erros de execução nos fluxos testados.
- PDF com 7 páginas, renderizado e inspecionado.

Não foram testados aparelhos físicos, Safari/Firefox, leitor de tela, equipamento de som do campus ou envio no Moodle. Não houve auditoria completa de acessibilidade. Os testes automatizados do navegador não substituem o ensaio do grupo.
