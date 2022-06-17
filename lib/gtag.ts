export const GA_ID = process.env.GA_TAG;

declare global {
  interface Window {
    gtag?: any;
  }
}

export const pageview = (url: string) => {
  window.gtag('config', GA_ID, {
    page_path: url,
  });
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: string;
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
