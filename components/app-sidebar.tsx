"use client"

import * as React from "react"
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
    Users,
    LaptopMinimal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { SessionContext } from "./SessionProvider"

// This is sample data.
const data = {
    // user: {
    //     name: "shadcn",
    //     email: "m@example.com",
    //     avatar: "/avatars/shadcn.jpg",
    // },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            // logo: "/Vipul-Motors-Logo-2.svg",
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            // logo: "/Vipul-Motors-Logo-2.svg",
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            // logo: "/Vipul-Motors-Logo-2.svg",
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Leads",
            url: "/queries",
            icon: Users,
        },
        {
            name: "Webpages",
            url: "/webpages",
            icon: LaptopMinimal,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = React.useContext(SessionContext)

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                {/* <TeamSwitcher teams={data.teams} /> */}
                <div className="flex w-full border-b-1 border-gray-200 p-2 items-center h-14">
                    <a href="/" className="flex w-fit">
                        <Image
                            src="/Vipul-Motors-Favicon-1.svg"
                            alt="Vipul Motors Logo"
                            width={64}
                            height={64}
                            className="object-contain"
                        />
                    </a>
                </div>
            </SidebarHeader>
            <SidebarContent>
                {/* <NavMain items={data.navMain} /> */}
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                {/* <NavUser user={data.user} /> */}
                <NavUser user={user} />
            </SidebarFooter>
            {/* <SidebarRail /> */}
        </Sidebar>
    )
}
