import { ref, onMounted, onUnmounted } from 'vue';

function useFullScreen() {
  const isFullScreen = ref(false);

  const toggleFullScreen = () => {
    if (isFullScreen.value) {
      if (document.exitFullscreen) {
        document.exitFullscreen(); // W3C 规范的标准方法
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen(); // WebKit 内核浏览器的方法
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen(); // Firefox 专有方法
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen(); // IE 和 Edge 的方法
      }
    } else {
      let element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  };

  // F11全屏
  const keyDown = event => {
    if (event.keyCode == 122) {
      toggleFullScreen()
    }
  }

  const onFullScreenChange = () => {
    isFullScreen.value = !!document.fullscreenElement;
  };

  onMounted(() => {
    document.addEventListener("keydown", keyDown);
    document.addEventListener('fullscreenchange', onFullScreenChange);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', keyDown);
    document.removeEventListener('fullscreenchange', onFullScreenChange);
  });

  return { isFullScreen, toggleFullScreen };
}

export default useFullScreen;
