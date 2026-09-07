(() => {
  const exploreTab = document.getElementById('exploreTab');
  const mySubjectsTab = document.getElementById('mySubjectsTab');
  const explorePanel = document.getElementById('explorePanel');
  const mySubjectsPanel = document.getElementById('mySubjectsPanel');
  const mySubjectsGrid = document.getElementById('mySubjectsGrid');
  const emptySubjects = document.getElementById('emptySubjects');

  let mySubjects = JSON.parse(
    localStorage.getItem('learnWithShenSubjects') || '[]'
  ).filter(
    subject => subject === 'Additional Mathematics' || subject === 'Mathematics'
  );

  localStorage.setItem('learnWithShenSubjects', JSON.stringify(mySubjects));

  const bookIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6.5c3.4-1.1 5.6-.4 7 1.3v11c-1.4-1.7-3.6-2.4-7-1.3z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M19 6.5c-3.4-1.1 5.6-.4 7 1.3v11c-1.4-1.7 3.6-2.4 7-1.3z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>';

  function showSubjectToast(message) {
    const old = document.querySelector('.subject-toast');
    if (old) old.remove();

    const toast = document.createElement('div');
    toast.className = 'subject-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2400);
  }

  function bindSubjectButtons() {
    document.querySelectorAll('.add-subject').forEach(button => {
      const added = mySubjects.includes(button.dataset.subject);
      button.textContent = added ? 'Added' : '+ Add';
      button.classList.toggle('added', added);

      button.onmouseenter = () => {
        if (button.classList.contains('added')) button.textContent = 'Remove';
      };

      button.onmouseleave = () => {
        if (button.classList.contains('added')) button.textContent = 'Added';
      };

      button.onclick = event => {
        event.stopPropagation();

        const subject = button.dataset.subject;
        const wasAdded = mySubjects.includes(subject);

        mySubjects = wasAdded
          ? mySubjects.filter(item => item !== subject)
          : [...mySubjects, subject];

        localStorage.setItem(
          'learnWithShenSubjects',
          JSON.stringify(mySubjects)
        );

        renderMySubjects();
        showSubjectToast(
          wasAdded ? `${subject} is removed` : `${subject} is added`
        );
      };
    });
  }

  function renderMySubjects() {
    mySubjectsGrid.innerHTML = mySubjects
      .map(
        subject => `
          <div class="subject-card my-subject-card">
            <span class="subject-icon">${bookIcon}</span>
            <span>
              <strong>${subject}</strong>
              <small>My Subject</small>
            </span>
            <button class="add-subject added" data-subject="${subject}" type="button">Added</button>
          </div>
        `
      )
      .join('');

    emptySubjects.hidden = mySubjects.length > 0;
    bindSubjectButtons();
  }

  function showPanel(panel) {
    const showMySubjects = panel === 'my';

    mySubjectsPanel.hidden = !showMySubjects;
    explorePanel.hidden = showMySubjects;
    mySubjectsTab.classList.toggle('active', showMySubjects);
    exploreTab.classList.toggle('active', !showMySubjects);
  }

  mySubjectsTab.addEventListener('click', () => showPanel('my'));
  exploreTab.addEventListener('click', () => showPanel('explore'));

  renderMySubjects();
})();
