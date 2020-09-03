function toggleFullScreen(element) {
  const doc = window.document;

  const requestFullScreen = element.requestFullscreen ||
    element.mozRequestFullScreen ||
    element.webkitRequestFullScreen ||
    element.msRequestFullscreen;
  const cancelFullScreen = doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen;

  if (!doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    requestFullScreen.call(element);
  } else {
    cancelFullScreen.call(doc);
  }
}

export default toggleFullScreen;
