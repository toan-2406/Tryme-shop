import { useState, useEffect, useRef } from 'react';

interface UseLazyLoadProps {
  loadingComponent: JSX.Element;
  threshold?: number;
}

const useLazyLoad = ({ loadingComponent, threshold = 0 }: UseLazyLoadProps) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: `${threshold}px`,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  const LazyLoadWrapper = ({ children }: { children: JSX.Element }) => {
    return (
      <div ref={ref}>
        {isIntersecting ? children : loadingComponent}
      </div>
    );
  };

  return LazyLoadWrapper;
};

export default useLazyLoad;