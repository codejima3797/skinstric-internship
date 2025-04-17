interface CameraPermissionPopupProps {
  onAllow: () => void;
  onDeny: () => void;
}

export const CameraPermissionPopup = ({ onAllow, onDeny }: CameraPermissionPopupProps) => {
  return (
    <div className="absolute xl:top-[50%] lg:top-[52%] md:top-[52%] sm:top-[52%] top-[75%] xl:left-[60%] lg:left-[20%] md:left-[20%] sm:left-[20%] -left-[3%] z-50">
      <div className="bg-black pt-4 xl:w-[320px] lg:w-[320px] md:w-[280px] sm:w-[280px] w-[200px]">
        <h2 className="text-white text-[14px] font-medium text-center border-b border-white pb-12">
          ALLOW A.I. TO ACCESS YOUR CAMERA
        </h2>
        <div className="flex justify-end space-x-4 mt-2">
          <button
            onClick={onDeny}
            className="px-4 py-2 text-white/80 text-sm hover:cursor-pointer"
          >
            DENY
          </button>
          <button
            onClick={onAllow}
            className="px-4 py-2 text-white text-sm hover:cursor-pointer"
          >
            ALLOW
          </button>
        </div>
      </div>
    </div>
  );
};
