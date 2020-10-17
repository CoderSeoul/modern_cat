import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Spacer,
  useTheme,
  Divider,
  Image,
  useToasts,
  Button,
  Link,
} from "@geist-ui/react";
import Profile from "./profile";
import { msToString } from "../date-transform";
import BLOG from "../../blog.config";


const ContactsWithNoSSR = dynamic(() => import("./contacts"), { ssr: false });

const getDate = (date: string) => {
  const d = new Date(date);
  if (`${d}` === "Invalid Date") return "";
  const time = Date.now() - new Date(date).getTime();
  return `${d.toLocaleString()} - ${msToString(time)}`;
};

const encodeCharacterForLink = (str: string | undefined) => {
  if (!str) return "";
  return str.replace(/#/g, "%23").replace(/\+/g, "%2B");
};

const Layout = ({ children, meta }: any) => {
  const theme = useTheme();
  const { asPath } = useRouter();
  const inDetailPage = useMemo(() => meta?.title, []);
  const date = useMemo(() => getDate((meta || {}).date), []);
  const url = useMemo(() => {
    const suffix = BLOG.cn ? " 阅读" : " views";
    return `https://views.show/svg?key=${asPath}&fill=666666&suffix=${encodeURI(
      suffix
    )}&size=13`;
  }, [asPath]);
  const showViews = useMemo(() => BLOG.enableViews, []);

  return (
    <section>
      <Head>
        {meta?.title && (
          <title>
            {meta?.title} - {BLOG.title}
          </title>
        )}
        {meta?.description && (
          <meta name="description" content={meta?.description} />
        )}
        {meta?.description && (
          <meta property="og:description" content={meta?.description} />
        )}
        {meta?.title && <meta property="og:title" content={meta?.title} />}
        {meta?.image && <meta property="og:image" content={meta?.image} />}
        {meta?.image && <meta property="twitter:image" content={meta?.image} />}
        {inDetailPage && (
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css"
          />
        )}
      </Head>
      <div className="container">
        <Profile />
        {inDetailPage && <Spacer y={7} />}
        {inDetailPage && 
          <div className="title">
            <img src={'https://yumai.s3.ap-northeast-2.amazonaws.com/dotGrid.png'} alt="dot grid"/>
            <h1>{meta?.title}</h1>
          </div>
        }
        {inDetailPage && <Spacer y={2} />}        
        {inDetailPage && (
          <div className="description">
            <div className="description__left">
              <h3>{meta?.description}</h3>
            </div>
            <div className="description__right">
              <h4>Related Posts</h4>
              {
                meta?.related.map((post:any)=>{
                  return(
                    <div key={post.title}>
                    <Link href={post.link} icon>{post.title}</Link>
                    <Divider />
                    </div>
                  )
                })
              }
            </div>
          </div>
        )}
        {inDetailPage && <Spacer y={2} />}           
        {inDetailPage && (<Divider align="start"><p>{date}</p></Divider>)}
        {inDetailPage && <Spacer y={1} />}
        {children}
        
        <Spacer y={5} />
        {/* <ContactsWithNoSSR /> */}
      </div>

      <style jsx>{`
        section {
          width: 100vw;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .container {
          width: 100%;
          max-width: 60vw;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          text-spacing: none;
        }

        .title{
          position:relative;
          z-index:0;
        }

        .title > img{
            position:absolute;
            left:-100px;

            width:150px;
            height:150px;
            z-index:1;
        }
        .title > h1{
          font-family: 'S-CoreDream-8Heavy';
          
          position:relative;
          font-size: 2.5rem;
          z-index:2;
        }

        .description{
          display: flex;
          justify-content: space-between;
        }

        .description__left{
          width:50%;
        }
        .container :global(h1) {
          font-size: 2rem;
        }

        .container :global(h2) {
          font-family: 'S-CoreDream-8Heavy';
          font-size: 1.7rem;
          
        }

        .container :global(h3) {
          font-family: 'S-CoreDream-8Heavy';
          font-size: 1.4rem;
        }

        .container :global(h4) {
          color:#6ad8a9;
          font-size: 1.2rem;
        }
        .container :global(h6) {
          color:#6ad8a9;
          font-size: 3rem;
        }
        .date-box {
          display: flex;
          width: fit-content;
          align-items: center;
          height: 30px;
          margin: -0.5rem 0 0 0;
          position: relative;
        }

        .date-box > :global(.date) {
          color: ${theme.palette.accents_5};
          font-family: 'GmarketSansLight';
          font-size: 0.85rem;
        }

        .date-box :global(.image) {
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          display: inline-flex;
          align-items: center;
          margin: 0 0 0 10px;
        }

        .date-box :global(img) {
          object-fit: unset;
        }

        @media only screen and (max-width: 767px) {
          .container {
            max-width: 91vw;
            min-height: 100vh;
          }

          .container :global(h1) {
            text-align: center;
          }

          .container > :global(.date) {
            text-align: center;
          }
          .description__left{
            margin-right:20px;
          }
        }

        .share-sns {
          text-align: right;
        }
      `}</style>
    </section>
  );
};

export default Layout;
