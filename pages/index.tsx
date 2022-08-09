import type { NextPage } from 'next'
import { useQuery, gql } from '@apollo/client'
import {GET_POOLS_LIST} from './../gql'
import { PoolsList } from './../components'

const Home: NextPage = () => {
  const { loading, error, data } = useQuery(GET_POOLS_LIST);

  return (
    <main className="container">
      <PoolsList pools={data?.pools} />
    </main>
  )
}

export default Home
