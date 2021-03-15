import { createContext, useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { Header } from './components/Header';

import { api } from './services/api';

import './styles/global.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface GenreContextData {
  selectedGenre: GenreResponseProps;
  selectedGenreId: number;
  handleClickButton: (id: number) => void;
}

export const GenreContext = createContext({} as GenreContextData)

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <GenreContext.Provider value={{
      selectedGenre,
      selectedGenreId,
      handleClickButton,
    }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />

        <div className="container">
          <Header />

          <Content />
        </div>
      </div>
    </GenreContext.Provider>
  )
}