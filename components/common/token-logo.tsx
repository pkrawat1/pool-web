import type { NextPage } from "next";
import {IToken} from "@/types/";
import Image from "next/image";
import { tokenImgSrc } from "@/lib/";

type Props = {
  token: IToken,
  width?: string,
  height?: string,
}

const TokenLogo: NextPage<Props> = ({token, width, height}) => (
    <span className="flex border rounded-full border-gray-500">
      <Image
        src={tokenImgSrc(token.id)}
        alt={""}
        width={width || "18"}
        height={height || "18"}
      />
    </span>
);

export default TokenLogo;
