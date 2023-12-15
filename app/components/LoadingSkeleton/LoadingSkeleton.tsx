import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingSkeleton = () => {
    return (
        <SkeletonTheme baseColor="#dee1e6" >
            <header className="flex justify-between items-center">
                <Skeleton width={240} height={50} />
                <Skeleton width={70} height={25} />
            </header>
            <main>
                <section>
                    <form className='flex flex-col border-2 rounded-md p-2 gap-4 mb-4'>
                        <Skeleton width={100} height={20} className='p-2' />
                        <Skeleton width={270} height={8} className='p-2' />
                        <div className='flex justify-between'>
                            <div className='flex gap-3'>
                                <Skeleton width={200} height={40} />
                                <Skeleton width={150} height={40} />
                            </div>
                            <div className='flex gap-3'>
                                <Skeleton width={70} height={40} />
                                <Skeleton width={90} height={40} />
                            </div>
                        </div>
                    </form>
                </section>
                <section className='flex p-2 gap-2 m-2'>
                    <Skeleton circle width={20} height={20} className='p-2' />
                    <div>
                        <div className='flex justify-between'>
                            <Skeleton width={100} height={8} className='p-2' />
                        </div>
                        <Skeleton width={270} height={17} />
                        <div className='flex gap-6'>
                            <Skeleton width={140} height={15} />
                            <Skeleton width={100} height={15} />
                        </div>
                    </div>
                </section>
            </main>
        </SkeletonTheme>
    )
}

export default LoadingSkeleton
