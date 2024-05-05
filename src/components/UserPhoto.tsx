import { IImageProps, Image } from 'native-base';

interface IUserPhotoProps extends IImageProps {
  size: number;
  alt: string;
}

export function UserPhoto({ size, alt, ...rest }: IUserPhotoProps) {
  return (
    <Image
      width={size}
      height={size}
      alt={alt}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...rest}
    />
  );
}
