(() => {
  const subjectIcons = {
    'Additional Mathematics': '∑',
    'Mathematics': '＋',
    'Sejarah': '文'
  };

  function getSubjects() {
    try {
      return JSON.parse(localStorage.getItem('learnWithShenSubjects') || '[]');
    } catch {
      return [];
    }
  }

  function iconFor(subject) {
    return subjectIcons[subject] || subject.charAt(0).toUpperCase();
  }

  function renderSidebarSubjects() {
    const box = document.getElementById('sidebarSubjects');
    if (!box) return;

    const subjects = getSubjects();
    const current = new URLSearchParams(window.location.search).get('subject');
    const openSubject = box.dataset.openSubject || '';

    box.innerHTML = subjects.map(subject => {
      const isOpen = subject === openSubject;
      const safeSubject = encodeURIComponent(subject);
      return `
        <div class="sidebar-subject-group ${isOpen ? 'expanded' : ''}" data-subject="${subject}">
          <button class="nav-item sidebar-subject-nav ${subject === current ? 'subject-current' : ''}" type="button" aria-expanded="${isOpen}">
            <span class="icon sidebar-subject-symbol">${iconFor(subject)}</span>
            <span>${subject}</span>
          </button>
          <a class="sidebar-subitem sidebar-question-bank" href="course.html?subject=${safeSubject}#question-bank" ${isOpen ? '' : 'hidden'}>Question Bank</a>
        </div>`;
    }).join('');

    box.querySelectorAll('.sidebar-subject-nav').forEach(button => {
      button.addEventListener('click', () => {
        const group = button.closest('.sidebar-subject-group');
        const subject = group.dataset.subject;
        const wasOpen = group.classList.contains('expanded');
        box.querySelectorAll('.sidebar-subject-group').forEach(item => {
          item.classList.remove('expanded');
          item.querySelector('.sidebar-question-bank').hidden = true;
          item.querySelector('.sidebar-subject-nav').setAttribute('aria-expanded', 'false');
        });
        if (!wasOpen) {
          group.classList.add('expanded');
          group.querySelector('.sidebar-question-bank').hidden = false;
          button.setAttribute('aria-expanded', 'true');
          box.dataset.openSubject = subject;
        } else {
          box.dataset.openSubject = '';
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
