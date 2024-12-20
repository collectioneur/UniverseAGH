export default function Background() {
  return (
    <div className="fixed left-0 bottom-0 right-0 z-[-1] top-0">
      <div className="absolute bottom-0 rounded-full aspect-square h-[500px] right-0 translate-x-[50%] bg-customred/[.5] blur-[150px]" />
      <div className="absolute bottom-0 rounded-full aspect-square h-[500px] right-0 translate-y-[50%] -translate-x-[40%] bg-customgreen/[.5] blur-[150px]" />
    </div>
  );
}
