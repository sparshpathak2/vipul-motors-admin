"use client"

import React, { useEffect, useState, createContext, ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getWithExpiry } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface SessionContextType {
    user: any | null
    loading: boolean
}

export const SessionContext = createContext<SessionContextType>({
    user: null,
    loading: true,
})

export function SessionProvider({ children }: { children: ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [user, setUser] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const session = getWithExpiry("userSession")

        if (!session && pathname !== "/login") {
            router.replace("/login")
        } else if (session) {
            setUser(session)
        }

        setLoading(false)
    }, [pathname, router])

    if (loading) return (
        <div className="flex w-full justify-center pt-16">
            <Loader2 className="animate-spin" size={24} />
        </div>
    )

    return (
        <SessionContext.Provider value={{ user, loading }}>
            {children}
        </SessionContext.Provider>
    )
}
