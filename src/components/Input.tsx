import {
  Input as InputNativeBase,
  IInputProps as IInputPropsNativeBase,
  FormControl,
} from 'native-base';

interface IInputProps extends IInputPropsNativeBase {
  errorMessage?: string | null;
}

export function Input({
  errorMessage = null,
  isInvalid,
  ...rest
}: IInputProps) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} marginBottom={4}>
      <InputNativeBase
        height={14}
        backgroundColor="gray.700"
        borderWidth={0}
        fontFamily="body"
        fontSize="md"
        color="white"
        paddingX={4}
        placeholderTextColor="gray.300"
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        _focus={{
          backgroundColor: 'gray.700',
          borderWidth: 1,
          borderColor: 'green.500',
        }}
        cursorColor="#00B37E"
        {...rest}
      />

      <FormControl.ErrorMessage
        _text={{
          color: 'red.500',
        }}
      >
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
