import { ref, onMounted, onUnmounted } from "vue";

function useFullScreen() {
  const isFullScreen = ref(false);

  const toggleFullScreen = () => {
    if (isFullScreen.value) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } else {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    }
    isFullScreen.value = !isFullScreen.value;
  };

  // 获取不同浏览器类型名称
  // 监听全屏状态变化
  const onFullScreenChange = () => {
    console.log("onFullScreenChange");
    isFullScreen.value = !!document.fullscreenElement;
  };

  // 组件加载时添加监听
  onMounted(() => {
    document.addEventListener("fullscreenchange", onFullScreenChange);
  });

  // 组件卸载时移除监听器
  onUnmounted(() => {
    document.removeEventListener("fullscreenchange", onFullScreenChange);
  });

  return { isFullScreen, toggleFullScreen };
}

export default useFullScreen;
