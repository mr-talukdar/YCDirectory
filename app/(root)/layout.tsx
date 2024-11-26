import React from 'react'
import Navbar from "@/app/components/navbar";

const Layout = ({children}:Readonly<{children:React.ReactNode}>) => {
    return (
        <main className="font-work-sans">
            <Navbar/>
            {children}
        </main>
    )
}
export default Layout