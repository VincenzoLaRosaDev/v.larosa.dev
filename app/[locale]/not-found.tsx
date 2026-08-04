import { redirect } from 'next/navigation';

/** Locale-scoped 404 → home. */
export default function LocaleNotFound() {
  redirect('/');
}
