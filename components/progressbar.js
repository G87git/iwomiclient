import { useEffect } from 'react';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false,  });

export default function ProgressBar({ active }) {
  useEffect(() => {
    if (active) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [active]);

  return <div />;
}
