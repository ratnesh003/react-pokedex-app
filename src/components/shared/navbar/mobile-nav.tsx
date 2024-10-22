import { Button } from '@/components/ui/button';
import { pokeball } from '@/assets';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import { navPages } from '@/constants';
import NavItem from './nav-item';

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" aria-description='menu on mobile view'>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'}>
        <SheetHeader>
          <SheetTitle className='flex items-center justify-center gap-1 h-12'>
            <img src={pokeball} alt="icon" className="h-7 invert dark:invert-0" />
            <p className="sm:hidden text-2xl leading-7 font-bold md:block">
              Poké<span className="text-primary">dex</span>
            </p>{' '}
          </SheetTitle>
          <SheetDescription>Explore Pokémon and Items here !</SheetDescription>
        </SheetHeader>
        <nav>
          <ul className="list-none h-[50vh] flex flex-col items-start justify-center gap-4">
            {navPages.map((item, index) => (
              <NavItem key={index} title={item.title} link={item.link} icon={item.icon} />
            ))}
          </ul>
        </nav>
        <SheetFooter>
          <ModeToggle />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
