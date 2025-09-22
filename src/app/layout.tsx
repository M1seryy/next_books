import { Header } from "@/widgets/header";
import "./globals.css";
import { QueryProvider } from "@/shared/providers/query-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans mx-auto max-w-[1200px] px-4">
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
