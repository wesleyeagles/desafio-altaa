import { useRef, useState } from 'react';

export const useCartAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const animateToCart = (callback?: () => void) => {
    setIsAnimating(true);

    if (!imageRef.current) {
      setIsAnimating(false);
      callback?.();
      return;
    }

    const imageRect = imageRef.current.getBoundingClientRect();
    const cartButton = document.querySelector('[aria-label="Carrinho de compras"]');

    if (!cartButton) {
      setIsAnimating(false);
      callback?.();
      return;
    }

    const cartRect = cartButton.getBoundingClientRect();
    const clone = imageRef.current.cloneNode(true) as HTMLElement;

    Object.assign(clone.style, {
      position: 'fixed',
      left: `${imageRect.left}px`,
      top: `${imageRect.top}px`,
      width: `${imageRect.width}px`,
      height: `${imageRect.height}px`,
      zIndex: '9999',
      transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      pointerEvents: 'none',
    });

    document.body.appendChild(clone);
    clone.offsetHeight;

    Object.assign(clone.style, {
      left: `${cartRect.left}px`,
      top: `${cartRect.top}px`,
      width: '0px',
      height: '0px',
      opacity: '0',
    });

    setTimeout(() => {
      clone.remove();
      setIsAnimating(false);
      callback?.();
    }, 600);
  };

  return { imageRef, isAnimating, animateToCart };
};