import { Metadata } from 'next';
import BotsPage from './bots/page';

export const metadata: Metadata = {
  title: 'UCI-Admin'
};

export default function Page() {
  return BotsPage()
}
