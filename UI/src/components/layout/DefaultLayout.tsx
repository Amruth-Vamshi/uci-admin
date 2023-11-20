import { Main } from '../theme/layout/Main';
import { Navbar } from '../theme/layout/Navbar';
import { Root } from '../theme/layout/Root';

export interface DefaultLayoutProps {
  children: React.ReactNode;
}

export function DefaultLayout(props: DefaultLayoutProps) {
  return (
    <>
      <Root>
        <Navbar
          items={[
            {
              label: 'Bots',
              href: '/bots',
              children: ['/bots']
            }
          ]}
        />
        <Main>{props.children}</Main>
      </Root>
    </>
  );
}
