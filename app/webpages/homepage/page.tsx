"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SessionContext } from "@/components/SessionProvider"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { ImageOff, Images } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { createBanner, getBanners, getImages } from "@/services/media"
import AllImagesModal from "@/components/all-images-modal"

export type Image = {
    id: string;
    url: string;
    alt?: string;
    createdAt: string;
}

export type Banner = {
    id: string;
    screen?: string;
    order?: number;
    imageId?: string;
    // imageUrl?: string;
    image?: Image | null; // include relation if API returns it
}

export default function Page() {
    const { user } = useContext(SessionContext)

    const [activeBannerId, setActiveBannerId] = useState<string | null>(null)
    const [images, setImages] = useState<Image[]>([]);
    const [banners, setBanners] = useState<Banner[]>([]);

    // const images = Array(15).fill("/jimny-bg.avif")

    // ✅ fetchImages is now reusable
    const fetchImages = async () => {
        try {
            const response = await getImages()
            setImages(response.data)
        } catch (error) {
            console.error("Failed to fetch images", error)
        }
    }

    const fetchBanners = async () => {
        try {
            const response = await getBanners()
            setBanners(response.data)
        } catch (error) {
            console.error("Failed to fetch banners", error)
        }
    }

    useEffect(() => {
        fetchImages()
        fetchBanners()
    }, [])

    // console.log("All Images at homepage", images)
    // console.log("All Banners at homepage", banners)

    const handleSelectBanner = async (bannerId: string, imageId: string, order: number, screen?: string) => {
        if (!imageId) {
            console.warn("No image selected");
            return;
        }

        try {
            // Call backend API to create/update banner
            await createBanner({
                screen,
                order,
                imageId,
            });

            // ✅ Re-fetch banners from server after successful update
            const bannersData = await getBanners();
            setBanners(bannersData.data);

            // Close modal
            setActiveBannerId(null);

            console.log(`Banner ${bannerId} updated with image ${imageId}`);
        } catch (error) {
            console.error("Failed to update banner:", error);
        }
    };


    if (!user) return null // Or a loading state, redirection handled in SessionProvider

    return (
        <>
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                        <Sheet>
                            <SheetTrigger>
                                <div
                                    className="flex justify-center items-center font-semibold border-1 rounded-lg p-4 h-24 shadow-sm hover:shadow-md hover:cursor-pointer"
                                >
                                    <div className="flex gap-2 "><Images />Banners</div>
                                </div>
                            </SheetTrigger>
                            <SheetContent className="top-[56px] rounded-t-2xl" side="bottom">
                                <SheetHeader>
                                    <SheetTitle className="text-lg">Edit Banners</SheetTitle>
                                    {/* <SheetDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </SheetDescription> */}
                                </SheetHeader>
                                {/* <div className="flex "> */}

                                <div className="flex flex-col gap-16 sm:gap-2 overflow-y-auto max-h-[calc(100vh-60px)] p-2">

                                    {/* Desktop */}
                                    <div className="flex flex-col gap-4 md:px-4 p-2">
                                        <div className="font-semibold">Desktop (1366:523)</div>

                                        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 ">

                                            {banners
                                                .filter((banner) => banner.screen === "desktop")
                                                .map((banner, index) => (
                                                    <div
                                                        key={banner.id}
                                                        className="relative border rounded-sm overflow-hidden"
                                                    >
                                                        {/* Top strip */}
                                                        <div className="absolute top-0 left-0 right-0 bg-white flex justify-between p-2">
                                                            {/* <div className="flex items-center justify-center w-6 h-6 border border-gray-400 rounded-full text-sm font-medium"> */}
                                                            <div className="flex items-center justify-center border border-gray-400 rounded-sm text-xs font-medium px-2">
                                                                D-{banner.order ?? index + 1}
                                                            </div>

                                                            <AllImagesModal
                                                                images={images}
                                                                order={banner.order ?? index + 1}
                                                                screen="desktop"
                                                                bannerId={banner.id}
                                                                open={activeBannerId === banner.id}
                                                                onOpenChange={(isOpen) => setActiveBannerId(isOpen ? banner.id : null)}
                                                                onSelect={handleSelectBanner}
                                                                // onUploadSuccess={fetchImages}
                                                                getAllImages={fetchImages}
                                                                currentImageId={banner.imageId ?? null}
                                                            />
                                                        </div>

                                                        {/* Banner Image OR Icon */}
                                                        {banner.image?.url ? (
                                                            <img
                                                                src={banner.image.url}
                                                                alt={banner.image?.alt ?? `Banner ${banner.order}`}
                                                                className="w-full h-54 object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-54 flex items-center justify-center bg-gray-100">
                                                                <ImageOff className="w-12 h-12 text-gray-400" />
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}

                                        </div>

                                    </div>

                                    {/* Mobile */}
                                    <div className="flex flex-col gap-4 md:px-4 p-2">
                                        <div className="font-semibold">Mobile (360:283)</div>

                                        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 ">

                                            {banners
                                                .filter((banner) => banner.screen === "mobile")
                                                .map((banner, index) => (
                                                    <div
                                                        key={banner.id}
                                                        className="relative border rounded-sm overflow-hidden"
                                                    >
                                                        {/* Top strip */}
                                                        <div className="absolute top-0 left-0 right-0 bg-white flex justify-between p-2">
                                                            {/* <div className="flex items-center justify-center w-6 h-6 border border-gray-400 rounded-full text-sm font-medium"> */}
                                                            <div className="flex items-center justify-center border border-gray-400 rounded-sm text-xs font-medium px-2">
                                                                M-{banner.order ?? index + 1}
                                                            </div>

                                                            <AllImagesModal
                                                                images={images}
                                                                order={banner.order ?? index + 1}
                                                                screen="mobile"
                                                                bannerId={banner.id}
                                                                open={activeBannerId === banner.id}
                                                                onOpenChange={(isOpen) => setActiveBannerId(isOpen ? banner.id : null)}
                                                                onSelect={handleSelectBanner}
                                                                // onUploadSuccess={fetchImages}
                                                                getAllImages={fetchImages}
                                                                currentImageId={banner.imageId ?? null}
                                                            />
                                                        </div>

                                                        {/* Banner Image OR Icon */}
                                                        {banner.image?.url ? (
                                                            <img
                                                                src={banner.image.url}
                                                                alt={banner.image?.alt ?? `Banner ${banner.order}`}
                                                                className="w-full h-54 object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-54 flex items-center justify-center bg-gray-100">
                                                                <ImageOff className="w-12 h-12 text-gray-400" />
                                                            </div>
                                                        )}

                                                    </div>
                                                ))}

                                        </div>

                                    </div>


                                </div>
                            </SheetContent>
                        </Sheet>

                    </div>


                </SidebarInset>
            </SidebarProvider>

        </>
    )
}
