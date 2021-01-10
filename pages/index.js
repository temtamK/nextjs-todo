import React from 'react'
import Head from 'next/head'
import _ from 'lodash'
import produce from 'immer'

export default function Home() {
  console.log('함수 컴포넌트 실행됨');
  const [list, setList] = React.useState([]);
  const [text, setText] = React.useState('');
  React.useEffect(()=>{
    // 컴포넌트가 화면에 표시될 때
    let result = localStorage.getItem( 'todo-list' )
    if ( !result ) {
      result = [];
    }
    else {
      try {
        result = JSON.parse( result );
      }
      catch( error ) {
        result = [];
      }
    }
    setList( result );
  }, [])
  React.useEffect(() => {
    // list 라는 주시 대상에 변경이 있었을 때
    localStorage.setItem( 'todo-list', JSON.stringify( list ) );
  }, [list] );

  const addItem = React.useCallback( () => {
    const item = {
      id: ( new Date().getTime() ).toString(),
      text,
    };
    setList([
      ...list,
      item,
    ]);
    setText( '' );
  }, [list, text] );

  // 할 일 제거
  const removeItem = React.useCallback( id => {
    setList( _.reject( list, item => item.id === id ) );  
  }, [list]);

  // 할 일이 완료됐으면 체크
  const done = React.useCallback( id => {
    setList( produce( list, draft => {
      const target = list.find( item => item.id == id);
      const index = list.indexOf( target );
      draft[ index ].isDone = !target.isDone;
    } ) );
  }, [list] ); 

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
              <input type="checkbox" 
              className="mr-2" 
              checked={ item.isDone }
              onChange={ () => done( item.id ) }/>
            <span className={ item.isDone ? 'line-through text-gray-500' : ''}>
              { item.text }
            </span>
              <button className="ml-2 text-xs text-red-500"
                onClick={ () => removeItem( item.id ) }>
                [삭제]
              </button>
            </li>
          ))
        }
      </ul>
      
    </div>
  )
}
