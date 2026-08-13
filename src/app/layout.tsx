import type {Metadata} from "next";
import {Geist, Geist_Mono, Instrument_Serif} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import {Navbar} from "@/components/navbar";
import {Footer} from "@/components/footer";

const instrumentSerifHeading = Instrument_Serif({subsets: ['latin'], weight: ['400'], variable: '--font-heading'});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
    ),

    title: {
        default: "DevGraph — Developer Knowledge Graph",
        template: "%s | DevGraph",
    },

    description:
        "Explore relationships between developers, skills, technologies, projects, and companies through an interactive knowledge graph powered by CognoDB.",

    keywords: [
        "DevGraph",
        "developer knowledge graph",
        "developer graph",
        "developer relationships",
        "software developers",
        "developer skills",
        "technology graph",
        "knowledge graph",
        "CognoDB",
        "graph database",
        "Neo4j",
        "interactive graph",
    ],

    authors: [
        {
            name: "Aryan Kumar",
        },
    ],

    creator: "Aryan Kumar",

    applicationName: "DevGraph",

    category: "technology",

    alternates: {
        canonical: "/",
    },

    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        siteName: "DevGraph",
        title: "DevGraph — Developer Knowledge Graph",
        description:
            "Explore developers, skills, technologies, projects, and companies through an interactive knowledge graph.",
    },

    twitter: {
        card: "summary_large_image",
        title: "DevGraph — Developer Knowledge Graph",
        description:
            "Explore developers, skills, technologies, projects, and companies through an interactive knowledge graph.",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({children}: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, instrumentSerifHeading.variable)}
        >
        <body className="min-h-full flex flex-col">
        <Navbar/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}
