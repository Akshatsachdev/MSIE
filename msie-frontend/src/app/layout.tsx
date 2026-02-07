import "./globals.css";
import Providers from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var t = localStorage.getItem("msie.theme") || "system";
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var dark = (t === "dark") || (t === "system" && prefersDark);
    document.documentElement.classList.toggle("dark", dark);
  } catch (e) {}
})();
`,
          }}
        />
      </head>
      <body className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#0B0F14] dark:text-zinc-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
