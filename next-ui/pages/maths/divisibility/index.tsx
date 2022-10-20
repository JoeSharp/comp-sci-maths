import { NextPage } from "next";
import Page from "components/page";
import Divisibility from "./divisibility";

const P: NextPage = () => {
  return (
    <Page title="Divisibility Rules">
      <Divisibility />
    </Page>
  );
};

export default P;
