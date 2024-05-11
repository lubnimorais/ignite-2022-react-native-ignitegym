import { IPressableProps, Pressable, Text } from 'native-base';

interface IGroupProps extends IPressableProps {
  name: string;
  isActive: boolean;
}

export function Group({ name, isActive, ...rest }: IGroupProps) {
  return (
    <Pressable
      width={24}
      height={10}
      marginRight={3}
      backgroundColor="gray.600"
      rounded="md"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      isPressed={isActive}
      _pressed={{
        borderWidth: 1,
        borderColor: 'green.500',
      }}
      {...rest}
    >
      <Text
        fontSize="xs"
        fontWeight="bold"
        color={isActive ? 'green.500' : 'gray.200'}
        textTransform="uppercase"
      >
        {name}
      </Text>
    </Pressable>
  );
}
