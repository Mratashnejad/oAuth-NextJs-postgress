"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { CircleUser, Menu, Package2, Search } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Developers",
        href: "/categories/developers",
        description: "Engage skilled developers through an interactive platform.",
      },
      {
        title: "Cleaning",
        href: "/categories/cleaning",
        description: "Professional cleaning services for homes and businesses.",
      },
      {
        title: "Construction Works",
        href: "/categories/construction-works",
        description: "Skilled labor for construction projects and renovations.",
      },
      {
        title: "Repairing Things",
        href: "/categories/repairing-things",
        description: "Expert technicians for repairing appliances, electronics, and more.",
      },
      {
        title: "Moving Furniture and Cargo",
        href: "/categories/moving-services",
        description: "Efficient moving services for furniture and cargo transport.",
      },
      {
        title: "Car Services",
        href: "/categories/car-services",
        description: "Car maintenance, repairs, and detailing by experienced professionals.",
      },
      {
        title: "Advocacy and Complaint",
        href: "/categories/advocacy-services",
        description: "Legal advocacy and complaint resolution services.",
      },
      {
        title: "Health and Beauty",
        href: "/categories/health-and-beauty",
        description: "Professional health and beauty services for personal care and wellness.",
      },
      {
        title: "Assemblies and Events",
        href: "/categories/event-services",
        description: "Event planning and assembly services for gatherings and occasions.",
      }
      
]

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
      <NavigationMenuItem className="flex items-center space-x-2">
          <Link href="/" className="flex items-center font-bold">
              <Image src="/assets/images/searching.gif" height={44} width={44} alt="Gtnelu" />
              <span className="ml-2">Gtnelu</span>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>

    </li>
  )
})
ListItem.displayName = "ListItem"
