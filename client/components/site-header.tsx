'use client'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import Link from "next/link"

const SiteHeader = () => {
    return (
        <div className="absolute z-50 w-full flex items-center py-2 px-8 justify-between text-white">
            <Link href='/'>
                <Image src='/logo.png' alt='' width={120} height={100} />
            </Link>
            <NavigationMenu>
                <NavigationMenuList className="gap-10">
                    <NavigationMenuItem>
                        <Link href='/' legacyBehavior passHref>
                            <NavigationMenuLink>
                                Documentation
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href='/' legacyBehavior passHref>
                            <NavigationMenuLink>
                                Documentation
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href='/' legacyBehavior passHref>
                            <NavigationMenuLink>
                                Documentation
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export default SiteHeader
