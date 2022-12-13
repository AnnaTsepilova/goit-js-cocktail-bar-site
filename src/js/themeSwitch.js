const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
  };
  
  const switchToggle = document.querySelector('#theme-switch-toggle');
  
  function classChange(addClass, removeClass) {
    document.body.classList.add(addClass),
      document.body.classList.remove(removeClass);
      localStorage.setItem('theme', addClass);
  }
  
  function defaultTheme() {
    if (localStorage.getItem('theme') === Theme.DARK) {
      switchToggle.checked = 'true';
      classChange(Theme.DARK, Theme.LIGHT);
    } else {
      switchToggle.checked = false;
      classChange(Theme.LIGHT, Theme.DARK);
      
    }
  }
  defaultTheme();
  
  switchToggle.addEventListener('change', e => {
    if (e.target.checked) {
      classChange(Theme.DARK, Theme.LIGHT);
    } else {
      classChange(Theme.LIGHT, Theme.DARK);
    }
  });