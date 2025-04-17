interface CameraTipsProps {
  className?: string;
  textColor?: string;
}

export const CameraTips = ({ className = "", textColor = "text-black" }: CameraTipsProps) => {
  return (
    <div className={`absolute xl:bottom-[5%] lg:bottom-[5%] md:bottom-[10%] sm:bottom-[15%] bottom-[15%] xl:left-0 lg:left-0 md:left-0 sm:left-0 left-0 xl:right-0 lg:right-0 md:right-0 sm:right-0 right-0 flex flex-col items-center z-20 ${className}`}>
      <div className={`${textColor} text-center mb-4`}>
        TO GET BETTER RESULTS MAKE SURE TO HAVE:
      </div>
      <div className={`flex xl:space-x-8 lg:space-x-8 md:space-x-8 sm:space-x-8 space-x-4 ${textColor} text-sm text-center`}>
        <div>◇ NEUTRAL EXPRESSION</div>
        <div>◇ FRONTAL POSE</div>
        <div>◇ ADEQUATE LIGHTING</div>
      </div>
    </div>
  );
};
