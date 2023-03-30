import Skeleton from "react-loading-skeleton";

export default function CategoryCardSkeleton() {
  return (
    <div className=' flex flex-col justify-between overflow-hidden gap-2 w-full shadow-[0px_0px_4px_0px_#00000078] z-0 rounded-[10px]'>
      <div className="px-3 py-2">
        <div className="w-1/4">  <Skeleton /></div>
        <div className="mt-2">
          <Skeleton height={30} />
        </div>
        <div className="mt-2">
          <Skeleton count={2} height={20} />
        </div>
      </div>
      <div>
        <Skeleton height={300} />
      </div>
    </div>
  );
}