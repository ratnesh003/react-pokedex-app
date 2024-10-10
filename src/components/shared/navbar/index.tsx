import { pokeball } from '@/assets';
import { ModeToggle } from '@/components/shared/navbar/mode-toggle';
import { navPages } from '@/constants';
import { NavLink } from 'react-router-dom';
import NavItem from './nav-item';
import { MobileNav } from './mobile-nav';

const Navbar = () => {
  return (
    <nav className="sticky left-0 top-0 h-16 w-full backdrop-blur-sm bg-white/4 dark:bg-black/5 flex items-center justify-between p-4">
      <div className="flex items-center justify-center gap-12">
        <NavLink className="flex items-start justify-between gap-2" to={'/'}>
          <img src={pokeball} alt="icon" className="h-7 invert dark:invert-0" />
          <h1 className="sm:hidden text-2xl leading-7 font-bold md:block">
            Poké<span className="text-primary">dex</span>
          </h1>
        </NavLink>

        <ul className="hidden sm:flex items-center justify-between gap-4">
          {navPages.map((item, index) => (
            <NavItem key={index} icon={item.icon} title={item.title} link={item.link} />
          ))}
        </ul>
      </div>
      <div className='hidden sm:block'>
        <ModeToggle />
      </div>
      <div className='sm:hidden'>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
