

interface NavbarProps {
  isInverted?: boolean;
  variant?: 'intro' | 'analysis';
}

export const Navbar: React.FC<NavbarProps> = ({ isInverted, variant = 'intro' }) => {
  return (
    <nav className={`w-full h-auto flex items-center ${isInverted ? 'invert' : ''}`}>
      <div className="relative w-full h-[64px]">

      </div>
    </nav>
  );
};