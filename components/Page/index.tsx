import Head from 'next/head';

const Page: React.FC = ({ children }) => (
  <>
    <Head>
      <link rel="stylesheet" href="/assets/reset.css" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300&amp;display=swap"
        rel="stylesheet"
      /> 
      <style>
        {`body {
          margin: 0;
          font-family: 'Noto Sans JP', sans-serif;
        }`}
      </style>
    </Head>
    {children}
  </>
)

export default Page;