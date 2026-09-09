(() => {
  const SUBJECTS_KEY = 'aceMyStudySubjects';
  const LEGACY_KEY = 'learnWithShenSubjects';
  const subjectIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6.5c3.4-1.1 5.6-.4 7 1.3v11c-1.4-1.7-3.6-2.4-7-1.3z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M19 6.5c-3.4-1.1-5.6-.4-7 1.3v11c1.4-1.7 3.6-2.4 7-1.3z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>';
  const questionIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5.5h12v13H6z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9 9h6M9 12h6M9 15h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';
  const infoIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 10.5v5M12 7.5h.01" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';

  function injectSidebarStyle() {
    if (document.getElementById('shared-sidebar-style')) return;
    const style = document.createElement('style');
    style.id = 'shared-sidebar-style';
    style.textContent = `
      .sidebar-subjects{margin:3px 0 0!important;display:flex;flex-direction:column;gap:2px!important}
      .sidebar-subject-group{width:100%!important}
      .sidebar-subject-nav,.sidebar-subitem{width:100%!important;margin:0!important;box-sizing:border-box!important;border-radius:11px!important;text-decoration:none!important;display:flex!important;align-items:center!important;gap:10px!important;min-height:43px!important;padding:0 10px!important;font-size:13px!important;font-weight:500!important;color:#51627c!important;background:transparent!important;border:0!important;box-shadow:none!important;transition:background .18s ease,color .18s ease,transform .18s ease!important}
      .sidebar-subject-nav:hover,.sidebar-subitem:hover{background:rgba(255,255,255,.62)!important;color:#102746!important;transform:translateX(1px)!important}
      .sidebar-subject-nav.subject-current,.sidebar-subitem.item-current{background:#f1e7da!important;color:#765338!important;font-weight:700!important}
      .sidebar-subject-symbol,.sidebar-subitem .icon{width:18px!important;height:18px!important;flex:0 0 18px!important;display:grid!important;place-items:center!important;color:#111111!important}
      .sidebar-subject-nav.subject-current .sidebar-subject-symbol,.sidebar-subitem.item-current .icon{color:#111111!important}
      .sidebar-subject-symbol svg,.sidebar-subitem .icon svg{width:17px!important;height:17px!important;fill:none!important;stroke:#111111!important;stroke-width:1.7!important;stroke-linecap:round!important;stroke-linejoin:round!important}
      .sidebar-subitems-wrap{display:grid!important;grid-template-rows:0fr!important;overflow:hidden!important;opacity:0!important;transform:translateY(-4px)!important;transition:grid-template-rows .34s cubic-bezier(.22,1,.36,1),opacity .22s ease,transform .34s cubic-bezier(.22,1,.36,1)!important}
      .sidebar-subitems-inner{min-height:0!important;overflow:hidden!important}
      .sidebar-subitems-inner .sidebar-subitem{opacity:0!important;transform:translateY(-4px)!important;pointer-events:none!important;transition:opacity .18s ease,transform .34s cubic-bezier(.22,1,.36,1)!important}
      .sidebar-subject-group.expanded>.sidebar-subitems-wrap{grid-template-rows:1fr!important;opacity:1!important;transform:translateY(0)!important}
      .sidebar-subject-group.expanded>.sidebar-subitems-wrap .sidebar-subitem{opacity:1!important;transform:translateY(0)!important;pointer-events:auto!important}
      .sidebar-subitem{padding-left:30px!important}
      .sidebar-subject-nav .sidebar-arrow{margin-left:auto;width:14px;height:14px;display:grid;place-items:center;color:#111111;transition:transform .3s cubic-bezier(.22,1,.36,1)}
      .sidebar-subject-nav .sidebar-arrow svg{width:13px;height:13px;fill:none;stroke:#111111;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
      .sidebar-subject-group.expanded>.sidebar-subject-nav .sidebar-arrow{transform:rotate(90deg)}
      @media (prefers-reduced-motion:reduce){.sidebar-subitems-wrap,.sidebar-subitems-inner .sidebar-subitem,.sidebar-subject-nav .sidebar-arrow{transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function getSubjects(){
    try{
      const saved = localStorage.getItem(SUBJECTS_KEY);
      if(saved) return [...new Set(JSON.parse(saved))].filter(s=>s==='Additional Mathematics'||s==='Mathematics');
      const legacy = JSON.parse(localStorage.getItem(LEGACY_KEY)||'[]').filter(s=>s==='Additional Mathematics'||s==='Mathematics');
      if(legacy.length) localStorage.setItem(SUBJECTS_KEY, JSON.stringify(legacy));
      return [...new Set(legacy)];
    }catch{return []}
  }

  function renderSidebarSubjects(){
    const box=document.getElementById('sidebarSubjects'); if(!box)return;
    const subjects=getSubjects(); const p=new URLSearchParams(location.search); const currentSubject=p.get('subject');
    const page=location.pathname.split('/').pop(); const open=box.dataset.openSubject||currentSubject||'';
    box.innerHTML=subjects.map(subject=>{
      const q=encodeURIComponent(subject); const isOpen=subject===open;
      const infoCurrent=page==='course.html'&&subject===currentSubject;
      const qbCurrent=page==='question-bank.html'&&subject===currentSubject;
      return `<div class="sidebar-subject-group ${isOpen?'expanded':''}" data-subject="${subject}"><a class="nav-item sidebar-subject-nav" href="#" aria-expanded="${isOpen}"><span class="icon sidebar-subject-symbol">${subjectIcon}</span><span>${subject}</span><span class="sidebar-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span></a><div class="sidebar-subitems-wrap"><div class="sidebar-subitems-inner"><a class="nav-item sidebar-subitem ${infoCurrent?'item-current':''}" href="course.html?subject=${q}"><span class="icon">${infoIcon}</span><span>Course Info</span></a><a class="nav-item sidebar-subitem ${qbCurrent?'item-current':''}" href="question-bank.html?subject=${q}"><span class="icon">${questionIcon}</span><span>Question Bank</span></a></div></div></div>`;
    }).join('');
    box.querySelectorAll('.sidebar-subject-nav').forEach(link=>link.addEventListener('click',e=>{
      e.preventDefault();
      const g=link.closest('.sidebar-subject-group');
      const expanded=g.classList.contains('expanded');
      box.querySelectorAll('.sidebar-subject-group').forEach(item=>{
        item.classList.remove('expanded');
        item.querySelector('.sidebar-subject-nav').setAttribute('aria-expanded','false');
      });
      if(!expanded){
        g.classList.add('expanded');
        link.setAttribute('aria-expanded','true');
        box.dataset.openSubject=g.dataset.subject;
      }else{
        box.dataset.openSubject='';
      }
    }));
  }

  function init(){injectSidebarStyle();renderSidebarSubjects();let last=localStorage.getItem(SUBJECTS_KEY)||localStorage.getItem(LEGACY_KEY)||'[]';setInterval(()=>{const now=localStorage.getItem(SUBJECTS_KEY)||localStorage.getItem(LEGACY_KEY)||'[]';if(now!==last){last=now;renderSidebarSubjects()}},300)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();