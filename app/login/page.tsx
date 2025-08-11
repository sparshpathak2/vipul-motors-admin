import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import Image from "next/image"

export default function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        {/* <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md"> */}
                        <div className="hidden lg:flex items-center justify-center rounded-md">
                            {/* <GalleryVerticalEnd className="size-4" /> */}
                            <Image
                                width={64}
                                height={64}
                                src="/Vipul-Motors-Favicon-1.svg"
                                alt="login-bg"
                            />
                        </div>
                        {/* Vipul Motors Pvt. Ltd. */}
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <div className="flex flex-col gap-8">
                            <div className="flex lg:hidden justify-center w-full">
                                <Image
                                    width={76}
                                    height={76}
                                    src="/Vipul-Motors-Favicon-1.svg"
                                    alt="login-bg"
                                />
                            </div>

                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="
                    relative hidden lg:flex h-full bg-black
                    w-full bg-contain bg-bottom 
                    bg-no-repeat bg-[url('/jimny-bg.avif')]
                "
            >
                <div className="absolute flex flex-col text-4xl font-bold text-white pt-24 pl-16">
                    <div>DRIVEN BY TRUST.</div>
                    <div>DEFINED BY EXCELLENCE.</div>
                </div>
            </div>
            {/* <div className="bg-black relative hidden lg:block">
                <div className="absolute flex flex-col text-3xl font-bold text-white pt-24 pl-16">
                    <div>DRIVEN BY TRUST.</div>
                    <div>DEFINED BY EXCELLENCE.</div>
                </div>
                <img
                    src="/jimny-bg.avif"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    className="absolute inset-x-0 h-full w-full object-contain transform translate-y-6 dark:brightness-[0.2] dark:grayscale"
                    className="absolute inset-x-0 top-40 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
                />
            </div> */}
        </div>
    )
}
