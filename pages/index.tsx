import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Head from 'next/head';
import Image from 'next/image';
import { RiKakaoTalkFill } from 'react-icons/ri';

export default function Home() {
  return (
    <>
      <Head>
        <title>Hey, cake</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ImageContainer>
        <Image src="/images/logo.png" alt="로고" width={300} height={300} />
        <ImageTitle>커스텀 케이크 제작 의뢰 플랫폼</ImageTitle>
      </ImageContainer>
      <LoginButtonContainer>
        <Button bg="hey.sub" width="20rem" margin="1rem">
          <RiKakaoTalkFill />
          &nbsp;카카오톡으로 로그인
        </Button>
        <Button bg="hey.lightOrange" width="20rem">
          비회원으로 둘러보기
        </Button>
      </LoginButtonContainer>
    </>
  );
}

const ImageContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7rem;
`;

const ImageTitle = styled.div`
  color: #cbd5e0;
`;

const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
`;
