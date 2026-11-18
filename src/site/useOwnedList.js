import { useEffect, useState } from 'react';
import { useSite } from './SiteContext';

/**
 * Saker's public pages can show the original bundled copy.
 * Every other portfolio starts empty and only shows what that admin saved.
 */
export function useOwnedList(fallback, load) {
  const { slug, identity } = useSite();
  const bundled = Boolean(identity.useBundledContent);
  const [items, setItems] = useState(bundled ? fallback : []);

  useEffect(() => {
    let active = true;
    setItems(bundled ? fallback : []);

    Promise.resolve()
      .then(load)
      .then((fetched) => {
        if (active && Array.isArray(fetched) && fetched.length) setItems(fetched);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
    // `load` is rebuilt every render; the slug is what should refetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, bundled]);

  return items;
}
