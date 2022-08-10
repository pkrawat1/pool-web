import type { NextPage } from "next";
import {useRouter} from "next/router";

const Pool: NextPage = ({}) => {
  const router = useRouter()
  const {
    query: { id },
  } = router
  return <div>Pool</div>;
};

export default Pool;
