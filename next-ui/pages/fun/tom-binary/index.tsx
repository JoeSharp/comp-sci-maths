import { NextPage } from "next";
import Page from "components/page";
import TomBinary from "./tom-binary";

const P: NextPage = () => {
  return (
    <Page title="Tom Binary">
      <TomBinary />
    </Page>
  );
};

export default P;
