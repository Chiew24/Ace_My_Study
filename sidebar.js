(() => {
  const subjectIcons = {
    'Additional Mathematics': '∑',
    'Mathematics': '＋'
  };
  function getSubjects() {
    try { return JSON.parse(localStorage.getItem('learnWithShenSubjects') || '[]').filter(s => s !== 'Sejarah'); }
    catch { return []; }
  }
  function iconFor(subject) { return subjectIcons[subject] || subject.charAt(0).toUpperCase(); }
  function renderSidebarSubjects() {
    const box = document.getElementById('sidebarSubjects');
    if (!box) return;
    const subjects = getSubjects();
    const params = new URLSearchParams(window.location.search);
    const current = params.get('subject');
    const isQuestionBankPage = window.location.pathname.endsWith('question-bank.html');
    const openSubject = box.dataset.openSubject || '';
    box.innerHTML = subjects.map(subject => {
      const safeSubject = encodeURIComponent(subject);
      const isOpen = subject === openSubject || subject === current;
      const isCurrentSubject = subject === current && !isQuestionBankPage;
      return `<div class="sidebar-subject-group ${isOpen ? 'expanded' : ''}" data-subject="${subject}"><a class="nav-item sidebar-subject-nav ${isCurrentSubject ? 'active' : ''}" href="course.html?subject=${safeSubject}" aria-expanded="${isOpen}"><span class="icon sidebar-subject-symbol">${iconFor(subject)}</span><span>${subject}</span></a><a class="nav-item sidebar-question-bank ${isQuestionBankPage && subject === current ? 'active' : ''}" href="question-bank.html?subject=${safeSubject}" ${isOpen ? '' : 'hidden'}>Question Bank</a></div>`;
    }).join('');
    box.querySelectorAll('.sidebar-subject-nav').forEach(link => {
      link.addEventListener('click', event => {
        const group = link.closest('.sidebar-subject-group');
        const subject = group.dataset.subject;
        const wasOpen = group.classList.contains('expanded');
        if (!wasOpen) {
          event.preventDefault();
          box.querySelectorAll('.sidebar-subject-group').forEach(item => {
            item.classList.remove('expanded');
            const child = item.querySelector('.sidebar-question-bank');
            const parent = item.querySelector('.sidebar-subject-nav');
            if (child) child.hidden = true;
            if (parent) parent.classList.remove('active');
          });
          group.classList.add('expanded');
          group.querySelector('.sidebar-question-bank').hidden = false;
          link.classList.add('active');
          box.dataset.openSubject = subject;
        } else {
          box.dataset.openSubject = subject;
        }
      });
    });
  }
  function init() {
    renderSidebarSubjects();
    let last = localStorage.getItem('learnWithShenSubjects') || '[]';
    setInterval(() => { const current = localStorage.getItem('learnWithShenSubjects') || '[]'; if (current !== last) { last = current; renderSidebarSubjects(); } }, 300);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
