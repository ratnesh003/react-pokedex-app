import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface NavItemProps {
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  title: string;
  link: string;
}

const NavItem = ({ icon: Icon, title, link }: NavItemProps) => {
  const temp = useLocation();
  return (
    <li>
      <NavLink to={link}>
        <Button
          variant={'nav'}
          size={'default'}
          className={cn(
            'flex items-center justify-center gap-1 p-2 h-7 ',
            temp.pathname === link ? 'text-primary' : '',
          )}
        >
          <Icon size={14} /> {title}
        </Button>
      </NavLink>
    </li>
  );
};

export default NavItem;
