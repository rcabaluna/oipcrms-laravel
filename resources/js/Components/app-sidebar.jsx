import * as React from "react";
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
    ],
    navMain: [
        {
            title: "OPCR",
            url: "#",
            icon: BookOpen,
            isActive: true,
            items: [
                {
                    title: "Targets",
                    url: "/opcr/targets",
                },
                {
                    title: "Accomplishments",
                    url: "/opcr/accomplishments",
                },
            ],
        },
        {
            title: "Libraries",
            url: "#",
            icon: Settings2,
            isActive: true,
            items: [
                {
                    title: "Organizational Structure",
                    url: "/libraries/org-structure",
                },
                {
                    title: "Users",
                    url: "/libraries/users",
                },
                {
                    title: "Accounts",
                    url: "/libraries/accounts",
                },
                {
                    title: "Indicators",
                    url: "/libraries/indicators",
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
