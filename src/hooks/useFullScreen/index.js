import useBoolean from "@/hooks/useBoolean";

function useFullScreen() {
  const { boolean, setTrue, setFalse } = useBoolean();

  const toggleFullScreen = () => {
    console.log(boolean);
    if (boolean.value) {
      console.log(document);
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFalse();
      }
    } else {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
        setTrue();
      }
    }
  };

  // 获取不同浏览器类型名称
  // 监听全屏状态变化
  const onFullScreenChange = () => {
    console.log("onFullScreenChange");
    console.log(document);
    // isFullScreen.value = !!document.fullscreenElement;
  };

  return { isFullScreen: boolean.value, toggleFullScreen };
}

export default useFullScreen;
