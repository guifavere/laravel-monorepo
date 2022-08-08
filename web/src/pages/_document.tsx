import Document, { DocumentContext } from 'next/document'
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
    };
  };
}

export default MyDocument
