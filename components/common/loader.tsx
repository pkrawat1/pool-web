import type { NextPage } from "next";

const Loader: NextPage = () => (
  <div className="flex items-center justify-center ">
    <div className="w-6 h-6 border-b-2 border-blue-500 rounded-full animate-spin"></div>
  </div>
);

export default Loader;
