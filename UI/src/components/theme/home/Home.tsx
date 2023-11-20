import { CenteredBox } from '../layout/CenteredBox';

export function Home() {
  return (
    <CenteredBox>
    </CenteredBox>
  );
}

function P(props: { children: React.ReactNode }) {
  return <p className="py-3 text-gray-700">{props.children}</p>;
}

function Link(props: { href: string; children: React.ReactNode }) {
  return (
    <a href={props.href} className="font-medium text-blue-600 dark:text-blue-500 hover:underline" target="_blank">
      {props.children}
    </a>
  );
}
