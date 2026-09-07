(() => {
  const subjectIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6.5c3.4-1.1 5.6-.4 7 1.3v11c-1.4-1.7-3.6-2.4-7-1.3z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M19 6.5c-3.4-1.1-5.6-.4-7 1.3v11c1.4-1.7 3.6-2.4 7-1.3z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>';
  const questionIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5.5h12v13H6z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9 9h6M9 12h6M9 15h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';

  function injectSidebarStyle() {
    if (document.getElementById('shared-sidebar-style')) return;
    const style = document.createElement('style');
    style.id = 'shared-sidebar-style';
    style.textContent = `
      .sidebar-subjects{margin:3px 0 0!important;display:flex;flex-direction:column;gap:2px!important}
      .sidebar-subject-group{width:100%!important}
      .sidebar-subject-nav,.sidebar-question-bank{width:100%!important;margin:0!important;box-sizing:border-box!important;border-radius:11px!important;text-decoration:none!important;display:flex!important;align-items:center!important;gap:10px!important;min-height:43px!important;padding:0 10px!important;font-size:13px!important;font-weight:500!important;color:#51627c!important;background:transparent!important;border:0!important;box-shadow:none!important;transform:none!important;transition:background .18s ease,color .18s ease,transform .18s ease!important}
      .sidebar-subject-nav:hover,.sidebar-question-bank:hover{background:rgba(255,255,255,.62)!important;color:#102746!important;transform:translateX(1px)!important}
      .sidebar-subject-nav.subject-current,.sidebar-question-bank.question-current{background:#eee9ff!important;color:#7437ed!important;font-weight:700!important}
      .sidebar-subject-symbol,.sidebar-question-bank .icon{width:18px!important;height:18px!important;flex:0 0 18px!important;display:grid!important;place-items:center!important;color:#8ca0bd!important}
      .sidebar-subject-nav.subject-current .sidebar-subject-symbol,.sidebar-question-bank.question-current .icon{color:#7437ed!important}
      .sidebar-subject-symbol svg,.sidebar-question-bank .icon svg{width:17px!important;height:17px!important;fill:none!important;stroke:currentColor!important;stroke-width:1.7!important;stroke-linecap:round!important;stroke-linejoin:round!important}
      .sidebar-question-bank[hidden]{display:none!important}
      .sidebar-subject-group.expanded>.sidebar-question-bank{display:flex!important}
      .sidebar-subject-nav .sidebar-arrow{margin-left:auto;width:14px;height:14px;display:grid;place-items:center;color:currentColor;transition:transform .18s ease}
      .sidebar-subject-nav .sidebar-arrow svg{width:13px;height:13px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
      .sidebar-subject-group.expanded>.sidebar-subject-nav .sidebar-arrow{transform:rotate(90deg)}
    `;
    document.head.appendChild(style);
  }

  function getSubjects() {
    try {
      return [...new Set(JSON.parse(localStorage.getItem('learnWithShenSubjects') || '[]'))]
        .filter(subject => subject === 'Additional Mathematics' || subject === 'Mathematics');
    } catch { return []; }
  }

  function renderSidebarSubjects() {
    const box = document.getElementById('sidebarSubjects');
    if (!box) return;
    const subjects = getSubjects();
    const params = new URLSearchParams(window.location.search);
    const currentSubject = params.get('subject');
    const currentPage = window.location.pathname.split('/').pop();
    const openSubject = box.dataset.openSubject || currentSubject || '';

    box.innerHTML = subjects.map(subject => {
      const safeSubject = encodeURIComponent(subject);
      const isCourse = currentPage === 'course.html' && subject === currentSubject;
      const isQuestionBank = currentPage === 'question-bank.html' && subject === currentSubject;
      const isOpen = subject === openSubject || isCourse || isQuestionBank;
      return `
        <div class="sidebar-subject-group ${isOpen ? 'expanded' : ''}" data-subject="${subject}">
          <a class="nav-item sidebar-subject-nav ${isCourse ? 'subject-current' : ''}" href="course.html?subject=${safeSubject}" aria-expanded="${isOpen}">
            <span class="icon sidebar-subject-symbol">${subjectIcon}</span><span>${subject}</span>
            <span class="sidebar-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span>
          </a>
          <a class="nav-item sidebar-question-bank ${isQuestionBank ? 'question-current' : ''}" href="question-bank.html?subject=${safeSubject}" ${isOpen ? '' : 'hidden'}>
            <span class="icon">${questionIcon}</span><span>Question Bank</span>
          </a>
        </div>`;
    }).join('');

    box.querySelectorAll('.sidebar-subject-nav').forEach(link => {
      link.addEventListener('click', event => {
        const group = link.closest('.sidebar-subject-group');
        if (!group.classList.contains('expanded')) {
          event.preventDefault();
          box.querySelectorAll('.sidebar-subject-group').forEach(item => {
            item.classList.remove('expanded');
            item.querySelector('.sidebar-question-bank').hidden = true;
            item.querySelector('.sidebar-subject-nav').setAttribute('aria-expanded', 'false');
          });
          group.classList.add('expanded');
          group.querySelector('.sidebar-question-bank').hidden = false;
          link.setAttribute('aria-expanded', 'true');
          box.dataset.openSubject = group.dataset.subject;
        } else {
          box.dataset.openSubject = group.dataset.subject;
        }
      });
    });
  }

  function init() {
    injectSidebarStyle();
    renderSidebarSubjects();
    let last = localStorage.getItem('learnWithShenSubjects') || '[]';
    setInterval(() => {
      const current = localStorage.getItem('learnWithShenSubjects') || '[]';
      if (current !== last) { last = current; renderSidebarSubjects(); }
    }, 300);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
