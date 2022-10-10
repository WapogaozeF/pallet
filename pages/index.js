import React, { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import AboutUs from "../components/AboutUs";
import Service from "../components/Service";
import List from "../components/List";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";

export default function Home({
  contacts,
  text,
  euroPallets,
  palletsStandart,
  services,
  description,
  title,
  keywords,
}) {
  const [isMediumOrMore, setIsMediumOrMore] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window
        .matchMedia("(min-width: 991px)")
        .addEventListener("change", (e) => setIsMediumOrMore(e.matches));
    }
  });

  return (
    <div>
      <Head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q61QB7N4RJ"
          strategy="afterInteractive"
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-Q61QB7N4RJ');
        `}
        </Script>
        <meta name="yandex-verification" content="d6779682335a3499" />
        <title>{title}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="120x120"
          href="/favicon-120x120.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#003049" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="Address" content={contacts.addressClear} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="home">
        <Header />
        <main>
          <div
            className={isMediumOrMore ? "container" : "container-fluid"}
            id="service"
          >
            <Service services={services} />
          </div>
          <div id="pallets">
            {euroPallets && <List header="Европоддоны" pallets={euroPallets} />}
            {palletsStandart && (
              <List header="Поддоны" pallets={palletsStandart} />
            )}
          </div>
          <div className="container" id="about-us">
            <AboutUs text={text} />
          </div>
          <Footer contacts={contacts} />
        </main>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const response = await fetch(
    "https://pallets-5d161-default-rtdb.europe-west1.firebasedatabase.app/pallets.json"
  );
  const pallets = await response.json();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      text: pallets.aboutUs,
      contacts: pallets.contacts,
      euroPallets: pallets.eur,
      palletsStandart: pallets.noEur,
      services: pallets.services,
      title: pallets.meta.title,
      description: pallets.meta.description,
      keywords: pallets.meta.keywords,
    },
  };
}
