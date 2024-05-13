'use client'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from "embla-carousel-autoplay"
import { Button } from '@/components/ui/button'

const Hero = () => {
    return (
        <div>
            <div className='absolute w-full h-screen flex justify-center items-center z-10 text-white'>
                <div className='bg-stone-900 bg-opacity-60 px-20 py-4 w-[1000px] text-center'>
                    <p className='md:text-5xl mb-6'>Where Hospitality Meets Harmony</p>
                    <p className='text-lg mb-6'>Discover exceptional hospitality and unforgettable experiences at our carefully curated destinations. Book your stay now.</p>
                    <Button className='bg-amber-500 hover:bg-amber-600'>Book Now</Button>
                </div>
            </div>
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
            >
                <CarouselContent>
                    <CarouselItem>
                        <Image src='/hero/hero-1.jpg' alt='' width={1366} height={768} className='w-full h-screen' />
                    </CarouselItem>
                    <CarouselItem>
                        <Image src='/hero/hero-2.jpg' alt='' width={1366} height={768} className='w-full h-screen' />
                    </CarouselItem>
                    <CarouselItem>
                        <Image src='/hero/hero-3.jpg' alt='' width={1366} height={768} className='w-full h-screen' />
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </div>
    )
}

export default Hero
