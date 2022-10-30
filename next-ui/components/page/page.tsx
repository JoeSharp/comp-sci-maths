import { FC } from "react";
import Link from "next/link";

interface Props {
  title: string;
  children?: React.ReactNode;
}

const Page: FC<Props> = ({ title, children }) => {
  return (
    <div className="container">
      <h1>{title}</h1>
      <Link href={"/"}>Home</Link>
      {children}
    </div>
  );
};

export default Page;
