import React from "react";

export interface Tab {
  title: string;
  content: React.ReactElement;
}

interface Props {
  selectedTitle?: string;
  setSelectedTitle: (t: string) => void;
  tabs: Tab[];
}

const Tabs: React.FunctionComponent<Props> = ({
  tabs,
  selectedTitle,
  setSelectedTitle,
}) => {
  const tabsWithHandlers = React.useMemo(
    () =>
      tabs.map((tab) => ({
        tab,
        onSelect: () => setSelectedTitle(tab.title),
      })),
    [tabs, setSelectedTitle]
  );

  React.useEffect(() => {
    const nonExistentTabSelected =
      selectedTitle &&
      !tabsWithHandlers.find(({ tab: { title } }) => title === selectedTitle);
    const noTabSelected = !selectedTitle;
    if (
      tabsWithHandlers.length > 0 &&
      (nonExistentTabSelected || noTabSelected)
    ) {
      setSelectedTitle(tabsWithHandlers[0].tab.title);
    }
  }, [selectedTitle, setSelectedTitle, tabsWithHandlers]);

  return (
    <React.Fragment>
      <ul className="nav nav-tabs">
        {tabsWithHandlers.map(({ onSelect, tab: { title } }) => (
          <li key={title} className="nav-item">
            <button
              onClick={onSelect}
              className={`nav-link ${title === selectedTitle ? "active" : ""}`}
              aria-current="page"
            >
              {title}
            </button>
          </li>
        ))}
      </ul>
      {tabs
        .map(({ title, content }) => (
          <div style={{display: title === selectedTitle ? 'block' : 'none'}} key={title}>{content}</div>
        ))}
    </React.Fragment>
  );
};

export const useTabs = (tabs: Tab[]): Props => {
  const [selectedTitle, setSelectedTitle] = React.useState<string>();

  return {
    selectedTitle,
    setSelectedTitle,
    tabs,
  };
};

export default Tabs;
