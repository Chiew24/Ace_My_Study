(() => {
  const subjectIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6.5c3.4-1.1 5.6-.4 7 1.3v11c-1.4-1.7-3.6-2.4-7-1.3z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M19 6.5c-3.4-1.1-5.6-.4-7 1.3v11c1.4-1.7 3.6-2.4 7-1.3z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>';
  const questionIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5.5h12v13H6z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9 9h6M9 12h6M9 15h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';

  function getSubjects() {
    try {
      return [...new Set(JSON.parse(localStorage.getItem('learnWithShenSubjects') || '[]'))]
        .filter(subject => subject === 'Additional Mathematics' || subject === 'Mathematics');
    } catch {
      return [];
    }
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
            <span class="icon sidebar-subject-symbol">${subjectIcon}</span>
            <span>${subject}</span>
          </a>
          <a class="nav-item sidebar-question-bank ${isQuestionBank ? 'question-current' : ''}" href="question-bank.html?subject=${safeSubject}" ${isOpen ? '' : 'hidden'}>
            <span class="icon">${questionIcon}</span>
            <span>Question Bank</span>
          </a>
        </div>`;
    }).join('');

    box.querySelectorAll('.sidebar-subject-nav').forEach(link => {
      link.addEventListener('click', event => {
        const group = link.closest('.sidebar-subject-group');
        const wasOpen = group.classList.contains('expanded');

        if (!wasOpen) {
          event.preventDefault();
          box.querySelectorAll('.sidebar-subject-group').forEach(item => {
            item.classList.remove('expanded');
            const questionBank = item.querySelector('.sidebar-question-bank');
            questionBank.hidden = true;
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
    renderSidebarSubjects();
    let last = localStorage.getItem('learnWithShenSubjects') || '[]';
    setInterval(() => {
      const current = localStorage.getItem('learnWithShenSubjects') || '[]';
      if (current !== last) {
        last = current;
        renderSidebarSubjects();
      }
    }, 300);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
