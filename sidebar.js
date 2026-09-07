(() => {
  const subjectIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6.5c3.4-1.1 5.6-.4 7 1.3v11c-1.4-1.7-3.6-2.4-7-1.3z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M19 6.5c-3.4-1.1-5.6-.4-7 1.3v11c1.4-1.7 3.6-2.4 7-1.3z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>';
  const courseInfoIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4.8h9.5A2.5 2.5 0 0 1 18 7.3v12H8.5A2.5 2.5 0 0 0 6 21.8z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M6 4.8v17M9.5 9h5M9.5 12h5M9.5 15h3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';
  const lessonIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5.5h14v13H5z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8 9h8M8 12h8M8 15h5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';
  const questionIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5.5h12v13H6z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9 9h6M9 12h6M9 15h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';

  function injectSidebarStyle() {
    if (document.getElementById('shared-sidebar-style')) return;
    const style = document.createElement('style');
    style.id = 'shared-sidebar-style';
    style.textContent = `
      .sidebar-subjects{margin:3px 0 0!important;display:flex;flex-direction:column;gap:2px!important}
      .sidebar-subject-group{width:100%!important}
      .sidebar-subject-nav,.sidebar-subitem{width:100%!important;margin:0!important;box-sizing:border-box!important;border-radius:11px!important;text-decoration:none!important;display:flex!important;align-items:center!important;gap:10px!important;min-height:43px!important;padding:0 10px!important;font-size:13px!important;font-weight:500!important;color:#51627c!important;background:transparent!important;border:0!important;box-shadow:none!important;transition:background .18s ease,color .18s ease,transform .18s ease!important}
      .sidebar-subject-nav:hover,.sidebar-subitem:hover{background:rgba(255,255,255,.62)!important;color:#102746!important;transform:translateX(1px)!important}
      .sidebar-subject-nav.subject-current,.sidebar-subitem.item-current{background:#eee9ff!important;color:#7437ed!important;font-weight:700!important}
      .sidebar-subject-symbol,.sidebar-subitem .icon{width:18px!important;height:18px!important;flex:0 0 18px!important;display:grid!important;place-items:center!important;color:#8ca0bd!important}
      .sidebar-subject-nav.subject-current .sidebar-subject-symbol,.sidebar-subitem.item-current .icon{color:#7437ed!important}
      .sidebar-subject-symbol svg,.sidebar-subitem .icon svg{width:17px!important;height:17px!important;fill:none!important;stroke:currentColor!important;stroke-width:1.7!important;stroke-linecap:round!important;stroke-linejoin:round!important}
      .sidebar-subitem[hidden]{display:none!important}
      .sidebar-subject-group.expanded>.sidebar-subitem{display:flex!important}
      .sidebar-subitem{padding-left:30px!important}
      .sidebar-subject-nav .sidebar-arrow{margin-left:auto;width:14px;height:14px;display:grid;place-items:center;color:currentColor;transition:transform .18s ease}
      .sidebar-subject-nav .sidebar-arrow svg{width:13px;height:13px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
      .sidebar-subject-group.expanded>.sidebar-subject-nav .sidebar-arrow{transform:rotate(90deg)}
    `;
    document.head.appendChild(style);
  }

  function getSubjects(){try{return [...new Set(JSON.parse(localStorage.getItem('learnWithShenSubjects')||'[]'))].filter(s=>s==='Additional Mathematics'||s==='Mathematics')}catch{return []}}
  function renderSidebarSubjects(){
    const box=document.getElementById('sidebarSubjects'); if(!box)return;
    const subjects=getSubjects(); const p=new URLSearchParams(location.search); const currentSubject=p.get('subject');
    const page=location.pathname.split('/').pop(); const open=box.dataset.openSubject||currentSubject||'';
    box.innerHTML=subjects.map(subject=>{const q=encodeURIComponent(subject);const isOpen=subject===open;const info=page==='course-info.html'&&subject===currentSubject;const lesson=page==='lessons.html'&&subject===currentSubject;const qb=page==='question-bank.html'&&subject===currentSubject;return `<div class="sidebar-subject-group ${isOpen?'expanded':''}" data-subject="${subject}"><a class="nav-item sidebar-subject-nav ${page==='course.html'&&subject===currentSubject?'subject-current':''}" href="#" aria-expanded="${isOpen}"><span class="icon sidebar-subject-symbol">${subjectIcon}</span><span>${subject}</span><span class="sidebar-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span></a><a class="nav-item sidebar-subitem ${info?'item-current':''}" href="course-info.html?subject=${q}" ${isOpen?'':'hidden'}><span class="icon">${courseInfoIcon}</span><span>Course Info</span></a><a class="nav-item sidebar-subitem ${lesson?'item-current':''}" href="lessons.html?subject=${q}" ${isOpen?'':'hidden'}><span class="icon">${lessonIcon}</span><span>Lesson</span></a><a class="nav-item sidebar-subitem ${qb?'item-current':''}" href="question-bank.html?subject=${q}" ${isOpen?'':'hidden'}><span class="icon">${questionIcon}</span><span>Question Bank</span></a></div>`}).join('');
    box.querySelectorAll('.sidebar-subject-nav').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();const g=link.closest('.sidebar-subject-group');const expanded=g.classList.contains('expanded');box.querySelectorAll('.sidebar-subject-group').forEach(item=>{item.classList.remove('expanded');item.querySelectorAll('.sidebar-subitem').forEach(x=>x.hidden=true);item.querySelector('.sidebar-subject-nav').setAttribute('aria-expanded','false')});if(!expanded){g.classList.add('expanded');g.querySelectorAll('.sidebar-subitem').forEach(x=>x.hidden=false);link.setAttribute('aria-expanded','true');box.dataset.openSubject=g.dataset.subject}else box.dataset.openSubject=''}));
  }
  function init(){injectSidebarStyle();renderSidebarSubjects();let last=localStorage.getItem('learnWithShenSubjects')||'[]';setInterval(()=>{const now=localStorage.getItem('learnWithShenSubjects')||'[]';if(now!==last){last=now;renderSidebarSubjects()}},300)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
