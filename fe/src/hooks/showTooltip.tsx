import { useEffect, useState } from 'react';

export function useOverflowDetection(dom: any) {
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const element = dom.current;

    const observer = new MutationObserver(() => {
      if (
        element.scrollWidth > element.offsetWidth ||
        element.scrollHeight > element.offsetHeight
      ) {
        setIsOverflow(true);
      } else {
        setIsOverflow(false);
      }
    });

    observer.observe(element, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [dom.current]);

  return isOverflow;
}
