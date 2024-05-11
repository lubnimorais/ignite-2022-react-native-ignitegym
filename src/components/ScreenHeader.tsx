import { Center, Heading } from 'native-base';

interface IScreenHeaderProps {
  title: string;
}

export function ScreenHeader({ title }: IScreenHeaderProps) {
  return (
    <Center backgroundColor="gray.600" paddingTop={16} paddingBottom={6}>
      <Heading fontSize="xl" color="gray.100">
        {title}
      </Heading>
    </Center>
  );
}
