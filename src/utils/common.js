import { isFunction } from "lodash";
import TWEEN from "@tweenjs/tween.js";
import { createVNode, defineComponent, h, render } from "vue";

export const instantiatedComponent = (component, props) => {
  const newComponent = defineComponent({
    render() {
      return h(component, props);
    },
  });
  const instance = createVNode(newComponent);
  render(instance, document.createElement("div"));
  return instance;
};

export const animation = ({
  from,
  to,
  duration,
  onUpdate,
  onComplete,
  easing = TWEEN.Easing.Quadratic.Out,
}) => {
  return new TWEEN.Tween(from)
    .to(to, duration)
    .easing(easing)
    .onUpdate((object) => isFunction(onUpdate) && onUpdate(object))
    .onComplete((object) => isFunction(onComplete) && onComplete(object))
    .start();
};
