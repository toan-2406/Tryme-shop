import Skeleton from "react-loading-skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className='shadow-[0px_0px_4px_0px_#00000078] z-0 rounded-[10px] p-2 text-left md:p-4 h-[472px] w-full'>
        <Skeleton height={280} />
      <div className='mt-4'>
        <Skeleton width='80%' height={20} />
      </div>
      <div className='mt-2 flex items-center'>
        <Skeleton width={60} height={20} />
        <span className='ml-2 '>
          <Skeleton width={60} height={20} />
        </span>
      </div>
      <div className='mt-2 flex items-center justify-between gap-1 space-x-1'>
        <div>
          <Skeleton width={80} height={20} />
          <Skeleton width={100} height={30} className='mt-2' />
        </div>
        <Skeleton width={21} height={21} />
      </div>
    </div>
  );
}