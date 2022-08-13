import type { NextPage } from "next";
import { IToken } from "@/types/";
import Image from "next/image";
import { useState } from "react";
import { tokenImgSrc } from "@/lib/";

type Props = {
  token: IToken;
  width?: string;
  height?: string;
};

const TokenLogo: NextPage<Props> = ({ token, width, height }) => {
  const [src, setSrc] = useState(tokenImgSrc(token.id));

  return (
    <span className="flex border rounded-full border-gray-300">
      <Image
        src={src}
        alt={""}
        width={width || "18"}
        height={height || "18"}
        className="rounded-full"
        onError={() => setSrc('/invalid-40x40.webp')}
      />
    </span>
  );
};

export default TokenLogo;
