import { Button, Container, Text } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import { getAccessToken } from '@/utils/getAccessToken';

function loginWithKakao() {
  window.Kakao.Auth.authorize({
    redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
  });
}

interface ResponseType {
  accessToken: string;
  refreshToken: string;
}

interface ErrorResponse {
  message?: string;
}

export default function Login() {
  const router = useRouter();
  const { code: authCode } = router.query;

  const handleLogin = useCallback(
    async (code: string) => {
      try {
        const response: ResponseType = await axios
          .post('https://heycake.kro.kr/login', { code })
          .then((res) => res.data);

        if (!getAccessToken()) {
          localStorage.setItem('access_token', response.accessToken);
          localStorage.setItem('refresh_token', response.refreshToken);
        }

        router.push('/');
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (!axiosError.response) return;

        if (axiosError.response.status === 401) {
          alert(axiosError.message || '인증되지 않은 요청입니다.');
        }
        console.error(error);
      }
    },
    [router]
  );

  useEffect(() => {
    if (authCode !== undefined) {
      handleLogin(authCode as string);
    }
  }, [authCode, handleLogin]);

  useEffect(() => {
    if (window.location.href.includes('?code=')) {
      const code = window.location.href.split('?code=')[1];
      handleLogin(code);
    }
  }, [handleLogin]);

  function isLoggedIn() {
    if (getAccessToken()) {
      router.push('/');
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => isLoggedIn(), []);

  return (
    <>
      <Container
        display="flex"
        flexDir="column"
        alignItems="center"
        padding="14rem 0 10rem 0"
      >
        <Image
          src="/images/logo.png"
          alt="헤이케이크 로고 이미지"
          width={220}
          height={200}
          quality={100}
        />
        <Text color="hey.normalGray" fontSize="sm">
          나만의 커스텀 케이크 주문 제작 플랫폼
        </Text>
      </Container>
      <Container display="flex" flexDir="column" alignItems="center">
        <Button
          onClick={loginWithKakao}
          padding="0"
          width="320px"
          height="60px"
          bgColor="hey.kakaoOrange"
          borderRadius="10px"
        >
          <Image
            src="/images/kakao_login_large_wide.png"
            width={354}
            height={52}
            quality={100}
            alt="카카오 로그인 이미지"
          />
        </Button>
        <Button
          bg="none"
          border="0.1px solid"
          borderRadius="10px"
          borderColor="hey.lightGray"
          width="320px"
          height="60px"
          marginTop="1rem"
          fontSize="14px"
          fontWeight="bold"
          onClick={() => router.push('/')}
        >
          비회원으로 둘러보기
        </Button>
      </Container>
    </>
  );
}
