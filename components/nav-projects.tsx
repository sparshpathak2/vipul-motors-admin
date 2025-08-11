"use client"

import {
    Folder,
    Forward,
    MoreHorizontal,
    Trash2,
    type LucideIcon,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function NavProjects({
    projects,
}: {
    projects: {
        name: string
        url: string
        icon: LucideIcon
    }[]
}) {
    const { isMobile } = useSidebar()
    const pathname = usePathname()

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            {/* <SidebarGroupLabel>Projects</SidebarGroupLabel> */}
            <SidebarMenu>
                {projects.map((item) => {
                    const isActive = pathname.includes(item.url)
                    const isDisabled = item.name === "Webpages"

                    return (
                        <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton asChild>
                                {/* <a
                                    href={item.url}
                                    className={cn(
                                        "flex items-center gap-2 px-2 py-1 rounded-md transition-colors",
                                        isActive
                                            ? "bg-gray-200 text-primary font-semibold"
                                            : "text-muted-foreground hover:bg-muted/60"
                                    )}
                                >
                                    <item.icon />
                                    <span>{item.name}</span>
                                </a> */}
                                <a
                                    href={isDisabled ? undefined : item.url}
                                    onClick={isDisabled ? (e) => e.preventDefault() : undefined}
                                    className={cn(
                                        "flex items-center gap-2 px-2 py-1 rounded-md transition-colors",
                                        isDisabled
                                            ? "text-gray-400 cursor-not-allowed pointer-events-none"
                                            : isActive
                                                ? "bg-gray-200 text-primary font-semibold"
                                                : "text-muted-foreground hover:bg-muted/60"
                                    )}
                                >
                                    <item.icon />
                                    <span>{item.name}</span>
                                </a>
                            </SidebarMenuButton>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    {/* <SidebarMenuAction showOnHover>
                                    <MoreHorizontal />
                                    <span className="sr-only">More</span>
                                </SidebarMenuAction> */}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-48 rounded-lg"
                                    side={isMobile ? "bottom" : "right"}
                                    align={isMobile ? "end" : "start"}
                                >
                                    <DropdownMenuItem>
                                        <Folder className="text-muted-foreground" />
                                        <span>View Project</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Forward className="text-muted-foreground" />
                                        <span>Share Project</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Trash2 className="text-muted-foreground" />
                                        <span>Delete Project</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    )
                })}
                {/* <SidebarMenuItem>
                    <SidebarMenuButton className="text-sidebar-foreground/70">
                        <MoreHorizontal className="text-sidebar-foreground/70" />
                        <span>More</span>
                    </SidebarMenuButton>
                </SidebarMenuItem> */}
            </SidebarMenu>
        </SidebarGroup>
    )
}
