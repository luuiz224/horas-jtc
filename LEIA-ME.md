# Controle de Horas JTC

Página única (GitHub Pages) que grava numa planilha do Google via Apps Script.
A planilha é o banco de dados; a página é só a tela. Luiz e Wilson lançam, conferem e exportam no mesmo lugar.

## 1. Planilha + Apps Script (uma vez, ~5 min)

1. Crie uma planilha nova no Google Sheets, por exemplo "Horas JTC".
2. **Extensões > Apps Script**. Apague o conteúdo e cole o `Code.gs` inteiro.
3. Na linha `const CHAVE_INICIAL = 'troque-esta-chave';`, troque pela senha de vocês dois.
4. Na barra de cima, escolha a função **setup** e clique em **Executar**. Autorize com sua conta Google.
   Isso cria as abas `Lancamentos`, `Quinzenas` e `Config`.
5. **Implantar > Nova implantação > App da Web**
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
6. Copie a URL que termina em `/exec`.

> Ao alterar o `Code.gs` depois, use **Implantar > Gerenciar implantações > lápis > Nova versão**. Assim a URL não muda.
> Para trocar a chave: edite `CHAVE_INICIAL` e rode a função `trocarChave`.

## 2. Publicar a página no GitHub Pages

1. Crie um repositório (ex.: `horas-jtc`) e suba **só o `index.html`**.
2. **Settings > Pages > Source: Deploy from a branch > main / (root) > Save**.
3. Em 1–2 minutos a página fica em `https://SEU-USUARIO.github.io/horas-jtc/`.

Não suba o `historico-jul-set-2026.json` nem o `Code.gs` com a chave: o repositório é público.
Sem a chave, quem achar a página não lê nem grava nada.

## Instalar como app no Mac

O site é um PWA (manifest.webmanifest + sw.js + icones/). Depois de publicado:
- **Chrome**: ícone ⊕ "Instalar" na barra de endereço, ou menu ⋮ → Transmitir, salvar e compartilhar → Instalar página como app.
  Opcional: no app aberto, o botão ⌄ da barra de título ("ocultar barra de título") faz a barra preta do site virar a barra da janela.
- **Safari** (macOS Sonoma+): Arquivo → Adicionar ao Dock. O app do Safari tem armazenamento próprio: preencha a conexão uma vez nele.

O service worker só guarda a página e os ícones; a planilha do Google nunca passa por ele.
Os ícones vêm de icones/icone-mac.svg (Dock) e icones/icone-cheio.svg (versão recortável).

## 3. Primeiro acesso (cada um, no próprio Mac)

Abra a página e preencha **Conexão**: a URL `/exec`, a chave e o seu nome (Luiz ou Wilson).
Fica salvo naquele navegador.

## 4. Importar o histórico (só uma vez, com a planilha vazia)

Na faixa azul "A planilha está vazia", clique em **Importar histórico…** e escolha `historico-jul-set-2026.json`.
São 39 lançamentos de 01/07 a 24/09 consolidados das várias versões das planilhas. As linhas com dúvida vêm com um aviso amarelo.

## Fluxo da quinzena

1. Luiz lança as horas em **Lançar horas** (ou tecla `N`). Formatos: `2h30`, `2:30`, `2,5` ou `45min`; a página mostra como entendeu.
   **Salvar e lançar outro** deixa o formulário aberto para o próximo.
   **Colar da IA**: no fim de qualquer conversa (Claude, ChatGPT, com ou sem modo code), cole o prompt do botão **Copiar prompt**
   (também em Configuração). Copie a resposta da IA e cole na página com **Cmd+V** em qualquer lugar, ou pelo botão **Colar da IA**.
   A página lê um ou vários blocos `=== LANÇAMENTO JTC ===`, mostra tudo para revisar (horas em branco ficam marcadas,
   repetidos são avisados) e lança de uma vez. Para pular o passo do prompt, deixe o texto dele nas instruções de um Projeto
   do Claude ou nas instruções personalizadas do ChatGPT e peça só "gera o lançamento".
2. Wilson clica em **Conferir** direto na linha, ou abre o lançamento e usa **Apontar divergência** com o motivo escrito.
   No painel do lançamento ficam a descrição completa, a conversa e o histórico de alterações.
3. Com tudo conferido: **Baixar XLSX** (mesmo modelo da planilha da JTC) ou **Copiar** para colar no Excel.
4. **Marcar como enviada**: horas, datas e exclusões daquela quinzena ficam travadas.
   Se precisar corrigir, **Reabrir quinzena**. Fica registrado quem reabriu e o que mudou depois do envio.

**Relatórios** (barra lateral): escolha o período por atalho (quinzena atual, este mês, mês passado, últimos 3 meses, este ano, tudo)
ou pelas datas De/Até, filtre por quinzenas enviadas/abertas e por serviço. Mostra faturamento, horas, dias trabalhados,
quanto já foi enviado à JTC, totais por mês, por serviço e por quinzena, e baixa o XLSX do período no modelo JTC.
O valor usa o valor da hora atual da Configuração.

**Dias úteis sem lançamento**: dias de segunda a sexta já passados, sem nenhuma hora, numa quinzena aberta, ficam
tracejados em amarelo na régua e aparecem num aviso no topo; clicar no dia abre o formulário com a data preenchida.
Feriado ou folga: "Não trabalhei nesses dias" para de avisar (fica salvo no navegador). Só conta a partir do primeiro lançamento.

**Buscar em tudo** (🔍 na barra de cima, `/` ou Cmd+K): procura em todas as quinzenas, no serviço, observações,
solicitante e comentários, sem diferenciar acento; mostra total de horas e valor do que achou. Clique leva ao lançamento.

**Meta da quinzena** (Configuração, salva no navegador): barra de EXP no resumo com quanto falta e o ritmo por dia útil
restante; ao bater a meta aparece LEVEL UP.

**Evolução**: ao lado da barra de EXP, Charmander vira Charmeleon na metade da meta e Charizard ao bater a meta
(sem meta definida, usa 40h). **Insígnias**: 8 conquistas em "Todas as quinzenas". **Sons 8-bit** ao lançar, conferir,
enviar e nas conquistas, com botão de ligar/desligar na barra de cima e em Configuração. Avisos de conquista só aparecem
para o que for conquistado depois da primeira visita naquele navegador.

Atalhos: `N` novo lançamento, `←`/`→` troca de quinzena, `Esc` fecha o painel. Tema claro/escuro no botão da barra de cima ou em Configuração.

Quinzenas: 1ª = dias 01–15, 2ª = dia 16 até o fim do mês, sempre pela data do lançamento.
A página atualiza sozinha a cada 90 s e quando você volta para a aba (menos enquanto alguém está digitando). Se duas pessoas editarem a mesma linha ao mesmo tempo, a segunda é avisada e ninguém sobrescreve ninguém.
