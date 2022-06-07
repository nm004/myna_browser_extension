document.getElementById('isMyKeyIdApp').dataset.value = true
{
  const e = document.createElement('meta')
  e.id = 'mkpf-extension-is-installed'
  e.name = browser.runtime.id
  document.head.appendChild(e)
}
document.addEventListener('launchMKPFApp', on_launchMKPFApp)
