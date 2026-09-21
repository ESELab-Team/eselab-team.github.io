/* 全站脚本：手机菜单 + 研究页按方向筛选。一般不需要修改。 */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var bar = document.querySelector('.filters');
  if (!bar) return;
  var buttons = bar.querySelectorAll('button[data-filter]');
  var rows = document.querySelectorAll('[data-tags]');
  var count = document.querySelector('.count');

  function apply(filter) {
    var shown = 0;
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-filter') === filter ? 'true' : 'false');
    });
    rows.forEach(function (row) {
      var tags = row.getAttribute('data-tags').split(/\s+/);
      var visible = filter === 'all' || tags.indexOf(filter) !== -1;
      row.hidden = !visible;
      if (visible) shown++;
    });
    if (count) count.textContent = 'Showing ' + shown + (shown === 1 ? ' project' : ' projects');
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var filter = b.getAttribute('data-filter');
      apply(filter);
      try {
        var url = new URL(window.location.href);
        if (filter === 'all') url.searchParams.delete('area');
        else url.searchParams.set('area', filter);
        history.replaceState(null, '', url);
      } catch (e) { /* 本地双击打开时浏览器可能不允许改地址，忽略即可 */ }
    });
  });

  var start = new URLSearchParams(window.location.search).get('area') || 'all';
  if (!bar.querySelector('[data-filter="' + start + '"]')) start = 'all';
  apply(start);
})();
