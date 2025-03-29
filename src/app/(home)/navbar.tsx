export const Navbar = () => {
  return (
    <nav className="w-full h-[64px] flex pt-[23px] pl-[32px]">
      <div className="text-[14px] font-[600] leading-[16px] tracking-[-2%] pr-[8px]">
        SKINSTRIC
      </div>
      <div className="flex text-[14px] font-[600] leading-[16px] tracking-[-2%] pl-[8px] gap-[6px] opacity-60">
        <span className="h-[17px] w-[4px] border-[1px] border-r-0 text-[#1A1B1C] rounded-l-[2px]"></span>
        INTRO
        <span className="h-[17px] w-[4px] border-[1px] border-l-0 text-[#1A1B1C] rounded-r-[2px]"></span>
      </div>
    </nav>
  );
};
