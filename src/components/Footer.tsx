import { FC } from "react";
import Image from "next/image";

const Footer: FC = () => {
  const iconSize = 20;
  
  return (
    <footer className="fixed inset-x-0 bottom-0 flex justify-center px-6 py-3 flex items-center justify-center gap-4 shadow-sm">
      <Image
        alt="spotify"
        src="/spotify.png"
        width={iconSize}
        height={iconSize}
      />
      <Image
        alt="instagram"
        src="/instagram.png"
        width={iconSize}
        height={iconSize}
      />
      <Image
        alt="bandcamp"
        src="/bandcamp.png"
        width={iconSize}
        height={iconSize}
      />
      <Image
        alt="mail"
        src="/mail.png"
        width={iconSize}
        height={iconSize}
      />      
    </footer>  
  );
};

export default Footer;