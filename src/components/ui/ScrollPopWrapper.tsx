"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollPopWrapperProps {
  children: React.ReactNode;
  direction?: "up" | "left" | "right" | "scale" | "rotate";
  delayMs?: number;
  className?: string;
  repeatOnScrollUp?: boolean;
}

export const ScrollPopWrapper: React.FC<ScrollPopWrapperProps> = ({
  children,
  direction = "up",
  delayMs = 0,
  className = "",
  repeatOnScrollUp = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (repeatOnScrollUp) {
          // Reset when scrolled completely out of view for reversible pop-out
          setIsVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const current = elementRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [repeatOnScrollUp]);

  const getInitialTransform = () => {
    switch (direction) {
      case "left":
        return "translate3d(-60px, 20px, 0) scale(0.65) rotate(-14deg)";
      case "right":
        return "translate3d(60px, 20px, 0) scale(0.65) rotate(14deg)";
      case "scale":
        return "scale(0.3) rotate(-8deg)";
      case "rotate":
        return "translate3d(0, 40px, 0) scale(0.7) rotate(25deg)";
      case "up":
      default:
        return "translate3d(0, 50px, 0) scale(0.65) rotate(-8deg)";
    }
  };

  return (
    <div
      ref={elementRef}
      className={`will-change-transform ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translate3d(0, 0, 0) scale(1) rotate(0deg)"
          : getInitialTransform(),
        transitionProperty: "transform, opacity",
        transitionDuration: "650ms",
        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)", // Spring elastic bounce matching sunbousai back.out
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
};
