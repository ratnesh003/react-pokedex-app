import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow hover:opacity-80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
        normal: 'border-transparent text-primary-foreground shadow hover:opacity-85 bg-[#BCBCAC]',
        fighting: 'border-transparent text-primary-foreground shadow hover:opacity-80 bg-[#BC5442]',
        flying: 'border-transparent text-primary-foreground shadow hover:opacity-80 bg-[#669AFF]',
        poison: 'border-transparent text-primary-foreground shadow hover:opacity-80 bg-[#AB549A]',
        ground: 'border-transparent text-primary-foreground shadow hover:opacity-80 bg-[#DEBC54]',
        rock: 'border-transparent text-primary-foreground shadow hover:opacity-80 bg-[#BCAC66]',
        bug: 'border-transparent text-primary-foreground shadow hover:opacity-80 bg-[#ABBC1C]',
        ghost: 'border-transparent text-primary-foreground shadow hover:opacity-80 bg-[#6666BC]',
        steel: 'border-transparent text-primary-foreground shadow hover:opacity-80 bg-[#ABACBC]',
        fire: 'border-transparent text-primary-foreground shadow hover:opacity-80 bg-[#FF421C]',
        water: 'border-transparent text-primary-foreground shadow hover:opacity-80 bg-[#2F9AFF]',
        grass: 'border-transparent text-primary-foreground shadow hover:opacity-80 bg-[#78CD54]',
        electric: 'border-transparent text-primary-foreground shadow hover:opacity-80 bg-[#FFCD30]',
        psychic: 'border-transparent text-primary-foreground shadow hover:opacity-80 bg-[#FF549A]',
        ice: 'border-transparent text-primary-foreground shadow hover:opacity-80 bg-[#78DEFF]',
        dragon: 'border-transparent text-primary-foreground shadow hover:opacity-80 bg-[#7866EF]',
        dark: 'border-transparent text-primary-foreground shadow hover:opacity-80 bg-[#785442]',
        fairy: 'border-transparent text-primary-foreground shadow hover:opacity-80 bg-[#FFACFF]',
        shadow: 'border-transparent text-primary-foreground shadow hover:opacity-80 bg-[#0E2E4C]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
