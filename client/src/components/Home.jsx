import React from 'react'
import './Home.css'
import Layout from './shared/Layout'

const Home = (props) => {
  return (
    <Layout user={props.user}>
      <div className="home">
      </div>
    </Layout>
  )
}

export default Home