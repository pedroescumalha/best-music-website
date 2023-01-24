import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const colors: string[] = [
    "red-400",
    "cyan-300",
    "purple-400",
    "amber-300",
    "teal-300",
    "green-300",
    "orange-300"
  ];

  const shuffledCssVars = colors.map(c => `var(--color-${c})`).sort(() => 0.5 - Math.random());

  return (
    <Html lang="en">
      <Head />
      <body style={{
        background: `
          radial-gradient(at 45% 96%, ${shuffledCssVars[0]} 0px, transparent 50%),
          radial-gradient(at 89% 10%, ${shuffledCssVars[1]} 0px, transparent 50%),
          radial-gradient(at 39% 52%, ${shuffledCssVars[2]} 0px, transparent 50%),
          radial-gradient(at 25% 91%, ${shuffledCssVars[3]} 0px, transparent 50%),
          radial-gradient(at 46% 58%, ${shuffledCssVars[4]} 0px, transparent 50%),
          radial-gradient(at 33% 68%, ${shuffledCssVars[5]} 0px, transparent 50%),
          radial-gradient(at 86% 70%, ${shuffledCssVars[6]} 0px, transparent 50%)
        `,
        backgroundBlendMode: "lighten, overlay, lighten, screen, normal, screen, overlay"
      }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
