import Tabs from "../Search/Tabs"
import { useState, useEffect } from "hooks"
import { useSetRecoilState, useRecoilValue } from "recoil"

import { BookMarkListAtom, ClickedBookMarkDataAtom } from "components/atom"
import styles from './bookmark.module.scss'
import BookMarkModal from "../Modal/BookMarkModal"
import { IMovieData } from "components/types/movie"

const BookMark = () => {
  const [openModal, setOpenModal] = useState(false)
  const bookmarkedMovies = useRecoilValue(BookMarkListAtom)
  const setClickedBookmark = useSetRecoilState(ClickedBookMarkDataAtom)
  const [noBookmark, setNoBookmark] = useState(true)

  const handleMovieClick = (movie : IMovieData) => {
    setOpenModal(true)
    setClickedBookmark(movie)
  }

  useEffect(() => {
    setNoBookmark(bookmarkedMovies.length === 0)
  }, [bookmarkedMovies])

  return (
    <div className={styles.defaultStyle}>
      <header>
        <h1>내 즐겨찾기</h1>
      </header>
      <section>
        { 
        noBookmark ? 
          <p>즐겨찾기가 존재하지 않습니다.</p> :
          <ul className={styles.resultList}>
            {bookmarkedMovies.map((movie) => 
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <li key={`movie-${movie.imdbID}`} className={styles.eachResult} onClick={() => handleMovieClick(movie)}>
                <img src={movie.Poster} alt='movie poster'/>
                <div className={styles.contents}>
                  <div className={styles.title}>{movie.Title}</div>
                  <span className={styles.type}>{movie.Type}</span> |
                  <span className={styles.year}>{movie.Year}</span>
                </div>
              </li>
        )}
          </ul>
        }
      </section>
      <Tabs />
      <BookMarkModal openModal={openModal} setOpenModal={setOpenModal} state='forDelete' />
    </div>
  )
}

export default BookMark

// Tab를 router안에 집어 넣을 수 있는지 확인
// bookmark bookMark 통일
// search component의 styles랑 겹치는 문제 해결
// suspense 넣기
// section에 scss 추가해주기