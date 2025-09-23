import { useRef, useEffect } from 'react';

/**
 * Custom hook for automatic horizontal scrolling
 * @param {number} speed - Scrolling speed (pixels per second)
 * @param {boolean} reverse - Whether to scroll in reverse direction
 * @returns {Object} - Ref to attach to the scrolling element
 */
const useAutoScroll = (speed = 30, reverse = false) => {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const previousTimestampRef = useRef(0);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const animate = (timestamp) => {
      if (!previousTimestampRef.current) previousTimestampRef.current = timestamp;
      const deltaTime = timestamp - previousTimestampRef.current;
      previousTimestampRef.current = timestamp;

      // Calculate how much to scroll based on time passed and speed
      const scrollAmount = (deltaTime * speed) / 1000;
      scrollPositionRef.current += reverse ? -scrollAmount : scrollAmount;

      // Apply the scroll position
      if (element) {
        element.style.transform = `translateX(${-scrollPositionRef.current}px)`;

        // Reset position when scrolled past half of the duplicated content
        const contentWidth = element.scrollWidth / 2;
        if (Math.abs(scrollPositionRef.current) >= contentWidth) {
          scrollPositionRef.current = 0;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, reverse]);

  return scrollRef;
};

export default useAutoScroll;
