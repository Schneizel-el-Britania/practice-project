import { useEffect, useRef, useState } from "react";
import { useEvent } from ".";

export default function useHover(target, options = {
  delay: 100,
}) {

  const [hovering, setHovering] = useState(false);
  const timeout = useRef();
  const { delay } = options;

  const toggle = (isHovered) => {
    window.clearTimeout(timeout.current);
    delay ?
      timeout.current = window.setTimeout(() => setHovering(isHovered), delay) :
      setHovering(isHovered);
  }

  useEvent(target, 'mouseenter', () => toggle(true));
  useEvent(target, 'mouseleave', () => toggle(false));

  useEffect(
    () => () => {
      window.clearTimeout(timeout.current);
    }, []
  )

  return hovering;
}
