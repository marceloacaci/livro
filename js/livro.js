/**
 * livro.html — página genérica do livro
 * Carrega conteúdo dinamicamente a partir de books.js
 */
(function () {
  'use strict';

  // Helper local de escape (o main.js define o seu; este módulo é autocontido)
  function escapeAttr(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  var books = window.LIVRO_BOOKS || [];

  // btnClearAll e sidebarBookHome são locais do app.js (outro IIFE); buscamos no DOM
  // para não depender de variáveis de escopo alheio (corrige ReferenceError em livro.html).
  var btnClearAll = document.getElementById('btnClearAll');
  var sidebarBookHome = document.getElementById('sidebarBookHome');

  // Shared scroll-spy state (rebuilt on each render, read by the once-attached scroll listener)
  var allNavTargets = [];
  window.updateActiveNavV2 = function () {};

  // Resolve a book by its short id OR its full-name slug (e.g. #o-poder-da-acao-financeira)
  function resolveBook(id) {
    if (!id) return null;
    return books.find(function (b) { return b.id === id || b.slug === id; }) || null;
  }

  function renderBook(book) {
    if (!book) {
      document.body.innerHTML = '<div class="container"><h1>Livro não encontrado</h1><p><a href="index.html">Voltar para a biblioteca</a></p></div>';
      return;
    }

    var heroCover = document.getElementById('heroCover');
    var coverImg = new Image();
    coverImg.onload = function () { heroCover.src = book.cover; };
    coverImg.onerror = function () {
      if (typeof window.bookCoverFallback === 'function') {
        heroCover.onerror = null;
        heroCover.setAttribute('data-color', book.color || '#2980b9');
        heroCover.setAttribute('data-title', (book.titlePt || book.title).toUpperCase().slice(0, 28));
        heroCover.setAttribute('data-author', book.author || '');
        window.bookCoverFallback(heroCover);
      } else {
        heroCover.src = book.cover;
      }
    };
    coverImg.src = book.cover;
  heroCover.alt = 'Capa ' + book.title;
  document.getElementById('heroTitle').textContent = book.titlePt;
  document.getElementById('heroLead').textContent = book.summary;
  document.title = 'Reflexões — ' + book.titlePt;
  // SEO/OG dinâmico (P3)
  function setMeta(attr, key, value) {
    var sel = 'meta[' + attr + '="' + key + '"]';
    var m = document.querySelector(sel);
    if (!m) { m = document.createElement('meta'); m.setAttribute(attr, key); document.head.appendChild(m); }
    m.setAttribute('content', value);
  }
  document.querySelector('meta[name="description"]') && setMeta('name', 'description', book.summary || book.titlePt);
  setMeta('property', 'og:title', 'Reflexões — ' + book.titlePt);
  setMeta('property', 'og:description', book.summary || book.titlePt);
  setMeta('property', 'og:image', book.cover || '');
  document.getElementById('footerText').textContent = 'Ambiente de Reflexões — ' + book.title + ' © 2026';

  var sidebarBookTitle = document.getElementById('sidebarBookTitle');
  if (sidebarBookTitle) {
    sidebarBookTitle.textContent = book.titlePt;
  }

  var sobreHtml = '';
  sobreHtml += '<div class="book-meta">';
  sobreHtml += '  <h3>' + book.title + '</h3>';
  sobreHtml += '  <p class="author">' + book.author + '</p>';
  sobreHtml += '  <p class="original-title">Título original: <em>' + book.title + '</em></p>';
  sobreHtml += '  <p class="portuguese-title">Título em português: <em>' + book.titlePt + '</em></p>';
  sobreHtml += '  <p class="original-title">Editora: ' + book.publisher + ' · Publicado em ' + book.year + '</p>';
  sobreHtml += '  <p class="portuguese-title">Gênero: ' + book.genre + ' · ' + book.language + ' · ' + book.pages + ' páginas</p>';
  sobreHtml += '  <p class="portuguese-title">Vendas registradas: ' + book.copiesSold + '</p>';
  sobreHtml += '</div>';
  sobreHtml += '<div class="book-details">';
  sobreHtml += '  <h4>Detalhes</h4>';
  sobreHtml += '  <ul>';
  sobreHtml += '    <li><strong>Gênero:</strong> ' + book.genre + '</li>';
  sobreHtml += '    <li><strong>Páginas:</strong> ' + book.pages + '</li>';
  sobreHtml += '    <li><strong>Idioma original:</strong> ' + book.language + '</li>';
  sobreHtml += '  </ul>';
  sobreHtml += '</div>';
  function renderCitacoesCard(titulo, lista) {
    var html = '<div class="book-citacoes">';
    html += '  <h4>' + titulo + '</h4>';
    html += '  <div class="citacoes-lista">';
    lista.forEach(function (c) {
      var credito = c.autor + (c.obra ? ', ' + c.obra : '') + (c.fonte ? ' · ' + c.fonte : '');
      var copyText = '“' + c.texto + '” — ' + credito;
      html += '    <blockquote class="citacao">' +
        '<p class="citacao-texto">&ldquo;' + c.texto + '&rdquo;</p>' +
        '<footer class="citacao-autor">&mdash; ' + credito + '</footer>' +
        '<button type="button" class="btn-copiar-citacao" data-copy-text="' + escapeAttr(copyText) + '">Copiar</button>' +
        '</blockquote>';
    });
    html += '  </div>';
    html += '</div>';
    return html;
  }

  // B7 — Copiar Citação (Clipboard API, sem libs externas)
  function bindCopiarCitacao(scope) {
    if (!scope) return;
    scope.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('.btn-copiar-citacao') : null;
      if (!btn) return;
      var text = btn.getAttribute('data-copy-text') || '';
      var done = function () {
        var old = btn.textContent;
        btn.textContent = 'Copiado!';
        btn.classList.add('copiado');
        setTimeout(function () { btn.textContent = old; btn.classList.remove('copiado'); }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, done); });
      } else {
        fallbackCopy(text, done);
      }
    });
  }
  function fallbackCopy(text, done) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'absolute'; ta.style.left = '-9999px';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      done();
    } catch (err) { /* silencioso */ }
  }

  if (book.citacoes && book.citacoes.length) {
    sobreHtml += renderCitacoesCard('Citações do autor', book.citacoes);
  }
  if (book.citacoesTerceiros && book.citacoesTerceiros.length) {
    sobreHtml += renderCitacoesCard('O que estão dizendo sobre este livro', book.citacoesTerceiros);
  }
  document.getElementById('sobreContent').innerHTML = sobreHtml;

  var sectionsContainer = document.getElementById('bookSections');
  sectionsContainer.innerHTML = '';

  var myths = book.myths || [];

  var topic = book.topic || 'mudança de comportamento';
  document.getElementById('verdadesMitOSSubtitle').textContent = book.author + ' desmente ideias comuns sobre ' + topic + '. Aqui estão os paralelos entre as verdades e os mitos apresentados no livro, com reflexões para cada um.';

  var mythsHtml = '';
  myths.forEach(function (m) {
    mythsHtml += '<div class="mt-card" data-book="' + book.id + '">';
    mythsHtml += '  <div class="mt-badge ' + m.type + '">' + (m.type === 'truth' ? 'Verdade' : 'Mito') + '</div>';
    mythsHtml += '  <h4>' + m.title + '</h4>';
    mythsHtml += '  <p>' + m.text + '</p>';
    mythsHtml += '  <div class="mt-reflection"><p><strong>📝 Reflexão:</strong> ' + m.reflection + '</p></div>';
    mythsHtml += '</div>';
  });
  document.getElementById('verdadesMitosContent').innerHTML = mythsHtml;

  // One reflection field for the whole Verdades e Mitos section
  var vmReflection = document.createElement('div');
  vmReflection.className = 'reflection-questions verdades-reflection';
  vmReflection.innerHTML =
    '<h3>📝 Sua reflexão sobre Verdades e Mitos</h3>' +
    '<textarea class="reflection-input" data-step="verdadesmitos" placeholder="Escreva aqui sua reflexão após ler as verdades e os mitos..."></textarea>' +
    '<div class="step-actions"><button class="btn btn-save" data-step="verdadesmitos">💾 Salvar Reflexão</button><button class="btn btn-clear" data-step="verdadesmitos">🗑️ Limpar</button></div>';
  var verdadesCard = document.getElementById('verdadesCard');
  verdadesCard.appendChild(vmReflection);

  var bookTabs = document.querySelectorAll('.book-tab');
  var currentBook = 'both';

  function setBookFilter(selected) {
    currentBook = selected;
    bookTabs.forEach(function (tab) {
      tab.classList.toggle('active', tab.getAttribute('data-book') === selected);
    });

    document.querySelectorAll('[data-book]').forEach(function (el) {
      var bookAttr = el.getAttribute('data-book');
      if (selected === 'both' || bookAttr === 'both' || bookAttr === selected) {
        el.classList.remove('book-hidden');
      } else {
        el.classList.add('book-hidden');
      }
    });
  }

  bookTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      setBookFilter(tab.getAttribute('data-book'));
    });
  });

  var reflexoesList = document.getElementById('reflexoesList');
  var STORAGE_KEY = 'biblioteca_reflexoes';
  var STORAGE_KEY_LEGACY = 'meubolso_reflexoes';

  // Nova estrutura: reflexoes[step] = array de { id, text, createdAt, updatedAt }
  function loadReflexoes() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      if (!data && STORAGE_KEY_LEGACY) {
        var legacy = localStorage.getItem(STORAGE_KEY_LEGACY);
        if (legacy) {
          localStorage.setItem(STORAGE_KEY, legacy);
          localStorage.removeItem(STORAGE_KEY_LEGACY);
          data = legacy;
        }
      }
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  function saveReflexoes(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      if (typeof dirHandle !== 'undefined' && dirHandle) salvarPasta();
    } catch (e) {
      alert('Não foi possível salvar. O armazenamento local pode estar cheio.');
    }
  }

  function genId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
    return 'n-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  }

  function fmtDateTime(iso) {
    try {
      var d = new Date(iso);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (e) { return ''; }
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str == null ? '' : String(str)));
    return div.innerHTML;
  }

  // ---------------------------------------------------------------------------
  // Operações sobre notas de uma seção (step)
  // ---------------------------------------------------------------------------
  function addReflexao(step, text) {
    text = (text || '').trim();
    if (!text) return false;
    var reflexoes = loadReflexoes();
    var now = new Date().toISOString();
    if (!Array.isArray(reflexoes[step])) reflexoes[step] = [];
    reflexoes[step].push({ id: genId(), text: text, createdAt: now, updatedAt: now });
    saveReflexoes(reflexoes);
    renderAll();
    return true;
  }

  function updateReflexao(step, id, text) {
    text = (text || '').trim();
    var reflexoes = loadReflexoes();
    var list = Array.isArray(reflexoes[step]) ? reflexoes[step] : [];
    var note = list.filter(function (n) { return n.id === id; })[0];
    if (!note) return;
    if (!text) { deleteReflexao(step, id); return; }
    note.text = text;
    note.updatedAt = new Date().toISOString();
    saveReflexoes(reflexoes);
    renderAll();
  }

  function deleteReflexao(step, id) {
    var reflexoes = loadReflexoes();
    if (!Array.isArray(reflexoes[step])) return;
    reflexoes[step] = reflexoes[step].filter(function (n) { return n.id !== id; });
    if (reflexoes[step].length === 0) delete reflexoes[step];
    saveReflexoes(reflexoes);
    renderAll();
  }

  // Salvar (botão da seção): adiciona nova nota com o texto do textarea e limpa o campo.
  function saveReflexao(step) {
    var textarea = document.querySelector('.reflection-input[data-step="' + step + '"]');
    if (!textarea) return;
    var ok = addReflexao(step, textarea.value);
    if (ok) {
      textarea.value = '';
      var btn = textarea.parentElement ? textarea.parentElement.querySelector('.btn-save') : null;
      if (btn) {
        var original = btn.textContent;
        btn.textContent = '✅ Salvo!';
        btn.disabled = true;
        setTimeout(function () { btn.textContent = original; btn.disabled = false; }, 1500);
      }
    } else if (!textarea.value.trim()) {
      // nada a salvar
    }
  }

  function clearReflexao(step) {
    var textarea = document.querySelector('.reflection-input[data-step="' + step + '"]');
    if (textarea) textarea.value = '';
    // "Limpar" apenas esvazia o campo (não apaga notas salvas); para apagar use Excluir na nota.
    var btn = textarea && textarea.parentElement ? textarea.parentElement.querySelector('.btn-clear') : null;
    if (btn) {
      var original = btn.textContent;
      btn.textContent = '🗑️ Limpo!';
      setTimeout(function () { btn.textContent = original; }, 1200);
    }
  }

  function clearAllReflexoes() {
    if (!confirm('Tem certeza? Todas as reflexões salvas serão apagadas.')) return;
    localStorage.removeItem(STORAGE_KEY);
    renderAll();
    document.querySelectorAll('.reflection-input').forEach(function (ta) { ta.value = ''; });
  }

  // ---- Persistência em pasta do projeto (File System Access API) ----
  var dirHandle = null;
  var pastaStatusEl = document.getElementById('pastaStatus');
  var btnConectarPasta = document.getElementById('btnConectarPasta');
  var btnSalvarPasta = document.getElementById('btnSalvarPasta');

  function setPastaStatus(msg, ok) {
    if (pastaStatusEl) {
      pastaStatusEl.textContent = msg || '';
      pastaStatusEl.className = 'pasta-status' + (ok === false ? ' pasta-status-erro' : (ok === true ? ' pasta-status-ok' : ''));
      pastaStatusEl.setAttribute('style', 'font-size:0.85em;opacity:0.85;' + (ok === true ? 'color:#2e7d32;' : (ok === false ? 'color:#c62828;' : '')));
    }
  }

  async function salvarPasta() {
    if (!dirHandle) return;
    try {
      var data = loadReflexoes();
      var fileHandle = await dirHandle.getFileHandle('reflexoes.json', { create: true });
      var writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify(data, null, 2));
      await writable.close();
      setPastaStatus('Salvo em Minhas Reflexões/reflexoes.json ✓', true);
    } catch (e) {
      setPastaStatus('Falha ao salvar na pasta: ' + (e ? e.message : e), false);
    }
  }

  async function lerPasta() {
    if (!dirHandle) return;
    try {
      var fileHandle = await dirHandle.getFileHandle('reflexoes.json');
      var file = await fileHandle.getFile();
      var txt = await file.text();
      if (!txt) return;
      var data = JSON.parse(txt);
      if (data && typeof data === 'object') {
        var atuais = loadReflexoes();
        Object.keys(data).forEach(function (k) {
          if (!atuais[k] || (data[k] && data[k].savedAt && (!atuais[k].savedAt || data[k].savedAt > atuais[k].savedAt))) {
            atuais[k] = data[k];
          }
        });
        saveReflexoes(atuais);
        renderReflexoes();
        loadSavedIntoTextareas();
        setPastaStatus('Reflexões da pasta carregadas ✓', true);
      }
    } catch (e) {
      if (e && e.name !== 'NotFoundError') setPastaStatus('Não foi possível ler a pasta: ' + (e ? e.message : e), false);
    }
  }

  async function conectarPasta() {
    if (!('showDirectoryPicker' in window)) {
      alert('Seu navegador não suporta acesso a pasta (use Edge ou Chrome recente em http://localhost). As reflexões continuam salvas no localStorage deste navegador.');
      return;
    }
    try {
      dirHandle = await window.showDirectoryPicker();
      if (btnSalvarPasta) btnSalvarPasta.style.display = 'inline-flex';
      if (btnConectarPasta) btnConectarPasta.textContent = '🔗 Pasta: ' + dirHandle.name;
      setPastaStatus('Pasta conectada. Salvando...', true);
      await salvarPasta();
      await lerPasta();
    } catch (e) {
      if (e && e.name === 'AbortError') { setPastaStatus('Conexão cancelada.', false); return; }
      setPastaStatus('Erro ao conectar pasta: ' + (e ? e.message : e), false);
    }
  }

  if (btnConectarPasta) btnConectarPasta.addEventListener('click', conectarPasta);
  if (btnSalvarPasta) btnSalvarPasta.addEventListener('click', salvarPasta);

  var stepLabels = book.stepLabels || {};

  function sectionLabel(key) {
    var label = stepLabels[key] || key;
    if (label === key) {
      if (key.indexOf('idea-') === 0) label = 'Ideia Central ' + key.replace('idea-', '');
      else if (key === 'verdadesmitos') label = 'Verdades e Mitos';
    }
    return label;
  }

  // Renderiza a lista de notas INLINE de uma seção, acima do textarea.
  function renderReflexoesInSection(step) {
    var textarea = document.querySelector('.reflection-input[data-step="' + step + '"]');
    if (!textarea) return;
    var parent = textarea.parentElement;
    if (!parent) return;

    var container = parent.querySelector('.reflexao-notas[data-step="' + step + '"]');
    if (!container) {
      container = document.createElement('div');
      container.className = 'reflexao-notas';
      container.setAttribute('data-step', step);
      parent.insertBefore(container, textarea); // acima do campo de digitação
    }

    var reflexoes = loadReflexoes();
    var list = Array.isArray(reflexoes[step]) ? reflexoes[step] : [];
    if (list.length === 0) { container.innerHTML = ''; container.style.display = 'none'; return; }
    container.style.display = '';

    var html = '';
    list.forEach(function (note) {
      html += '<div class="reflexao-card" data-note="' + escapeHtml(note.id) + '">';
      html += '  <div class="reflexao-text">' + escapeHtml(note.text) + '</div>';
      html += '  <div class="reflexao-meta">';
      html += '    <span>📅 ' + escapeHtml(fmtDateTime(note.createdAt)) + '</span>';
      if (note.updatedAt && note.updatedAt !== note.createdAt) {
        html += '    <span>✏️ editado em ' + escapeHtml(fmtDateTime(note.updatedAt)) + '</span>';
      }
      html += '    <span class="reflexao-actions">';
      html += '      <button class="reflexao-edit" data-step="' + escapeHtml(step) + '" data-note="' + escapeHtml(note.id) + '">✏️ Editar</button>';
      html += '      <button class="reflexao-delete" data-step="' + escapeHtml(step) + '" data-note="' + escapeHtml(note.id) + '">🗑️ Excluir</button>';
      html += '    </span>';
      html += '  </div>';
      html += '</div>';
    });
    container.innerHTML = html;
  }

  // Renderiza TODAS as notas na seção global "Minhas Reflexões Salvas" (fim da página).
  function renderReflexoes() {
    var reflexoes = loadReflexoes();
    var keys = Object.keys(reflexoes).filter(function (k) { return Array.isArray(reflexoes[k]) && reflexoes[k].length; });

    if (keys.length === 0) {
      reflexoesList.innerHTML = '<p class="empty-state">Nenhuma reflexão salva ainda. Vá para uma seção acima e comece a escrever!</p>';
      btnClearAll.style.display = 'none';
      return;
    }
    btnClearAll.style.display = 'inline-flex';

    var html = '';
    var sortedKeys = keys.slice().reverse();
    sortedKeys.forEach(function (key) {
      var label = sectionLabel(key);
      reflexoes[key].forEach(function (note) {
        html += '<div class="reflexao-card" data-note="' + escapeHtml(note.id) + '">';
        html += '  <div class="reflexao-meta"><span class="reflexao-step">' + escapeHtml(label) + '</span></div>';
        html += '  <div class="reflexao-text">' + escapeHtml(note.text) + '</div>';
        html += '  <div class="reflexao-meta">';
        html += '    <span>📅 ' + escapeHtml(fmtDateTime(note.createdAt)) + '</span>';
        if (note.updatedAt && note.updatedAt !== note.createdAt) {
          html += '    <span>✏️ editado em ' + escapeHtml(fmtDateTime(note.updatedAt)) + '</span>';
        }
        html += '    <span class="reflexao-actions">';
        html += '      <button class="reflexao-edit" data-step="' + escapeHtml(key) + '" data-note="' + escapeHtml(note.id) + '">✏️ Editar</button>';
        html += '      <button class="reflexao-delete" data-step="' + escapeHtml(key) + '" data-note="' + escapeHtml(note.id) + '">🗑️ Excluir</button>';
        html += '    </span>';
        html += '  </div>';
        html += '</div>';
      });
    });
    reflexoesList.innerHTML = html;
  }

  // Renderiza tanto a lista global quanto as listas inline de cada seção.
  function renderAll() {
    renderReflexoes();
    document.querySelectorAll('.reflection-input').forEach(function (ta) {
      var step = ta.getAttribute('data-step');
      if (step) renderReflexoesInSection(step);
    });
  }

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-save')) {
      var step = e.target.getAttribute('data-step');
      saveReflexao(step);
    }

    if (e.target.classList.contains('btn-clear')) {
      var step = e.target.getAttribute('data-step');
      clearReflexao(step);
    }

    // Excluir nota (inline ou seção global)
    if (e.target.classList.contains('reflexao-delete')) {
      var dStep = e.target.getAttribute('data-step');
      var dNote = e.target.getAttribute('data-note');
      if (confirm('Excluir esta reflexão?')) deleteReflexao(dStep, dNote);
    }

    // Editar nota: troca o card por um editor inline
    if (e.target.classList.contains('reflexao-edit')) {
      var edStep = e.target.getAttribute('data-step');
      var edNote = e.target.getAttribute('data-note');
      startEditReflexao(edStep, edNote);
    }
  });

  // Substitui o card da nota por um editor inline (textarea + Salvar/Cancelar).
  function startEditReflexao(step, id) {
    var reflexoes = loadReflexoes();
    var list = Array.isArray(reflexoes[step]) ? reflexoes[step] : [];
    var note = list.filter(function (n) { return n.id === id; })[0];
    if (!note) return;

    var card = document.querySelector('.reflexao-card[data-note="' + id + '"]');
    if (!card) return;

    card.innerHTML = '';
    var ta = document.createElement('textarea');
    ta.className = 'reflection-input reflexao-edit-input';
    ta.value = note.text;
    card.appendChild(ta);

    var actions = document.createElement('div');
    actions.className = 'reflexao-meta';
    actions.innerHTML = '<span class="reflexao-actions">' +
      '<button class="reflexao-save" data-step="' + escapeHtml(step) + '" data-note="' + escapeHtml(id) + '">💾 Salvar</button>' +
      '<button class="reflexao-cancel" data-step="' + escapeHtml(step) + '" data-note="' + escapeHtml(id) + '">✖ Cancelar</button>' +
      '</span>';
    card.appendChild(actions);
    ta.focus();
  }

  // Handler para Salvar/Cancelar da edição inline (delegação).
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('reflexao-save')) {
      var sStep = e.target.getAttribute('data-step');
      var sNote = e.target.getAttribute('data-note');
      var card = document.querySelector('.reflexao-card[data-note="' + sNote + '"]');
      var ta = card ? card.querySelector('.reflexao-edit-input') : null;
      if (ta) updateReflexao(sStep, sNote, ta.value);
    }
    if (e.target.classList.contains('reflexao-cancel')) {
      renderAll(); // descarta e re-renderiza o card original
    }
  });

  btnClearAll.addEventListener('click', clearAllReflexoes);

  renderReflexoes();
  setTimeout(renderAll, 0); // garante render após montagem do conteúdo das seções

  function loadSavedIntoTextareas() {
    // Notas agora são exibidas em cards próprios (inline + seção global);
    // não é necessário pré-preencher o textarea de digitação.
    renderAll();
  }

  loadSavedIntoTextareas();

  var ideasHtml = '';
  var chapterSubmenu = '';
  if (book.chapters && book.chapters.length) {
    book.chapters.forEach(function (cap, idx) {
      var chapterId = 'chapter-' + (idx + 1);
      ideasHtml += '<div class="chapter-card" id="' + chapterId + '" data-book="' + book.id + '">';
      ideasHtml += '  <h3>' + cap.title + '</h3>';
      ideasHtml += '  <p>' + cap.text + '</p>';
      ideasHtml += '  <div class="chapter-key-points"><strong>Ideias centrais:</strong><ul>';
      cap.points.forEach(function (p) {
        if (typeof p === 'string') {
          ideasHtml += '<li><span class="kp-title">' + p + '</span></li>';
        } else {
          ideasHtml += '<li class="kp-item">';
          ideasHtml += '  <span class="kp-title">' + p.t + '</span>';
          ideasHtml += '  <blockquote class="kp-quote' + (p.real ? ' kp-real' : '') + '">&ldquo;' + p.f + '&rdquo;' + (p.real ? '' : ' <span class="kp-paraphrase">(paráfrase da ideia do autor)</span>') + '</blockquote>';
          ideasHtml += '</li>';
        }
      });
      ideasHtml += '  </ul></div>';
      ideasHtml += '  <div class="reflection-questions"><p><strong>📝 Reflexão deste capítulo:</strong></p>';
      ideasHtml += '    <textarea class="reflection-input" data-step="idea-' + (idx + 1) + '" placeholder="Escreva aqui sua reflexão sobre este capítulo..."></textarea>';
      ideasHtml += '    <div class="step-actions"><button class="btn btn-save" data-step="idea-' + (idx + 1) + '">💾 Salvar Reflexão</button><button class="btn btn-clear" data-step="idea-' + (idx + 1) + '">🗑️ Limpar</button></div>';
      ideasHtml += '  </div>';
      ideasHtml += '</div>';

      chapterSubmenu += '<li><a href="#' + chapterId + '" class="chapter-link" data-target="' + chapterId + '">' + (idx + 1) + '. ' + cap.title.replace(/^Capítulo \d+ —\s*/, '') + '</a></li>';
    });
  }

  var ideasSection = document.createElement('section');
  ideasSection.className = 'section';
  ideasSection.id = 'ideias';
  ideasSection.setAttribute('data-book', 'both');
  ideasSection.innerHTML = '<div class="container"><h2 class="section-title">Ideias Centrais</h2><div id="capitulosIdeiasContent" class="chapters-list">' + ideasHtml + '</div></div>';

  document.getElementById('ideasSections').appendChild(ideasSection);

  var chapterSubmenuEl = document.getElementById('chapterSubmenu');
  if (chapterSubmenuEl) {
    chapterSubmenuEl.innerHTML = chapterSubmenu;
  }

  var ideiasToggle = document.getElementById('ideiasToggle');
  if (ideiasToggle && chapterSubmenuEl) {
    ideiasToggle.addEventListener('click', function () {
      var open = chapterSubmenuEl.classList.toggle('open');
      ideiasToggle.setAttribute('aria-expanded', String(open));
      chapterSubmenuEl.style.maxHeight = open ? (chapterSubmenuEl.scrollHeight + 'px') : '0px';
      if (open) {
        var section = document.getElementById('ideias');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      this.blur();
    });
  }

  window.addEventListener('scroll', updateActiveNavV2, { passive: true });
  updateActiveNavV2();

  // B7 — Copiar Citação: amarra listeners (delegação) nos containers que têm citações
  bindCopiarCitacao(document.getElementById('sobreContent'));
  bindCopiarCitacao(document.getElementById('ideiasContent') || document.getElementById('ideias'));

  // B6 — Barra de progresso de leitura + B8 — Modo Leitura Focada
  var progressBar = document.getElementById('readingProgress');
  var lastScrollY = window.scrollY || 0;
  function onScrollExtras() {
    var scrollY = window.scrollY || window.pageYOffset || 0;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;
    if (progressBar) progressBar.style.width = pct + '%';
    // B8 — esconde header/footer ao rolar para baixo; mostra ao rolar para cima
    var body = document.body;
    if (scrollY > 120 && scrollY > lastScrollY) {
      body.classList.add('reading-focused');
    } else if (scrollY < lastScrollY) {
      body.classList.remove('reading-focused');
    }
    lastScrollY = scrollY;
  }
  window.addEventListener('scroll', onScrollExtras, { passive: true });
  onScrollExtras();

  function buildBabySteps() {
    var html = '';
    var steps = [
      { id: 'baby1', num: '1', title: 'R$ 1.000 em Fundo de Emergência', tip: 'Antes de atacar as dívidas, guarde uma pequena reserva de <strong>R$ 1.000</strong> para cobrir imprevistos.', reflections: [
        'Qual é a sua relação atual com imprevistos financeiros?',
        'Se você tivesse R$ 1.000 reservados hoje, qual seria a primeira coisa que te daria paz de espírito?',
        'O que te impede de guardar essa reserva agora?',
        'Ramsey diz que este fundo é sobre <em>proteção</em>, não sobre conforto. Como você entende essa diferença?'
      ]},
      { id: 'baby2', num: '2', title: 'Pagar as Dívidas com o Debt Snowball', tip: 'Liste todas as suas dívidas da <strong>menor para a maior</strong>. Pague o mínimo em todas, e jogue todo dinheiro extra na menor dívida.', reflections: [
        'Quais são suas dívidas atuais? Você consegue listá-las de menor para maior valor?',
        'Ramsey defende ignorar as taxas de juros nessa fase. Como você se sente sobre essa abordagem?',
        'Qual dívida, ao ser paga, te daria mais alívio emocional? Por quê?',
        'Como você pode celebrar suas vitórias sem sabotar o processo?'
      ]},
      { id: 'baby3', num: '3', title: '3 a 6 Meses de Despesas em Reserva', tip: 'Agora que as dívidas foram pagas, construa um <strong>fundo de emergência completo</strong> — de 3 a 6 meses de despesas essenciais.', reflections: [
        'Quanto você gasta por mês com despesas essenciais? Quanto seria 3 meses? 6 meses?',
        'Você já passou por um período sem renda ou com renda reduzida? O que aconteceu?',
        'O que "segurança financeira" significa para você na prática?'
      ]},
      { id: 'baby4', num: '4', title: 'Investir 15% da Renda na Preparação para Aposentadoria', tip: 'Invista <strong>15% da sua renda bruta</strong> em investimentos para aposentadoria.', reflections: [
        'Você investe atualmente? Se sim, quanto? Se não, qual é a sua desculpa principal?',
        'O que te impede de investir hoje?',
        'Se você começasse a investir R$ 500 por mês hoje, quanto teria em 20 anos? E em 30?'
      ]},
      { id: 'baby5', num: '5', title: 'Poupar para a Educação dos Filhos', tip: 'Se você tem filhos, comece a <strong>poupar para a educação deles</strong>.', reflections: [
        'Você tem filhos? Se sim, qual é a sua visão sobre como eles vão pagar a faculdade?',
        'Se você não tem filhos, como você planeja sua própria educação continuada?',
        'O que significa "investir no futuro da próxima geração" para você?'
      ]},
      { id: 'baby6', num: '6', title: 'Pagar a Casa Antecipadamente', tip: 'Pague sua hipoteca o mais rápido possível. Ramsey defende que uma casa <strong>totalmente paga</strong> é o pilar da liberdade financeira.', reflections: [
        'Você tem financiamento imobiliário? Quanto falta para pagar?',
        'O que você faria com o dinheiro que antes ia para a parcela da casa?'
      ]},
      { id: 'baby7', num: '7', title: 'Construir Riqueza e Dar', tip: 'A etapa final não é sobre acumular pela acumulação — é sobre <strong>gerar riqueza para ter liberdade de dar</strong>.', reflections: [
        'O que "riqueza" significa para você?',
        'Ramsey diz que a verdadeira riqueza não é o que você acumula, mas o que você <em>não precisa</em>.',
        'Qual legado financeiro você gostaria de deixar?'
      ]}
    ];

    steps.forEach(function (step) {
      html += '<section class="section" id="' + step.id + '" data-book="ramsey">';
      html += '  <div class="container">';
      html += '    <div class="step-header step-' + step.num + '">';
      html += '      <span class="step-number">' + step.num + '</span>';
      html += '      <h2>' + step.title + '</h2>';
      html += '    </div>';
      html += '    <div class="step-body">';
      html += '      <div class="tip-box"><h4>💡 A Dica Principal</h4><p>' + step.tip + '</p></div>';
      html += '      <div class="reflection-prompt"><h4>📝 Para Reflexão</h4><ul>';
      step.reflections.forEach(function (r) {
        html += '<li>' + r + '</li>';
      });
      html += '</ul></div>';
      html += '      <textarea class="reflection-input" data-step="' + step.id + '" placeholder="Escreva aqui suas reflexões..."></textarea>';
      html += '      <div class="step-actions">';
      html += '        <button class="btn btn-save" data-step="' + step.id + '">💾 Salvar Reflexão</button>';
      html += '        <button class="btn btn-clear" data-step="' + step.id + '">🗑️ Limpar</button>';
      html += '      </div>';
      html += '    </div>';
      html += '  </div>';
      html += '</section>';
    });

    return html;
  }

  function buildMicroHabits() {
    var html = '';
    var steps = [
      { id: 'micro1', num: '1', title: 'Micro-hábito 1: Faça algo tão pequeno que não dá para recusar', tip: 'Escolha um comportamento que você quer adotar e reduza-o à versão <strong>mais simples possível</strong>.', reflections: [
        'Qual hábito você gostaria de cultivar?',
        'Se você reduzir esse hábito à menor ação possível, qual seria?',
        'O que te impede de começar pequeno hoje mesmo?'
      ]},
      { id: 'micro2', num: '2', title: 'Micro-hábito 2: Use a âncora: "Depois que eu..., eu vou..."', tip: 'Amarre o novo hábito a uma rotina que já existe: <strong>"Depois que eu [comportamento atual], eu vou [novo comportamento pequeno]"</strong>.', reflections: [
        'Quais rotinas você já faz todos os dias sem pensar?',
        'Qual micro-hábito você quer criar? Qual seria a frase âncora perfeita?',
        'Por que confiar em uma rotina existente pode ser mais eficaz que motivação?'
      ]},
      { id: 'micro3', num: '3', title: 'Micro-hábito 3: Celebre cada sucesso, mesmo o menor', tip: 'Depois de completar o micro-hábito, faça algo que gere uma <strong>emoção positiva imediata</strong>.', reflections: [
        'Que tipo de celebração pequena seria natural para você?',
        'Você sente que celebrar "pouca coisa" é bobeira? Por quê?',
        'Fogg diz que sentimentos positivos criam hábitos. O que isso desperta em você?'
      ]},
      { id: 'micro4', num: '4', title: 'Micro-hábito 4: Faça o hábito antes de depender da motivação', tip: 'A <strong>motivação oscila</strong>. Não espere sentir "vontade" todos os dias.', reflections: [
        'Você já deixou de fazer algo por falta de motivação?',
        'O que você pode fazer nos dias de baixa energia para manter o hábito?'
      ]},
      { id: 'micro5', num: '5', title: 'Micro-hábito 5: Use a fórmula ABC', tip: 'A = Ancorar, B = Novo comportamento pequeno, C = Celebre. Junte essas 3 ações.', reflections: [
        'Qual âncora você pode usar hoje?',
        'Qual comportamento pequeno você pode praticar?',
        'Como vai celebrar depois?'
      ]},
      { id: 'micro6', num: '6', title: 'Micro-hábito 6: Experimente pequenos comportamentos sem julgamento', tip: 'A <strong>experimentação sem pressão</strong> reduz o medo de errar.', reflections: [
        'Qual hábito você evitou por medo de não ser "perfeito"?',
        'Como seria experimentar sem exigir resultados imediatos?'
      ]},
      { id: 'micro7', num: '7', title: 'Micro-hábito 7: Use "meanwhile habits" para usar o tempo morto', tip: 'Aproveite pequenos intervalos: <strong>enquanto espera, faça algo pequeno e positivo</strong>.', reflections: [
        'Quais "tempos mortos" você tem no dia?',
        'Que micro-hábito você pode inserir nesses intervalos?'
      ]},
      { id: 'micro8', num: '8', title: 'Micro-hábito 8: Crie uma identidade de pessoa que cumpre hábitos', tip: 'Cada micro-hábito completado <strong>fortalece a imagem de si mesmo</strong>.', reflections: [
        'Quem você quer ser daqui a 6 meses?',
        'Quais hábitos representam essa identidade?'
      ]}
    ];

    steps.forEach(function (step) {
      html += '<section class="section" id="' + step.id + '" data-book="fogg">';
      html += '  <div class="container">';
      html += '    <div class="step-header micro-step-' + step.num + '">';
      html += '      <span class="step-number">' + step.num + '</span>';
      html += '      <h2>' + step.title + '</h2>';
      html += '    </div>';
      html += '    <div class="step-body">';
      html += '      <div class="tip-box"><h4>💡 A Dica Principal</h4><p>' + step.tip + '</p></div>';
      html += '      <div class="reflection-prompt"><h4>📝 Para Reflexão</h4><ul>';
      step.reflections.forEach(function (r) {
        html += '<li>' + r + '</li>';
      });
      html += '</ul></div>';
      html += '      <textarea class="reflection-input" data-step="' + step.id + '" placeholder="Escreva aqui suas reflexões..."></textarea>';
      html += '      <div class="step-actions">';
      html += '        <button class="btn btn-save" data-step="' + step.id + '">💾 Salvar Reflexão</button>';
      html += '        <button class="btn btn-clear" data-step="' + step.id + '">🗑️ Limpar</button>';
      html += '      </div>';
      html += '    </div>';
      html += '  </div>';
      html += '</section>';
    });

    return html;
  }

  // --- Ensinamentos: toggle + submenu population + expanded cards ---
  var ensinamentosToggle = document.getElementById('ensinamentosToggle');
  var ensinamentosSubmenuEl = document.getElementById('ensinamentosSubmenu');
  var ensinamentosExpandedEl = document.getElementById('ensinamentosExpanded');
  if (ensinamentosToggle && ensinamentosSubmenuEl && ensinamentosExpandedEl && book.ensinamentos && book.ensinamentos.length) {
    var ensinamentosSubmenuHtml = '';
    var ensinamentosExpandedHtml = '';
    book.ensinamentos.forEach(function (item) {
      ensinamentosSubmenuHtml += '<li><a href="#ensinamento-expanded-' + item.number + '" class="chapter-link" data-ens-idx="' + item.number + '" data-target="ensinamento-expanded-' + item.number + '">' + item.number + '. ' + (item.title || item.text) + '</a></li>';
      ensinamentosExpandedHtml += '<div class="ensinamento-expanded-card" id="ensinamento-expanded-' + item.number + '" data-ens-idx="' + item.number + '">' +
        '<div class="expanded-header"><span class="ensinamento-number">' + item.number + '</span><h3>' + (item.title || item.text) + '</h3></div>' +
        '<div class="reflection-prompt">' + (item.text || item.title) + '</div>' +
        (item.explicacoes && item.explicacoes.length ? '<div class="ensinamento-explicacoes"><p><strong>Por que isso importa:</strong></p><ul>' + item.explicacoes.map(function (e) { return '<li>' + e + '</li>'; }).join('') + '</ul></div>' : '') +
        '<div class="reflection-questions"><p><strong>Para Reflexão:</strong></p><ul>' +
        '<li>Como esse ensinamento se aplica à sua realidade hoje?</li>' +
        '<li>Qual seria o primeiro pequeno passo para colocar isso em prática?</li>' +
        '<li>O que te impediria de agir conforme esse ensinamento nos próximos 7 dias?</li>' +
        '</ul></div>' +
        '<textarea class="reflection-input" data-step="ensinamento-' + item.number + '" placeholder="Escreva aqui suas reflexões..."></textarea>' +
        '<div class="step-actions">' +
        '<button class="btn btn-save" data-step="ensinamento-' + item.number + '">💾 Salvar Reflexão</button>' +
        '<button class="btn btn-clear" data-step="ensinamento-' + item.number + '">🗑️ Limpar</button>' +
        '</div></div>';
    });
    ensinamentosSubmenuEl.innerHTML = ensinamentosSubmenuHtml;
    ensinamentosExpandedEl.innerHTML = ensinamentosExpandedHtml;
  }

  // --- Click summary card button: scroll to target ensinamento expanded card (wired once via delegation) ---

  // --- Scroll-based active nav: single active item, includes reflections + submenu items + ensinamentos expanded ---
  // Resolve a stable document-absolute top for any element (rect-based top is unreliable
  // when the element lives inside a positioned wrapper, and scrolling itself changes it).
  function getDocTop(el) {
    var y = 0;
    var node = el;
    while (node) { y += node.offsetTop || 0; node = node.offsetParent; }
    return y;
  }
  allNavTargets = [];
  var navIds = ['inicio', 'sobre', 'ensinamentos', 'ideias', 'verdadesmitos', 'reflexoes'];
  var navMap = {};
  navIds.forEach(function (id) {
    var el = document.getElementById(id);
    if (!el && id === 'inicio-livro') {
      el = document.getElementById('inicio');
    }
    if (el) {
      navMap[id] = el;
      allNavTargets.push({ id: id, el: el, docTop: getDocTop(el) });
    }
  });
  document.querySelectorAll('.chapter-link').forEach(function (a) {
    var targetId = a.getAttribute('data-target');
    if (targetId) {
      var el = document.getElementById(targetId);
      if (el) allNavTargets.push({ id: targetId, el: el, link: a, docTop: getDocTop(el) });
    }
  });

  // Include ensinamentos expanded cards as scroll targets
  document.querySelectorAll('.ensinamento-expanded-card').forEach(function (card) {
    allNavTargets.push({ id: card.id, el: card, docTop: getDocTop(card) });
  });

  var suppressNavUpdate = false;

  window.updateActiveNavV2 = function () {
    if (suppressNavUpdate) return;
    var scrollY = window.scrollY || window.pageYOffset;
    var offset = 90;
    var currentId = 'inicio';
    var bestTop = -Infinity;
    allNavTargets.forEach(function (item) {
      var top = getDocTop(item.el);
      if (scrollY + offset >= top && top > bestTop) {
        bestTop = top;
        currentId = item.id;
      }
    });

    // remove active from all nav elements first
    document.querySelectorAll('.sidebar-link, .sidebar-toggle, .chapter-link').forEach(function (el) {
      el.classList.remove('active');
    });

    // highlight chapter links for ideias
    document.querySelectorAll('.chapter-link[data-target]').forEach(function (el) {
      if (el.getAttribute('data-target') === currentId) el.classList.add('active');
    });

    var chapSub = document.getElementById('chapterSubmenu');
    var ensSub = document.getElementById('ensinamentosSubmenu');
    var ideiasSubOpen = chapSub && chapSub.classList.contains('open');
    var ensSubOpen = ensSub && ensSub.classList.contains('open');
    // Ramsey safeguard: a very tall open submenu must never clip its last item.
    if (ideiasSubOpen && chapSub.scrollHeight > 0) chapSub.style.maxHeight = chapSub.scrollHeight + 'px';
    if (ensSubOpen && ensSub.scrollHeight > 0) ensSub.style.maxHeight = ensSub.scrollHeight + 'px';

    // Which top-level section "owns" the current scroll position.
    var sectionOwner = null;
    if (currentId === 'ensinamentos' || (currentId && currentId.indexOf('ensinamento-expanded-') === 0)) sectionOwner = 'ensinamentos';
    else if (currentId === 'ideias' || (currentId && currentId.indexOf('chapter-') === 0)) sectionOwner = 'ideias';

    // highlight toggles/sections:
    //  - OPEN (+): ONLY the child item is blue (the parent stays off).
    //  - COLLAPSED (-): ONLY the parent toggle is blue (the child is hidden anyway).
    //  - Edge: when OPEN but still at the bare section header (no child card yet),
    //    the parent indicates the section so it lights; once you scroll into a
    //    child card, only that child stays blue.
    document.querySelectorAll('.sidebar-toggle').forEach(function (el) {
      var nav = el.getAttribute('data-nav-id');
      var subOpen = (nav === 'ideias' && ideiasSubOpen) || (nav === 'ensinamentos' && ensSubOpen);
      var atHeader = (currentId === nav);
      if (nav === sectionOwner && (!subOpen || atHeader)) el.classList.add('active');
    });

  // highlight sidebar links excluding book home
    document.querySelectorAll('.sidebar-link').forEach(function (el) {
      if (el.id === 'sidebarBookHome') return;
      if (el.getAttribute('data-nav-id') === currentId) el.classList.add('active');
    });

    // highlight ensinamentos expanded card and corresponding submenu item
    if (currentId && currentId.indexOf('ensinamento-expanded-') === 0) {
      var idx = currentId.replace('ensinamento-expanded-', '');
      var target = document.querySelector('#ensinamentosSubmenu .chapter-link[data-ens-idx="' + idx + '"]');
      if (target) target.classList.add('active');
    }
    if (sidebarBookHome) {
      var isInicioSection = currentId === 'inicio';
      if (isInicioSection) sidebarBookHome.classList.add('active');
    }

    // "Minhas Reflexões" sits at the very bottom. When the user reaches the end
    // of the page, keep it focused — even if no reflection has been written yet.
    var docHeight = document.documentElement.scrollHeight;
    var maxScroll = docHeight - window.innerHeight;
    var nearBottom = window.scrollY >= maxScroll - 300;
    if (nearBottom) {
      var reflexLink = document.querySelector('.sidebar-link[data-nav-id="reflexoes"], .sidebar-toggle[data-nav-id="reflexoes"]');
      if (reflexLink) {
        document.querySelectorAll('.sidebar-link, .sidebar-toggle, .chapter-link').forEach(function (el) {
          el.classList.remove('active');
        });
        reflexLink.classList.add('active');
      }
    }
  }

  // Initially apply nav state
  updateActiveNavV2();

  } // ===== end renderBook =====

  // --- One-time static listeners (event delegation: survive re-renders) ---
  var sidebarEl = document.getElementById('sidebar');
  if (sidebarEl) {
    sidebarEl.addEventListener('click', function (e) {
      var link = e.target.closest('#ensinamentosSubmenu .chapter-link, #chapterSubmenu .chapter-link, .sidebar-link[href^="#"]');
      if (!link) return;
      // Drop keyboard focus so the purple :focus ring doesn't linger after a mouse click
      link.blur();
      e.preventDefault();
      var ensIdx = link.getAttribute('data-ens-idx');
      if (ensIdx) {
        var t1 = document.getElementById('ensinamento-expanded-' + ensIdx);
        if (t1) t1.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      var targetId = link.getAttribute('data-target');
      if (targetId) {
        var t2 = document.getElementById(targetId);
        if (t2) t2.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      var hash = link.getAttribute('href');
      if (hash && hash.indexOf('#') === 0 && hash.length > 1) {
        var t3 = document.getElementById(hash.slice(1));
        if (t3) t3.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Ensinamentos toggle (outside renderBook: fetch elements locally)
  var ensinamentosToggle = document.getElementById('ensinamentosToggle');
  if (ensinamentosToggle) {
    ensinamentosToggle.addEventListener('click', function () {
      var sub = document.getElementById('ensinamentosSubmenu');
      if (!sub) return;
      var open = sub.classList.toggle('open');
      ensinamentosToggle.setAttribute('aria-expanded', String(open));
      sub.style.maxHeight = open ? (sub.scrollHeight + 'px') : '0px';
      if (open) {
        var section = document.getElementById('ensinamentos');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      this.blur();
    });
  }

  // Scroll-spy (attached once; always calls the live updateActiveNavV2, which is
  // reassigned on every renderBook so it reads freshly-rebuilt targets).
  // docTops are recomputed live inside the spy, so layout shifts (web-font load,
  // hero image, reflections expanding) can't leave the active item "frozen".
  window.addEventListener('scroll', function () {
    if (window.updateActiveNavV2) window.updateActiveNavV2();
  }, { passive: true });
  // Re-run after layout-affecting events so positions stay accurate.
  window.addEventListener('resize', function () {
    if (window.updateActiveNavV2) window.updateActiveNavV2();
  }, { passive: true });
  window.addEventListener('load', function () {
    if (window.updateActiveNavV2) window.updateActiveNavV2();
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      if (window.updateActiveNavV2) window.updateActiveNavV2();
    });
  }

  // --- Initial render + live book swap on hash/query change ---
  function getIdFromUrl() {
    try {
      var params = new URLSearchParams(location.search);
      var id = params.get('id');
      if (id) return id;
    } catch (e) {}
    return location.hash ? location.hash.replace('#', '') : '';
  }

  var initialBook = resolveBook(getIdFromUrl());
  if (!initialBook && books.length) initialBook = books[0];
  renderBook(initialBook);

  function swapFromUrl() {
    var next = resolveBook(getIdFromUrl());
    if (!next) return;
    renderBook(next);
    window.scrollTo(0, 0);
    if (window.updateActiveNavV2) window.updateActiveNavV2();
  }

  window.addEventListener('hashchange', swapFromUrl);
  window.addEventListener('popstate', swapFromUrl);

})();
