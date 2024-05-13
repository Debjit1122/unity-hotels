'use client'
import Image from "next/image"
import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import { useAuth } from "@/contexts/AuthContext"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

const SiteHeader = () => {
    //@ts-ignore
    const { user } = useAuth();
    return (
        <div className="absolute z-50 w-full flex items-center py-2 px-8 justify-between">
            <Link href='/'>
                <Image src='/logo.png' alt='' width={120} height={100} />
            </Link>
            {!user ? (
                <div className="flex gap-6 items-center">
                    <Link href='/auth/signup'>
                        <Button>Sign Up</Button>
                    </Link>
                    <Link href='/auth/login'>
                        <Button className={buttonVariants({ variant: 'secondary' })}>Sign In</Button>
                    </Link>
                </div>
            ) : (
                <Link href='/profile'>
                    <Avatar>
                        <AvatarImage src="https://place-hold.it/50" alt="@shadcn" />
                    </Avatar>
                </Link>

            )}
        </div>
    )
}

export default SiteHeader
