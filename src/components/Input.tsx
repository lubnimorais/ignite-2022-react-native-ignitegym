import { Input as InputNativeBase, IInputProps } from 'native-base';

export function Input({ ...rest }: IInputProps) {
  return (
    <InputNativeBase
      height={14}
      backgroundColor="gray.700"
      borderWidth={0}
      fontFamily="body"
      fontSize="md"
      color="white"
      paddingX={4}
      marginBottom={4}
      placeholderTextColor="gray.300"
      _focus={{
        backgroundColor: 'gray.700',
        borderWidth: 1,
        borderColor: 'green.500',
      }}
      cursorColor="#00B37E"
      {...rest}
    />
  );
}
