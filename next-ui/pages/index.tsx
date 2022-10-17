import Link from 'next/link';
import React, { useState } from 'react';

function Header({ title }) {
  return <h1>{title ? title : "Default title"}</h1>
}

function HomePage() {
  const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton", "Joe Sharp"]

  const [likes, setLikes] = useState(0)

  function handleClick() {
    setLikes(likes + 1)
  }

  return (
    <div>
      <Header title="Computer Science and Maths" />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <button onClick={handleClick}>Like ({likes})</button>

      <Link href={'/tom-binary'}>Tom Binary</Link>
    </div>
  )
}

export default HomePage;