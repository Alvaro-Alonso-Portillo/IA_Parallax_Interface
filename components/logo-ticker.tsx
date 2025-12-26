"use client"

import { cn } from "@/lib/utils"

interface Logo {
    name: string;
    path?: string;
    image?: string;
}

const LOGOS: Logo[] = [
    {
        name: "NVIDIA",
        image: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nvidia.svg",
    },
    {
        name: "OpenAI",
        image: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/openai.svg",
    },
    {
        name: "STRIPE",
        image: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/stripe.svg",
    },
    {
        name: "ANTHROPIC",
        image: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/anthropic.svg",
    },
    {
        name: "MISTRAL AI",
        image: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/mistralai.svg",
    },
    {
        name: "VERCEL",
        image: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vercel.svg",
    },
    {
        name: "GOOGLE CLOUD",
        image: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/googlecloud.svg",
    },
    {
        name: "AMAZON AWS",
        image: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/amazonwebservices.svg",
    },
];

export function LogoTicker() {
    return (
        <div className="w-full bg-[#080808] py-12 border-b border-white/5 overflow-hidden md:pl-20">
            <div className="mb-8 text-center px-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40 block">
                    NÚCLEO TECNOLÓGICO
                </span>
            </div>

            <div className="relative flex overflow-x-hidden">
                <div className="animate-infinite-scroll flex gap-12 md:gap-24 items-center whitespace-nowrap pl-12 md:pl-24">
                    {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, index) => (
                        <div
                            key={`${logo.name}-${index}`}
                            className="group relative flex items-center justify-center p-4 transition-all duration-300"
                        >
                            {logo.image ? (
                                <div className="relative w-24 h-8 md:w-32 md:h-10 transition-all duration-300 opacity-40 group-hover:opacity-100 flex items-center justify-center">
                                    {/* @ts-ignore */}
                                    <img
                                        src={logo.image}
                                        alt={logo.name}
                                        className="w-full h-full object-contain filter brightness-0 invert antialiased"
                                        loading="lazy"
                                    />
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>

                {/* Duplicate for seamless effect */}
                <div className="animate-infinite-scroll flex gap-12 md:gap-24 items-center whitespace-nowrap pl-12 md:pl-24" aria-hidden="true">
                    {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, index) => (
                        <div
                            key={`duplicate-${logo.name}-${index}`}
                            className="group relative flex items-center justify-center p-4 transition-all duration-300"
                        >
                            {logo.image ? (
                                <div className="relative w-24 h-8 md:w-32 md:h-10 transition-all duration-300 opacity-40 group-hover:opacity-100 flex items-center justify-center">
                                    {/* @ts-ignore */}
                                    <img
                                        src={logo.image}
                                        alt={logo.name}
                                        className="w-full h-full object-contain filter brightness-0 invert antialiased"
                                        loading="lazy"
                                    />
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
