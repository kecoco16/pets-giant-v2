import Image, { ImageProps } from 'next/image';

export default function LogoIcon(props: Omit<ImageProps, 'src' | 'alt'>) {
  return (
    <Image src="/images/logo.png" width={139} height={38} alt="Sunrise Teak logo" {...props} />
  );
}
