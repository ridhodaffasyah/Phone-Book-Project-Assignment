import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/images/fav-logo-2.png" />
        <title>Phone Book</title>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
