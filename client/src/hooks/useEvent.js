import { useEffect } from 'react';

export default function useEvent(target, event, callback) {
  useEffect(() => {
    const { current: object } = target;
    object.addEventListener(event, callback);
    return () => object.removeEventListener(event, callback);
  }, [target, event, callback]);
}
