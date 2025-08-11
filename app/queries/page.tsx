"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { DataTableDemo } from "@/components/data-table"
import { SessionContext } from "@/components/SessionProvider"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { useContext } from "react"

export default function Page() {
    const { user } = useContext(SessionContext)

    if (!user) return null // Or a loading state, redirection handled in SessionProvider

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>

                <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b border-gray-200">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger
                            // className="-ml-1" 
                            className="-ml-1 sm:hidden"
                        />
                        {/* <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4 sm:hidden"
                        /> */}
                        {/* <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        All Queries
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb> */}
                    </div>
                </header>

                {/* <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div> */}

                <div className="flex px-4">
                    <DataTableDemo />
                </div>

            </SidebarInset>
        </SidebarProvider>
    )
}
