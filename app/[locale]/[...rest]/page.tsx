import { redirect } from 'next/navigation';

/** Unknown paths under a locale → home. */
export default function CatchAllRedirect() {
  redirect('/');
}
