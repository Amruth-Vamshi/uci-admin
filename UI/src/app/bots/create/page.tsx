import { DefaultLayout } from '@/components/layout/DefaultLayout';
import { CreatebotPage } from './CreateBotPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create bot'
};

export default function Page() {
  return (
    <DefaultLayout>
      <CreatebotPage />
    </DefaultLayout>
  );
}
