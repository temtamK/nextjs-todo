import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="py-8 px-16">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl">To-Do List</h1>

      <div>
        <input type="text" className="border-black"/>
        <button>추가</button>
      </div>

      <ul>
        <li>할 일 내용</li>
      </ul>
    </div>
  )
}
