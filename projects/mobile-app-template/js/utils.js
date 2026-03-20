/**
 * 스마트 뒤로가기 (제공해주신 코드 적용)
 */
function smartBack() {
  const currentPath = window.location.pathname;
  const parentPath = (() => {
    const queryBack = new URLSearchParams(window.location.search).get('back');
    if (queryBack) {
      return queryBack;
    }
    const lastSlashIndex = currentPath.lastIndexOf('/');
    if (lastSlashIndex <= 0) {
      return 'index.html';
    } else {
      return currentPath.substring(0, lastSlashIndex) + '.html';
    }
  })();

  const referrer = document.referrer;
  if (referrer && referrer.includes(parentPath)) {
    history.back();
  } else {
    window.location.href = parentPath;
  }
}