import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const colors: string[] = [
    "green-400",
    "blue-900",
    "green-100",
    "red-900",
    "yellow-200",
    "violet-600",
    "orange-500",
    "sky-400",
    "red-600",
    "violet-600"
  ];

  const shuffledCssVars = colors.map(c => `var(--color-${c})`).sort(() => 0.5 - Math.random());

  return (
    <Html lang="en">
      <Head />
      <body style={{
        background: `
          linear-gradient(115.58deg, ${shuffledCssVars[0]} 0%, ${shuffledCssVars[1]} 100.22%),
          radial-gradient(92.72% 100% at 50% 0%, ${shuffledCssVars[2]} 0%, ${shuffledCssVars[3]} 100%),
          radial-gradient(92.72% 100% at 50% 0%, ${shuffledCssVars[4]} 0%, ${shuffledCssVars[5]} 100%),
          radial-gradient(109.21% 213.32% at 100% 0%, ${shuffledCssVars[6]} 0%, ${shuffledCssVars[7]} 100%),
          linear-gradient(127.43deg, ${shuffledCssVars[8]} 0%, ${shuffledCssVars[9]} 100%)
        `,
        backgroundBlendMode: "lighten, overlay, lighten, screen, normal"
      }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
