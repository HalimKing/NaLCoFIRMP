import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { url } from 'inspector';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-3 lg:px-0">
            <div
                className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r"
                style={{
                    backgroundImage: 'url("https://tse2.mm.bing.net/th/id/OIP.0FKwHCQjl3y15Mq3pYxY6wHaEK?cb=iwc1&rs=1&pid=ImgDetMain")', // Replace with the actual path to your image
                    backgroundSize: 'cover', // Or 'contain', 'auto', etc., depending on your needs
                    backgroundPosition: 'center', // Or 'top', 'bottom', 'left', 'right', etc.
                    backgroundRepeat: 'no-repeat', // Or 'repeat', 'repeat-x', 'repeat-y'
                }}
                >
                <div className="absolute inset-0 bg-green-700 opacity-60" /> {/* Optional: Add an overlay for better text readability */}
                <Link href={route('home')} className="relative z-20 flex items-center text-lg font-medium">
                    <AppLogoIcon className="mr-2 size-8 fill-current text-white" />
                    {name}
                </Link>
                {quote && (
                    <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">&ldquo;{quote.message}&rdquo;</p>
                        <footer className="text-sm text-neutral-300">{quote.author}</footer>
                    </blockquote>
                    </div>
                )}
                </div>
            <div className="w-full lg:p-8 lg:col-span-2 lg:rounded-l-xl lg:bg-white lg:dark:bg-neutral-900">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link href={route('home')} className="relative z-20 flex items-center justify-center lg:hidden">
                        <AppLogoIcon className="h-10 fill-current text-black sm:h-12" />
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium">{title}</h1>
                        <p className="text-muted-foreground text-sm text-balance">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
