import Image from 'next/image';

interface IconButtonProps {
  src: string;
  alt: string;
  visible?: boolean;
  onClick: () => void;
}

export default function IconButton({ src, alt, visible = true, onClick }: IconButtonProps) {
  return (
    <button type="button" onClick={onClick} style={{ visibility: visible ? 'visible' : 'hidden' }}>
      <Image src={src} alt={alt} />
    </button>
  );
}
