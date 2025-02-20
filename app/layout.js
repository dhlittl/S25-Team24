'use client';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    // other auth config will be set through env variables in Amplify Console
  }
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Authenticator>
          {({ signOut, user }) => (
            <main>
              {children}
            </main>
          )}
        </Authenticator>
      </body>
    </html>
  );
}