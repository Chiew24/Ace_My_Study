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
    const current = new URLSearchParams(window.location.search).get('subject');
    const currentPage = window.location.pathname.split('/').pop();
    const openSubject = box.dataset.openSubject || '';
    box.innerHTML = subjects.map(subject => {
      const safeSubject = encodeURIComponent(subject);
      const isSubjectCurrent = currentPage === 'course.html' && subject === current;
      const isQuestionCurrent = currentPage === 'question-bank.html' && subject === current;
      const isOpen = subject === openSubject || isSubjectCurrent || isQuestionCurrent;
      return `<div class="sidebar-subject-group ${isOpen ? 'expanded' : ''}" data-subject="${subject}"><a class="nav-item sidebar-subject-nav ${isSubjectCurrent ? 'subject-current' : ''}" href="course.html?subject=${safeSubject}" aria-expanded="${isOpen}"><span class="icon sidebar-subject-symbol"><svg viewBox="0 0 24 24"><path d="M5 7h14v13H5z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M7.5 7V4.8h9V7M8 11h8M8 14.5h8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></span><span>${subject}</span></a><a class="nav-item sidebar-question-bank ${isQuestionCurrent ? 'question-current' : ''}" href="question-bank.html?subject=${safeSubject}" ${isOpen ? '' : 'hidden'}><span class="icon"><svg viewBox="0 0 24 24"><path d="M6 5.5h12v13H6z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9 9h6M9 12h6M9 15h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></span><span>Question Bank</span></a></div>`;
    }).join('');
    box.querySelectorAll('.sidebar-subject-nav').forEach(link => {
      link.addEventListener('click', event => {
        const group = link.closest('.sidebar-subject-group');
        const subject = group.dataset.subject;
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
          box.dataset.openSubject = subject;
        } else box.dataset.openSubject = subject;
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
