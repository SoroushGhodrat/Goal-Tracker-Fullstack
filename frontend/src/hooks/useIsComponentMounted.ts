import { useEffect, useRef } from 'react';

const useIsComponentMounted = (current: boolean) => {
  const componentIsMounted = useRef(true);
  useEffect(
    () => () => {
      componentIsMounted.current = false;
    },
    [],
  );
  return componentIsMounted;
};

export default useIsComponentMounted;
