import Image from "next/image";
import IntroNavbarImage from "../../../public/intro-navbar.png";
import AnalysisNavbarImage from "../../../public/analysis-navbar.png";

interface NavbarProps {
  isInverted?: boolean;
  variant?: 'intro' | 'analysis';
}

export const Navbar: React.FC<NavbarProps> = ({ isInverted, variant = 'intro' }) => {
  return (
    <nav className={`w-full h-auto flex items-center ${isInverted ? 'invert' : ''}`}>
      <Image 
        src={variant === 'intro' ? IntroNavbarImage : AnalysisNavbarImage} 
        alt="Navbar"
      />
    </nav>
  );
};