import { isFunction } from "lodash";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { onMounted, shallowRef, ref } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import useLoading from "@/hooks/useLoading";
import ThreeBase from "./core";

function useThree() {
  const container = ref();
  const { loading, openLoading, closeLoading } = useLoading(true, 500);
  const scene = shallowRef();
  const camera = shallowRef();
  const renderer = shallowRef();
  const CSSRenderer = shallowRef();
  const control = shallowRef();
  const mixers = [];
  const clock = new THREE.Clock();
  const composers = new Map();
  const renderMixins = new Map();
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
  });
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
    console.log("url", url);
    const loader = new GLTFLoader();
    const onCompleted = (object, resolve) => resolve(object);
    return new Promise((resolve) => {
      loader.load(url, (object) => {
        console.log("object", object);
        onCompleted(object, resolve);
      });
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
