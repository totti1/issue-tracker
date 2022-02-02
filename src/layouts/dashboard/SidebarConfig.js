import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import bugFill from '@iconify/icons-bi/bug-fill';
import briefcaseFill from '@iconify/icons-eva/briefcase-fill';

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Issues',
    path: '/dashboard/issues',
    icon: getIcon(bugFill)
  },
  {
    title: 'Projects',
    path: '/dashboard/projects',
    icon: getIcon(briefcaseFill)
  }
];

export default sidebarConfig;
