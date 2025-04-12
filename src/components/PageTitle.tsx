
import { ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode;
  subtitle?: string;
}

const PageTitle = ({ children, subtitle }: PageTitleProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-pixel text-primary relative inline-block">
        <span className="relative z-10">{children}</span>
        <span className="absolute -bottom-1 left-0 w-full h-2 bg-ember/30 -skew-x-6 z-0"></span>
      </h1>
      {subtitle && (
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
};

export default PageTitle;
