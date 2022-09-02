import { useState } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components';

function App() {
  const [prev, setPrev] = useState(-1)
  const [cards, setCards] = useState([
    { id: 1, src: '/images/image1', status: '' },
    { id: 1, src: '/images/image1', status: '' },
    { id: 2, src: '/images/image2', status: '' },
    { id: 2, src: '/images/image2', status: '' },
    { id: 3, src: '/images/image3', status: '' },
    { id: 3, src: '/images/image3', status: '' },
    { id: 4, src: '/images/image4', status: '' },
    { id: 4, src: '/images/image4', status: '' },
    { id: 5, src: '/images/image5', status: '' },
    { id: 5, src: '/images/image5', status: '' },
    { id: 6, src: '/images/image6', status: '' },
    { id: 6, src: '/images/image6', status: '' },
    { id: 7, src: '/images/image7', status: '' },
    { id: 7, src: '/images/image7', status: '' },
    { id: 8, src: '/images/image8', status: '' },
    { id: 8, src: '/images/image8', status: '' },
  ].sort(() => Math.random() - 0.5))

  const check = (current, target) => {
    if(cards[current].id === cards[prev].id) {
      cards[current].status = 'correct'
      cards[prev].status = 'correct'
      setCards([...cards])
      setPrev(-1)
    }else {
      cards[current].status = 'wrong'
      cards[prev].status = 'wrong'
      setCards([...cards])
      setTimeout(() => {
        cards[current].status = ''
        cards[prev].status = ''
        setCards([...cards])
        setPrev(-1)
      },1000)
    }
  }

  const handleClick = (id, e) => {
      if(prev === -1) {
          cards[id].status = 'active'
          setCards([...cards])
          setPrev(id)
      }else {
        check(id, e.target)
      }
  }

  return (
    <Container>
      <GlobalStyles />
      <h1>catch rosa pig</h1>
      <Board>
        <Cards>
          {cards.map((card, index) => <Card key={index} onClick={(e) => handleClick(index, e)} status={card.status}>
            <img src={`${card.src}.gif`} alt={(card.src).substring(card.src.length - 6)} />
          </Card>)}
        </Cards>
      </Board>
    </Container>
  );
}

export default App;

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #4c3671;
    display: flex;
    justify-content: center;
    align-items: center;
    pesition: relative;
    width: 100vw;
    height: 100vh;
  }
`

const Container = styled.div`
  & h1 {
      text-align: center;
      margin-bottom: 1em;
      font-family: 'Tangerine', serif;
      font-size: 55px;
      line-height: 0;
      text-transform: capitalize;
    }
`

const Board = styled.div`
  width: 700px;
  height: 700px;
`

const Cards = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  gap: 1em;
  height: inherit;
`

const hideCard = keyframes`
 0% { 
  transform: rotateY(0deg) 
  }
 100% { 
  transform: rotateY(180deg) 
  }
 from {
    background-size: 0% 0%;
  }
  to {
      background-size: 50% 42%;
  }
`
const hideImage = keyframes`
 0% { 
  transform: scale(1) 
  }
 65% {
   transform: scale(0) 
   }
`

const Card = styled.div`
  background-color: ${props => props.status === 'correct' ? '#37c2b2' : props.status === 'wrong' ? '#e84a65 ' : '#36235a'};
  border-radius: 5px;
  tarnsition: transform 0.5s;
  transform: ${props => props.status === 'active' ? 'rotateY(0)': 'rotateY(180deg)'};
  animation: 2s ${hideCard} linear;
  background-image: ${props => props.status === '' &&  'url("images/nose.png")'};
  background-size: 50% 42%;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & img {
  max-width: 90%;
  max-height: 90%;
  ${'' /* tarnsition: transform 0.5s */}
  transform: ${props => props.status !== '' ? 'scale(1)': 'scale(0)'};;
  animation: 2s ${hideImage} linear;
  }
`
