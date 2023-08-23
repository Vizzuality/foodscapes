import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import env from 'env.mjs';
export interface MetaTagsProps {
  title: string;
  description: string;
  type: string;
  imageURL?: string;
}

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  if (env.NEXT_PUBLIC_URL) {
    return env.NEXT_PUBLIC_URL;
  }

  return 'http://localhost:3000';
};

const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  type = 'website',
  imageURL,
}: MetaTagsProps) => {
  const { asPath } = useRouter();

  const BASE_URL = getBaseUrl();

  return (
    <Head>
      <title>{title}</title>

      <meta name="viewport" content="width=device-width" />
      <meta name="description" content={description} />

      {env.NEXT_PUBLIC_URL !== 'https://www.globalfoodscapes.org' && (
        <meta name="robots" content="noindex" />
      )}

      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:type" content={type} />
      <meta name="og:url" content={`${BASE_URL}${asPath}`} />
      <meta name="og:image" content={`${BASE_URL}/${imageURL}`} />
    </Head>
  );
};

export default MetaTags;
