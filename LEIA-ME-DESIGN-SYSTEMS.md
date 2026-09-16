# Site Aretê com Design Systems

## Arquivos prontos para o GitHub

Este ZIP já contém o site completo da Aretê com a subpágina integrada. Envie o conteúdo da pasta `arete-site-main` para a raiz do repositório que publica o site, preservando a estrutura das pastas.

A home dos Design Systems fica em `design-systems/index.html`. O caminho publicado será `/design-systems/` no domínio da Aretê. A área Projearth fica em `design-systems/projearth/`.

O site institucional, a subpágina `escala`, seus arquivos e o domínio em `CNAME` foram preservados. A subpágina de Design Systems não foi adicionada ao menu público do site institucional. Não há botão para sair do DS e ir ao site institucional.

## Identidade e navegação

- A home da lista de empresas usa a identidade da Aretê.
- A área Projearth carrega somente os estilos próprios do DS: azul-marinho `#1C3758`, azul `#0081C8`, turquesa `#35C3C7`, azul-claro `#C5E6F1`, verde-claro `#CAE1D0`, creme `#F9F9ED` e branco.
- O menu lateral, os estados ativos, botões, campos, cartões e banco de ícones seguem essa identidade. Os neutros são derivados da paleta. Cores funcionais de erro, atenção e sucesso mantêm sua finalidade.
- A tipografia do cliente é Barlow. As fontes ficam no próprio pacote.
- Busca de seções aceita termos com ou sem acentos. Enter abre o primeiro resultado. Escape limpa a busca ou fecha o menu móvel quando a busca está vazia.
- Há navegação anterior/próxima entre seções e um único botão global **Voltar à home**.
- O menu no celular mantém o foco dentro da navegação enquanto está aberto.
- Animações de entrada, menus, cartões e controles são breves e respeitam a preferência do sistema por movimento reduzido.

## Download para reutilizar o DS

O único download de página está no banner da Projearth: **Baixar visão geral**. O HTML abre na visão geral e inclui todas as 17 seções, componentes, estados, logotipo, grafismos, fontes e banco de 447 ícones. Funciona sem depender de arquivos externos.

Use esse HTML como referência de identidade junto do modelo de fluxograma ou journey map e do conteúdo do novo documento. A estrutura do fluxo/jornada vem do modelo; cores, tipografia e ícones vêm do DS do cliente. Os documentos de exemplo não foram publicados dentro do site.

Os downloads próprios de recursos, como SVGs de ícones e grafismos, continuam disponíveis dentro do DS.

## Atualizações futuras

A pasta `ds-source/` contém as fontes editáveis. Para alterar o DS e regenerar os arquivos prontos, use Python 3 e execute na raiz deste pacote:

```bash
python3 ds-source/build.py
```

Não exige instalação de pacotes. O comando atualiza somente `design-systems/` e o JavaScript compilado de referência em `ds-source/`. Cada novo cliente deve ter sua própria área e seus próprios tokens de marca. Não importe o CSS institucional da Aretê para as páginas dos clientes.

## Acesso e verificações

As páginas DS incluem `noindex, nofollow, noarchive`. Elas não têm autenticação: qualquer pessoa com o endereço poderá acessá-las. Um repositório público também permite consultar seus arquivos.

Verificados: estrutura do ZIP, preservação dos arquivos institucionais, referências relativas, fontes e imagens, busca com/sem acentos, busca vazia, limpeza de filtros, limites da navegação, estados de campos e alertas, banco com 447 ícones, download autônomo e contraste dos principais pares de texto/fundo. A prévia visual em navegador não ficou disponível devido à política do ambiente; essa verificação não é uma auditoria completa de acessibilidade.
