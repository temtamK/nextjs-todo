import React from 'react'
import Head from 'next/head'

export default function Home() {
  const [list, setList] = React.useState([]);
  const [text, setText] = React.useState('');
  React.useEffect(()=>{
    
  }, [])

  const addItem = React.useCallback( () => {
    const item = {
      id: ( new Date().getTime() ).toString(),
      text,
    };
    setList([
      ...list,
      item,
    ]);
  }, [list, text] );

  const removeItem = React.useCallback( id => {
    
  })
  
  return (
    <div className="py-8 px-16">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl font-bold">To-Do List</h1>

      <div>
        <input 
          type="text" className="border py-1" 
          value={ text } 
          onChange={ event => setText( event.target.value ) }/>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          onClick={ addItem }>
          추가
        </button>
      </div>

      <ul className="list-disc">
        {
          list.map( item => (
            <li key={ item.id }>
              { item.text }
              <button className="ml-2 text-xs text-red-500">[삭제]</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
