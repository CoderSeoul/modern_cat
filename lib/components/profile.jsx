import React, { useState, useEffect } from "react";
import { Avatar,useTheme,Spacer } from "@geist-ui/react";
import Link from "next/link";


// eslint-disable-next-line no-empty-pattern
const Profile = React.memo(({}) => {
  const theme = useTheme();
  const [showText, setShowText] = useState(theme.type === "dark");
  useEffect(() => {
    const show = theme.type === "dark";
    if (showText !== show) {
      setShowText(show);
    }
  }, [theme.type]);

  return (
    <div className="profile">
      <div className="row">
        <Link href="/">
          <a>
            <h2>Beta version</h2>
          </a>
        </Link>
      </div>
      <style jsx>{`
        .row{
          display: flex;
        }
        a{
          font-family: 'S-CoreDream-8Heavy';
          color:#111;
        }

        .profile {
          padding: ${theme.layout.gap} 0;
        }

        .profile :global(.name) {
          font-size: 1.6rem;
          margin: 0;
          text-transform: uppercase;
          line-height: 1;
        }

        .profile :global(.intro) {
          font-size: 0.875rem;
          margin-top: 5px;
        }

        @media only screen and (max-width: 767px) {
          .profile {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 5rem;
          }

          .profile :global(.user-row) {
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .profile :global(.name) {
            margin-top: -1rem;
          }

          .profile :global(.intro) {
            margin: 1.3rem auto 0;
          }
        }
      `}</style>
    </div>
  );
});

export default Profile;
