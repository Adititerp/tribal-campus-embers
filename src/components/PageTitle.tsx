
import { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';

interface PageTitleProps {
  children: ReactNode;
  subtitle?: string;
  showSparkles?: boolean;
}

const PageTitle = ({ children, subtitle, showSparkles = false }: PageTitleProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-pixel text-primary relative inline-block group">
        <span className="relative z-10 transition-all duration-500 group-hover:text-ember/90">
          {showSparkles && (
            <Sparkles className="inline-block -ml-6 -mt-1 text-amber-400 animate-pulse absolute" size={24} />
          )}
          {children}
          {showSparkles && (
            <Sparkles className="inline-block -mr-6 -mt-1 text-amber-400 animate-pulse absolute right-0" size={24} />
          )}
        </span>
        <span className="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-amber-300/50 via-ember/50 to-red-400/50 -skew-x-6 z-0 transform transition-transform group-hover:scale-x-110"></span>
      </h1>
      {subtitle && (
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">{subtitle}</p>
      )}
    </div>
  );
};

export default PageTitle;
