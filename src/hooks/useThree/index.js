import * as THREE from "three";
import ThreeBase from "./core";
import { isFunction } from "lodash";
import TWEEN from "@tweenjs/tween.js";
import useLoading from "@/hooks/useLoading";
import { onMounted, onUnmounted, shallowRef, ref } from "vue";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

function useThree() {
  const mixers = [];
  const container = ref();
  const control = shallowRef();
  const composers = new Map();
  const scene = shallowRef();
  const camera = shallowRef();
  const renderer = shallowRef();
  const CSSRenderer = shallowRef();
  const clock = new THREE.Clock();
  const renderMixins = new Map();
  const { loading, openLoading, closeLoading } = useLoading(true, 500);

  onMounted(() => {
    const el = container.value;
    scene.value = ThreeBase.initScene();
    camera.value = ThreeBase.initCamera(el);
    renderer.value = ThreeBase.initRenderer(el);
    CSSRenderer.value = ThreeBase.initCSSRender(el);
    control.value = ThreeBase.initControl(
      camera.value,
      CSSRenderer.value.domElement
    );
    // 监听 window.onresize 事件
    window.onresize = () => {
      renderer.value.setSize(window.innerWidth, window.innerHeight);
      camera.value.aspect = window.innerWidth / window.innerHeight;
    };
  });

  onUnmounted(() => {
    // 销毁渲染引擎
    renderer.value.dispose();
    // 清除场景中的所有对象
    while (scene.value.children.length > 0) {
      const object = scene.value.children[0];

      if (object.isMesh) {
        object.geometry.dispose();
        if (object.material.isMaterial) {
          cleanMaterial(object.material);
        } else {
          const materials = object.material;
          for (let i = 0; i < materials.length; i++) {
            cleanMaterial(materials[i]);
          }
        }
      }

      scene.value.remove(object);
      object.destroy && object.destroy();
    }
    // 取消动画播放
    cancelAnimationFrame(render);
    // 释放 window.onresize 内存
    window.onresize = null;
  });

  // 材质清理函数
  const cleanMaterial = (material) => {
    material.dispose(); // 清除材质
    if (material.map) material.map.dispose(); // 清除贴图
    if (material.lightMap) material.lightMap.dispose();
    if (material.bumpMap) material.bumpMap.dispose();
    if (material.normalMap) material.normalMap.dispose();
    if (material.specularMap) material.specularMap.dispose();
    if (material.envMap) material.envMap.dispose();
    if (material.reflectivityMap) material.reflectivityMap.dispose();
    if (material.alphaMap) material.alphaMap.dispose();
    if (material.gradientMap) material.gradientMap.dispose();
  };

  const render = () => {
    const delta = new THREE.Clock().getDelta();
    renderer.value.render(scene.value, camera.value);
    const mixerUpdateDelta = clock.getDelta();
    mixers.forEach((mixer) => mixer.update(mixerUpdateDelta));
    composers.forEach((composer) => composer.render(delta));
    renderMixins.forEach((mixin) => isFunction(mixin) && mixin());
    CSSRenderer.value.render(scene.value, camera.value);
    TWEEN.update();
    requestAnimationFrame(() => render());
  };

  const loadModels = async (tasks) => {
    openLoading();
    await Promise.all(tasks);
    closeLoading();
  };

  const loadGLTF = (url) => {
    const loader = new GLTFLoader();
    const draco = new DRACOLoader();
    draco.setDecoderPath("./draco/");
    loader.setDRACOLoader(draco);
    const onCompleted = (object, resolve) => resolve(object);
    return new Promise((resolve) => {
      loader.load(url, (object) => onCompleted(object, resolve));
    });
  };

  const loadAnimate = (mesh, animations, animationName) => {
    const mixer = new THREE.AnimationMixer(mesh);
    const clip = THREE.AnimationClip.findByName(animations, animationName);
    if (!clip) return undefined;
    const action = mixer.clipAction(clip);
    action.play();
    mixers.push(mixer);
    return undefined;
  };

  return {
    container,
    loading,
    scene,
    camera,
    renderer,
    CSSRenderer,
    control,
    mixers,
    clock,
    composers,
    renderMixins,
    render,
    loadGLTF,
    loadAnimate,
    loadModels,
  };
}

export default useThree;
