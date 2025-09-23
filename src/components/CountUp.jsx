import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const CountUp = ({ end, duration = 2, prefix = '', suffix = '', decimals = 0 }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true
  });
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return decimals > 0 
      ? latest.toFixed(decimals)
      : Math.round(latest);
  });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, end, { duration });
      return controls.stop;
    }
  }, [inView, count, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

export default CountUp;
