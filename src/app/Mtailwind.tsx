'use client';
export * from '@material-tailwind/react';
import { ThemeProvider } from '@material-tailwind/react';

export default function MaterialThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = {
    Input: {
      color: 'red',
    },
  };
  return <ThemeProvider value={theme}>{children}</ThemeProvider>;
}
