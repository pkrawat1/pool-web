import type { NextPage } from 'next'

const PoolsList: NextPage = ({pools}) => {
  return (
    <div>
      {pools?.map(pool => <span key={pool.id}>{pool.volumeUSD}<br /></span>)}
    </div>
  )
}

export default PoolsList 
