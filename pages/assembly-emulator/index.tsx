import Head from 'next/head';

import App from '@asm/components/App';
import { defaultBackGround, defaultText } from '@asm/color';

const AssemblyEmulatorPage: React.FC = () => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&amp;display=swap" rel="stylesheet" /> 
        <style>
          {`body {
            background-color: ${defaultBackGround};
            color: ${defaultText};
            font-family: 'Roboto', sans-serif;
          }`}
        </style>
      </Head>
      <main>
        <App />
      </main>
    </>
  ) ;
}

export default AssemblyEmulatorPage;