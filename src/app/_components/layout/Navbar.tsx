"use client";

import { MenuIcon } from "lucide-react";


import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

interface Navbar5Props {
  className?: string;
}

const Navbar5 = ({ className }: Navbar5Props) => {

const {status} = useSession();


  return (
    <section className={cn("py-4 px-11", className)}>
      <div className="container">
        <nav className="flex items-center justify-between">
         
            
            <Link href='/' className="text-lg font-semibold tracking-tighter flex gap-5 items-center">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
              className="max-h-8"
              alt="Shadcn UI Navbar"
            />
             Note App
            </Link>
       
          
          {status == "unauthenticated" ? (
            <div className="hidden items-center gap-4 lg:flex">
            <Button variant="outline" asChild>
                 <Link href='/login'>Login</Link>
            </Button>
            <Button asChild>
              <Link href='/register'>Register</Link>
            </Button>
          </div>
              
          ):  <Button className="hidden lg:block" onClick={() => signOut({
            callbackUrl: '/login',
          })}>
              Logout
            </Button>}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <a
                    href="https://www.shadcnblocks.com"
                    className="flex items-center gap-2"
                  >
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                      className="max-h-8"
                      alt="Shadcn UI Navbar"
                    />
                     <Link href='/' className="text-lg font-semibold tracking-tighter">
             Note App
            </Link>
                  </a>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                
               
               {status == "unauthenticated" ? (
                 <div className="mt-6 flex flex-col gap-4">
                  <Button variant="outline" asChild>
                 <Link href='/login'>Login</Link>
            </Button>
            <Button asChild>
              <Link href='/register'>Register</Link>
            </Button>
                </div>
                ):  <Button onClick={()=>signOut({callbackUrl:'/login'})}>
              Logout
            </Button>}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export { Navbar5 };
