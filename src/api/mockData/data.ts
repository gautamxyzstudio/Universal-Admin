import { STRINGS } from "@/constant/en";
import { routeNames } from "@/utility/routesName";
import { Icons } from "../../../public/exporter";

export type IQuickLinkData = {
  id: number;
  title: string;
  path: string;
  icon: string;
  iconfill: string;
};

export const quickLink: IQuickLinkData[] = [
  {
    id: 1,
    title: STRINGS.dashboard,
    path: routeNames.Dashboard,
    icon: Icons.home,
    iconfill: Icons.homefill,

  },
  {
    id: 2,
    title: STRINGS.employeeManagement,
    path: routeNames.Employees,
    icon: Icons.people,
    iconfill: Icons.peoplefill,
  },
  {
    id: 3,
    title: STRINGS.clientManagement,
    path: routeNames.Client,
    icon: Icons.client,
    iconfill: Icons.clientfill,
  },
  {
    id: 4,
    title: STRINGS.company,
    path: routeNames.Company,
    icon: Icons.building,
    iconfill: Icons.buildingfill,
  },
  {
    id: 5,
    title: STRINGS.subAdminManagement,
    path: routeNames.SubAdmin,
    icon: Icons.subAdmin,
    iconfill: Icons.subAdminfill,
  },
  {
    id: 6,
    title: STRINGS.activityLog,
    path: routeNames.Activity,
    icon: Icons.report,
    iconfill: Icons.reportfill,
  },
  {
    id: 7,
    title: STRINGS.settings,
    path: routeNames.Settings,
    icon: Icons.setting,
    iconfill: Icons.settingfill,
  },
  {
    id: 8,
    title: STRINGS.logout,
    path: routeNames.LogOut,
    icon: Icons.logout,
    iconfill: Icons.arrow
  }
];
