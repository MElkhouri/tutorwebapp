import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HelpIcon from '@mui/icons-material/Help';
import ScheduleIcon from '@mui/icons-material/Schedule';

export const TutorSidebarData = [
    {
        title: "Upcoming Sessions",
        icon: <HomeIcon />,
        link: "/tutorhome"
    },
    {
        title: "My Profile",
        icon: <AccountBoxIcon />,
        link: "/tutor-profile"
    },
    {
        title: "Help",
        icon: <HelpIcon />,
        link: "/Contact"
    }
]
export const StudentSidebarData = [
    {
        title: "Upcoming Sessions",
        icon: <HomeIcon />,
        link: "/userhome"
    },
    {
        title: "Schedule a Session",
        icon: <ScheduleIcon />,
        link: "/Schedule_session"
    },
    {
        title: "My Profile",
        icon: <AccountBoxIcon />,
        link: "/student-profile"
    },
    {
        title: "Help",
        icon: <HelpIcon />,
        link: "/Contact"
    }
]