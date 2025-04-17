import Image from "next/image";

interface NavbarProps {
  isInverted?: boolean;
  variant?: 'intro' | 'analysis';
}

export const Navbar: React.FC<NavbarProps> = ({ isInverted, variant = 'intro' }) => {
  return (
    <nav className={`w-full h-auto relative flex items-center ${isInverted ? 'invert' : ''}`}>
      <div className="w-[120px] flex items-center justify-between absolute top-4 left-6">
        <Image 
          src="/skinstric-navbar.png"
          alt="Skinstric Navbar"
          className="w-[58px] h-[10px]"
          width={50}
          height={64}
          priority
        />
        <Image 
          src={variant === 'intro' ? '/navbar-intro.png' : '/navbar-analysis.png'}
          alt={variant === 'intro' ? "Intro Navbar" : "Analysis Navbar"}
          className="w-[56px] h-[16px]"
          width={50}
          height={64}
          priority
        />
      </div>
    </nav>
  );
};