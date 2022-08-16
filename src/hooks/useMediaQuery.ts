import {useState} from 'react';

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

/**
 * Media queries follow Tailwindcss: https://tailwindcss.com/docs/responsive-design
 * sm => @media (min-width: 640px) { ... }
 * md => @media (min-width: 768px) { ... }
 * lg => @media (min-width: 1024px) { ... }
 * xl => @media (min-width: 1280px) { ... }
 * 2xl => @media (min-width: 1536px) { ... }
 * Usage: const isDesktop = useMediaQuery('(min-width: 1024px)');
 *
 * @param {string} query
 * @returns {boolean}
 */

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useIsomorphicLayoutEffect(() => {
    const getMatches = (queryTwo: string): boolean => {
      return window.matchMedia(queryTwo).matches;
    };

    const handleChange = () => {
      setMatches(getMatches(query));
    };

    const matchMedia = window.matchMedia(query);

    handleChange();

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}

export default useMediaQuery;
