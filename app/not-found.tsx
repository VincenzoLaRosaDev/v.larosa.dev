import { redirect } from 'next/navigation';

/** Global 404 fallback → home. */
export default function NotFound() {
  redirect('/');
}
