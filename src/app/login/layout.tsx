export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>AUTH LAYOUT</h1>
      {children}
    </div>
  );
}
