import {throttle} from 'lodash-es';
import {useEffect, useState} from 'react';

const params = {
  y: 0,
  x: 0,
  xDirection: '',
  yDirection: '',
  bottomReached: false,
  endReached: false
};
let previousScrollX = 0;
let previousScrollY = 0;

/**
 * Listen scroll event of element.
 *
 * @param {string|element|object} ref
 * It can be either selector, element or RefObject (React).
 * @param {Number} offset
 * Default value is 0.
 * @param {Number} delay
 * Delay in miliseconds, default value is 150.
 * @returns {object} { y: Number, x: Number, xDirection: String, yDirection: String, bottomReached: Boolean, endReached: Boolean }
 */

function useScroll(ref?: any, offset = 0, delay = 150) {
  const [value, setValue] = useState(params);

  const getElement = (refEl: any) => {
    let element = refEl;
    if (typeof refEl === 'string') element = document.querySelector(refEl);
    if (typeof refEl === 'object') element = refEl?.current;
    if (typeof refEl === 'undefined') element = window;
    return element;
  };

  const getDirection = (scrollX: number, scrollY: number) => {
    const x = scrollX > previousScrollX ? 'right' : 'left';
    const y = scrollY > previousScrollY ? 'down' : 'up';
    previousScrollX = scrollX;
    previousScrollY = scrollY;
    return {x, y};
  };

  useEffect(() => {
    const element = getElement(ref);
    if (!element) return;

    const handleScroll = throttle(() => {
      const scrollTop = element.scrollTop || window.pageYOffset;
      const scrollLeft = element.scrollLeft || window.pageXOffset;

      const directions = getDirection(scrollLeft, scrollTop);
      params.xDirection = directions.x;
      params.yDirection = directions.y;
      params.x = scrollLeft;
      params.y = scrollTop;

      const elementType = !element.pageYOffset ? 'element' : 'root';
      switch (elementType) {
        case 'element':
          params.bottomReached = element.scrollTop + element.offsetHeight >= element.scrollHeight + offset;
          params.endReached = element.scrollLeft + element.offsetWidth > element.scrollWidth + offset;
          break;
        case 'root':
          params.bottomReached = element.pageYOffset + element.innerHeight >= document.body.scrollHeight + offset;
          params.endReached = element.pageXOffset + element.innerWidth > document.body.scrollWidth + offset;
          break;
      }
      setValue({...params});
    }, delay);

    handleScroll();

    element.addEventListener('scroll', handleScroll);

    return () => element.removeEventListener('scroll', handleScroll);
  }, [delay, offset, ref]);

  return value;
}

export default useScroll;
