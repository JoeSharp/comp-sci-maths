export interface Page {
  href: string;
  title: string;
  description: string;
  component: React.FunctionComponent;
}

export interface ControlledInput<T> {
  value: T | undefined;
  onChange: (s: T) => void;
}
