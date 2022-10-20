import { FC } from "react";

interface Props {
  title: string;
  children?: React.ReactNode;
}

const Page: FC<Props> = ({ title, children }) => {
  return (
    <div className="container">
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default Page;
