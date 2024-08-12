import React, { ReactElement } from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;800&display=swap"
            rel="stylesheet"
          />
          <meta name="theme-color" content="#14FFEC"></meta>
        </Head>
        <body className="bg-mine-shaft font-sans">
          <Main />
          <NextScript />
          <Analytics />
          <SpeedInsights />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
