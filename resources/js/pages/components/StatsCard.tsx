import { useState, useEffect } from 'react';
import { Users, TrendingUp, Activity, DollarSign, ShoppingCart, Users2, LucideIcon, ClockArrowDown } from 'lucide-react';
import { JSX } from 'react/jsx-runtime';

// Define available icon options
type IconOption = 'users' | 'activity' | 'dollar' | 'cart' | 'team' | 'trending' | 'pending';

// Map of icon names to Lucide components
const iconMap: Record<IconOption, LucideIcon> = {
  users: Users,
  activity: Activity,
  dollar: DollarSign,
  cart: ShoppingCart,
  team: Users2,
  trending: TrendingUp,
  pending: ClockArrowDown, // Placeholder for a different icon
};

// Define preset color themes instead of dynamic class names
type ColorTheme = 'green' | 'blue' | 'purple' | 'orange' | 'pink' | 'teal';

// Map of color themes to their gradient classes
const colorThemeMap: Record<ColorTheme, { bg: string, from: string, to: string }> = {
  green: {
    bg: 'bg-gradient-to-br from-green-400 to-emerald-500',
    from: 'from-green-400',
    to: 'to-emerald-500'
  },
  blue: {
    bg: 'bg-gradient-to-br from-blue-400 to-indigo-500',
    from: 'from-blue-400',
    to: 'to-indigo-500'
  },
  purple: {
    bg: 'bg-gradient-to-br from-purple-400 to-pink-500',
    from: 'from-purple-400',
    to: 'to-pink-500'
  },
  orange: {
    bg: 'bg-gradient-to-br from-orange-400 to-red-500',
    from: 'from-orange-400',
    to: 'to-red-500'
  },
  pink: {
    bg: 'bg-gradient-to-br from-pink-400 to-rose-500',
    from: 'from-pink-400',
    to: 'to-rose-500'
  },
  teal: {
    bg: 'bg-gradient-to-br from-teal-400 to-cyan-500',
    from: 'from-teal-400',
    to: 'to-cyan-500'
  }
};

// Define the props interface
interface StatsCardProps {
  title?: string;
  value?: number;
  subtitle?: string;
  icon?: IconOption;
  trend?: string | null;
  colorTheme?: ColorTheme;
  progressValue?: number;
  animationDuration?: number;
}

// Props for our StatsCard component with default values
const StatsCard: React.FC<StatsCardProps> = ({ 
  title = "Users",
  value = 123,
  subtitle = "Active accounts",
  icon = "users",
  trend = "+12.5%",
  colorTheme = "green",
  progressValue = 75, // as percentage (0-100)
  animationDuration = 2000 // in milliseconds
}: StatsCardProps) => {
  const [count, setCount] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  // Get the icon component from our map
  const IconComponent = iconMap[icon] || Users;
  
  // Get color theme classes
  const colors = colorThemeMap[colorTheme];
  
  // Animate count on load
  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = Math.ceil(value / (animationDuration / 15)); // Calculate increment step
      
      const animate = () => {
        setCount(prev => {
          if (prev < value) {
            return Math.min(prev + increment, value);
          }
          return prev;
        });
      };
      
      const counter = setInterval(animate, 15);
      
      setTimeout(() => clearInterval(counter), animationDuration);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [value, animationDuration]);

  return (
    <div 
      className={`border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border shadow-lg transition-all duration-300 ease-in-out ${colors.bg}`}
      style={{ 
        aspectRatio: '16/9',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 12px 20px rgba(0, 0, 0, 0.15)' : '0 4px 10px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-black blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center p-6">
        <div className="flex w-full items-center justify-between gap-4">
          {/* Left side with icon and stats */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-300" 
                style={{ transform: isHovered ? 'scale(1.05) rotate(5deg)' : 'scale(1)' }}>
              <IconComponent className="h-7 w-7 text-white" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold text-white">{count}</span>
                <span className="pb-1 text-lg font-medium text-white/80">{title}</span>
              </div>
              <span className="text-sm font-medium text-white/70">{subtitle}</span>
            </div>
          </div>
          
          {/* Right side with percentage */}
          {trend && (
            <div className="flex items-center gap-1 rounded-lg bg-white/15 px-3 py-2 backdrop-blur-sm">
              <TrendingUp className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">{trend}</span>
            </div>
          )}
        </div>
        
        {/* Bottom progress bar */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-white/10">
          <div 
            className="h-full bg-white/40 backdrop-blur-sm transition-all duration-500 ease-out"
            style={{ width: `${progressValue}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard
// Demo implementation showcasing the component with different themes
// export default function DemoCard(): JSX.Element {
//   return (
//     <div className="space-y-6">
//       <StatsCard 
//         title="Users"
//         value={123}
//         subtitle="Active accounts"
//         icon="users"
//         trend="+12.5%"
//         colorTheme="green"
//         progressValue={75}
//         animationDuration={2000}
//       />
      
//       <StatsCard 
//         title="Revenue"
//         value={8547}
//         subtitle="Monthly earnings"
//         icon="dollar"
//         trend="+23.4%"
//         colorTheme="blue"
//         progressValue={85}
//       />
      
//       <StatsCard 
//         title="Orders"
//         value={312}
//         subtitle="Completed purchases"
//         icon="cart"
//         trend="+8.7%"
//         colorTheme="purple"
//         progressValue={65}
//       />
//     </div>
//   );
// }
