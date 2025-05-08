import React from 'react';

import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';

const Links=[
    {
        text:'Add Job',
        path:'.',
        icon:<FaWpforms/>
    },
     {
        text:'All Jobs',
        path:'all-jobs',
        icon:<MdQueryStats/>
    },
     {
        text:'stats',
        path:'stats',
        icon:<IoBarChartSharp/>
    },
     {
        text:'profile',
        path:'profile',
        icon:<ImProfile/>
    },
     {
        text:'Admin',
        path:'admin',
        icon:<MdAdminPanelSettings/>
    },
]
export default Links;