import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{
        background: `
          linear-gradient(115.58deg, var(--color-green-400) 0%, var(--color-blue-900) 100.22%),
          radial-gradient(92.72% 100% at 50% 0%, var(--color-green-100) 0%, var(--color-red-900) 100%),
          radial-gradient(92.72% 100% at 50% 0%, var(--color-yellow-200) 0%, var(--color-red-900) 100%),
          radial-gradient(109.21% 213.32% at 100% 0%, var(--color-orange-500) 0%, var(--color-sky-400) 100%),
          linear-gradient(127.43deg, var(--color-red-600) 0%, var(--color-violet-600) 100%)
        `,
        backgroundBlendMode: "lighten, overlay, lighten, screen, normal"
      }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
