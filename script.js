const search = document.getElementById('search');
const sidebarList = document.getElementById('sidebarList');

(function setActiveSidebar(){
  if(!sidebarList) return;
  const links = Array.from(sidebarList.querySelectorAll('a'));

  function stripHtml(name){
    return (name || '').replace(/\.html$/, '');
  }

  // bestimme aktuellen "Namen" (wenn root => index)
  const raw = window.location.pathname.split('/').pop();
  const currentName = stripHtml(raw || 'index.html'); // z.B. 'changelog' oder 'index'

  links.forEach(a=>{
    const href = a.getAttribute('href') || '';
    const hrefFile = href.split('/').pop() || '';
    const hrefName = stripHtml(hrefFile);

    if (hrefName === currentName) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
})();

// Entferne ".html" aus der Adressleiste nach dem Laden (nur sichtbar, Seite bleibt geladen)
// Hinweis: direkte Zugriffe auf /changelog ohne serverseitige Rewrites können 404 erzeugen.
// Für echte "clean URLs" muss der Server so konfiguriert werden, dass er z.B. /changelog zu /changelog.html mapped.
(function hideHtmlInUrl(){
  const p = window.location.pathname;
  if (!p) return;
  if (p.endsWith('.html')) {
    let newPath = p.replace(/\.html$/, '');           // /foo.html -> /foo
    newPath = newPath.replace(/\/index$/, '/');      // /index -> /
    try {
      history.replaceState(null, '', newPath + window.location.search + window.location.hash);
    } catch(e){}
  }
})();

document.querySelectorAll('.copy-btn').forEach(b=>{
  b.addEventListener('click', ()=>{
    const id = b.getAttribute('data-target');
    const txt = document.getElementById(id).innerText;
    navigator.clipboard.writeText(txt).then(()=>{ b.textContent = 'Copied' ; setTimeout(()=> b.textContent = 'Copy',900) });
  });
});

search.addEventListener('input', ()=>{
  const q = search.value.toLowerCase().trim();
  sidebarList.querySelectorAll('a').forEach(a=>{
    const txt = a.textContent.toLowerCase();
    a.parentElement.style.display = txt.includes(q) ? '' : 'none';
  });
});

const mobileBtn = document.getElementById('mobileMenuBtn');
mobileBtn && mobileBtn.addEventListener('click', ()=>{
  const as = document.querySelector('aside');
  as.classList.toggle('hidden');
});

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const target = document.querySelector(a.getAttribute('href'));
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

document.querySelectorAll('aside .fa-brands').forEach(icon => {
  const link = icon.closest('a');
  if (!link) return;
  
  const originalColor = getComputedStyle(icon).color;
  
  link.addEventListener('mouseenter', () => {
    if (icon.classList.contains('fa-github')) {
      icon.style.color = '#4078c0';
    } else if (icon.classList.contains('fa-x-twitter')) {
      icon.style.color = '#1da1f2';
    } else if (icon.classList.contains('fa-discord')) {
      icon.style.color = '#5865f2';
    } else if (icon.classList.contains('fa-youtube')) {
      icon.style.color = '#ff0000';
    }
  });
  
  link.addEventListener('mouseleave', () => {
    icon.style.color = '';
  });
});

(function updateLumpiiImage(){
  const img = document.getElementById('lumpii-img');
  if(!img) return;

  const today = new Date();
  const m = today.getMonth() + 1;
  const d = today.getDate();

  if ((m === 12 && d >= 27) || (m === 1 && d <= 3)) {
    img.src = 'images/lumpiiNJ.png';
    return;
  }

  if (m === 4) {
    img.src = 'images/lumpiiO.png';
    return;
  }

  if (m === 10) {
    img.src = 'images/lumpiiH.png';
    return;
  }

  if (m === 11 && d === 2) {
    img.src = 'images/lumpiiD.png';
    return;
  }

  if (m === 12) {
    img.src = 'images/lumpiiC.png';
    return;
  }

  img.src = 'images/lumpii.png';
})();