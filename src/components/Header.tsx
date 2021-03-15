import { useContext } from "react"

import { GenreContext } from "../App"

export function Header() {
  const { selectedGenre } = useContext(GenreContext)

  return (
    <header>
      <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
    </header>
  )
}