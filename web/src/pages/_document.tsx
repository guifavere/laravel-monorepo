import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { createStylesServer, ServerStyles } from '@mantine/next';

const stylesServer = createStylesServer();

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: [
          initialProps.styles,
          <ServerStyles html={initialProps.html} server={stylesServer} key="styles" />,
        ]
      }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body className="antialiased">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
