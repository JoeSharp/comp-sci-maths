import React from "react";
import { useHistory, Link } from "react-router-dom";
import { page as codeClubPage, pages as codeClubPages } from "../CodeClub";
import {
  page as experimentsPage,
  pages as experimentPages,
} from "../Experiments";
import { Page } from "../../types";
import SearchBox from "../SearchBox/SearchBox";
import { page as csPage, pages as csPages } from "../ComputerScience";
import { page as mathsPage, pages as mathsPages } from "../Maths";
import CardCollection from "../Bootstrap/CardCollection";

interface Props {
  location: string;
}

const rootPages = [csPage, mathsPage, codeClubPage, experimentsPage];

const HomePage: React.FunctionComponent = () => (
  <CardCollection cards={rootPages} />
);

const homePage: Page = {
  title: "Computer Science and Maths",
  description: `This site contains interactive demonstrations of various algorithms 
    and data structures used in Maths and Computer Science up to A Level.`,
  href: "/",
  component: HomePage,
};

export const pages: Page[] = [
  homePage,
  ...codeClubPages,
  ...experimentPages,
  ...csPages,
  ...mathsPages,
];

const matchString = (s1: string, s2: string): boolean =>
  s1.toLocaleLowerCase().includes(s2.toLocaleLowerCase());

const CommonPageHeader: React.FunctionComponent<Props> = ({ location }) => {
  const history = useHistory();
  const pageSelected = React.useCallback(
    ({ href }: Page) => history.push(href),
    [history]
  );
  const pageFilter = React.useCallback(
    ({ title, description, href }: Page, criteria: string) =>
      matchString(title, criteria) ||
      matchString(description, criteria) ||
      matchString(href, criteria),
    []
  );
  const pageToString = React.useCallback((p: Page) => p.title, []);

  const thisPage: Page = React.useMemo(
    () => pages.find(({ href }) => href === location) || homePage,
    [location]
  );
  return (
    <React.Fragment>
      <div className="navbar justify-content-between">
        <ol className="breadcrumb mr-auto">
          <Link className="breadcrumb-item" to="/">
            Joe's Experiments
          </Link>
          {rootPages.map(
            (rootPage) =>
              location.includes(rootPage.href + "/") && (
                <Link
                  key={rootPage.href}
                  className="breadcrumb-item"
                  to={rootPage.href}
                >
                  {rootPage.title}
                </Link>
              )
          )}

          <li className="breadcrumb-item active" aria-current="page">
            {thisPage.title}
          </li>
        </ol>
        <SearchBox
          items={pages}
          itemChosen={pageSelected}
          filter={pageFilter}
          itemToString={pageToString}
        />
      </div>
      <h1>{thisPage.title}</h1>
      <p>{thisPage.description}</p>
    </React.Fragment>
  );
};

export default CommonPageHeader;
