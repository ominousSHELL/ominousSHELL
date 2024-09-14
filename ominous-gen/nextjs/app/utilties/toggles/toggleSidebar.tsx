export function toggleSidebar(action = 'toggle') {
    const sidebar = document.getElementById("sidebar")!;
    const payload = document.getElementById('disable_payload')!
    const mobileContent = document.getElementById("mobile-content")!;
    if (action === 'open' || (action === 'toggle' && sidebar.classList.contains('hidden'))) {
        payload.classList.add('hidden')
        sidebar.classList.remove('hidden');
    } else {
        sidebar.classList.add('hidden');
        payload.classList.remove('hidden')
    }
  }
export function openSidebar() {
    toggleSidebar('open');
}
export function closeSidebar() {
    toggleSidebar('close');
}