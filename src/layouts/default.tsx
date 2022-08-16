import React from 'react';

export default function DefaultLayout({children}: React.PropsWithChildren<Record<string, unknown>>) {
  return <>{children}</>;
}
