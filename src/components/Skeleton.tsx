import { clsx } from 'clsx';

const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx('animate-pulse rounded-md bg-gray-700', className)}
    />
  );
};

export default Skeleton;
