import env from 'env.mjs';

export const GA_TRACKING_ID = env.NEXT_PUBLIC_GA_TRACKING_ID;

// log the pageview with their URL
export const GAPage = (url: string): void => {
  if (window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// log specific events happening.
export const GAEvent = ({ action, params }): void => {
  if (window.gtag) {
    const p = Object.keys(params).reduce((acc, key) => {
      acc[`${action}_${key}`] = params[key];
      return acc;
    }, {});

    window.gtag('event', action, p);
  }
};
