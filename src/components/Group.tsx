import { IPressableProps, Pressable, Text } from 'native-base';

interface IGroupProps extends IPressableProps {
  name: string;
}

export function Group({ name, ...rest }: IGroupProps) {
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
      _pressed={{
        borderWidth: 1,
        borderColor: 'green.500',
      }}
      {...rest}
    >
      <Text
        fontSize="xs"
        fontWeight="bold"
        color="gray.200"
        textTransform="uppercase"
      >
        {name}
      </Text>
    </Pressable>
  );
}
