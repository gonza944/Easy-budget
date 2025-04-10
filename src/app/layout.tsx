import type { Metadata } from 'next'
import { Rubik, Titan_One } from 'next/font/google'

import '@/app/globals.css'

const fontSans = Rubik({
	subsets: ['latin'],
	variable: '--font-sans',
})

const fontHeadings = Titan_One({
	subsets: ['latin'],
	variable: '--font-headings',
	weight: '400',
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			{/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
			<body
				className={`${fontSans.variable} ${fontHeadings.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	)
}
