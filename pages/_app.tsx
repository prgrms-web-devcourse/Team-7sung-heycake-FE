import '@/styles/style.css';

import { ChakraProvider, Spinner, useToast } from '@chakra-ui/react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import Layout from '@/components/Layout/layout';
import heyTheme from '@/public/theme/theme';

const queryClient = new QueryClient();

declare global {
  interface Window {
    Kakao: any;
  }
}

function kakaoInit() {
  window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
      setTimeoutId(
        window.setTimeout(() => {
          setLoading(false);
          toast({
            description: '데이터를 받아오고 있어요!',
            status: 'info',
            duration: 3000,
          });
        }, 3000)
      );
    };
    const handleComplete = () => {
      setLoading(false);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [router, loading, timeoutId, toast]);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={heyTheme}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <title>Hey, cake</title>
            <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
            />
          </Head>
          <Script
            src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
            onLoad={kakaoInit}
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css"
          />
          <Layout>
            {loading && (
              <Spinner
                color="hey.main"
                size="xl"
                thickness="4px"
                speed="0.65s"
                position="fixed"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                zIndex="4"
              />
            )}
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
        <ReactQueryDevtools />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
