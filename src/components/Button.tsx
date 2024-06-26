import {
  Button as ButtonNativeBase,
  IButtonProps as IButtonNativeBaseProps,
  Text,
} from 'native-base';

interface IButtonProps extends IButtonNativeBaseProps {
  title: string;
  variant?: 'solid' | 'outline';
}

export function Button({ title, variant = 'solid', ...rest }: IButtonProps) {
  return (
    <ButtonNativeBase
      width="full"
      height={14}
      backgroundColor={variant === 'outline' ? 'transparent' : 'green.700'}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor="green.500"
      rounded="sm"
      _pressed={{
        backgroundColor: variant === 'outline' ? 'gray.500' : 'green.500',
      }}
      {...rest}
    >
      <Text
        fontFamily="heading"
        fontSize="sm"
        color={variant === 'outline' ? 'green.500' : 'white'}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
