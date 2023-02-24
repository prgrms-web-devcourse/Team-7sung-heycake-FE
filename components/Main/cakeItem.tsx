import {
  Badge,
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';

export default function CakeItem({ ...props }) {
  // eslint-disable-next-line react/prop-types
  const isComplete = props.isCompleted;
  return (
    <Card
      bgImage={isComplete ? '/images/completedCake.png' : ''}
      bgPosition="center"
    >
      <Card
        borderColor="hey.sub"
        borderWidth="2px"
        bgColor="orange.50"
        direction="row"
        variant="outline"
        alignItems="center"
        justifyContent="space-between"
        opacity={isComplete ? '0.4' : '1'}
      >
        <Box p={2} borderRadius="12px">
          <Image width={100} height={100} src="/images/cake.png" alt="Cake" />
        </Box>
        <CardBody px={2}>
          <Flex padding={0} gap={1} flexDirection="column">
            <Flex align="center" gap={4} justifyContent="space-between">
              <Text color="hey.main">카테고리</Text>
              <Text fontSize="sm">포토</Text>
            </Flex>
            <Divider borderColor="hey.main" />
            <Flex align="center" gap={4} justifyContent="space-between">
              <Text color="hey.main">케익 크기</Text>
              <Text fontSize="sm">1호</Text>
            </Flex>
            <Divider borderColor="hey.main" />
            <Flex align="center" gap={4} justifyContent="space-between">
              <Text color="hey.main">케익 맛</Text>
              <Text fontSize="sm">초코</Text>
            </Flex>
            <Divider borderColor="hey.main" />
          </Flex>
        </CardBody>
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          alignItems="end"
          w={24}
          h={32}
          p={2}
        >
          <Badge bgColor="red.200" color="hey.red">
            ~1 일
          </Badge>
          <Badge bgColor="orange.100" colorScheme="red" color="hey.red">
            ~ ₩ 130,000
          </Badge>
        </Flex>
      </Card>
    </Card>
  );
}
