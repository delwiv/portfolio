export default function MasonryGrid({ children }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[10px]'>
      {children}
    </div>
  )
}
