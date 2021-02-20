import React, { ReactNode } from 'react'

import Head from 'next/head'
import NavBar from './NavBar'


type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Reddit' }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <NavBar pageProps />
    <div>
      {children}
    </div>
  </>
)

export default Layout
