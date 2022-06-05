import React, { useState } from "react";
import Tile from "./Tile";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "./constants"
import { canSwap, shuffle, swap, isSolved } from "./helpers"

function Board({ imgUrl }) {
  //Tạo ra mảng các ô vuông chạy từ 0 -> Count
  const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);

  //Flag check game đã start hay chưa ?
  const [isStarted, setIsStarted] = useState(false);
  console.log('is started:', isStarted)

  //Trọn ngẫu nhiên các ô vuông
  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles)
    setTiles(shuffledTiles);
  }

  //ĐỔi chỗ vị trị ô vuông
  const swapTiles = (tileIndex) => {
    //Check xem có thể đổi chỗ
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
      const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
      setTiles(swappedTiles)
    }
  }

  //Bắt sự kiện click vào từng ô vuông
  const handleTileClick = (index) => {
    swapTiles(index)
  }

  //Trộn ngẫu nhiên các ô vuông = startGame
  const handleShuffleClick = () => {
    shuffleTiles()
  }

  const handleStartClick = () => {
    shuffleTiles()
    setIsStarted(true)
  }

  //Tính kích thước của từng ô vuông
  const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
  const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);

  const style = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  };
  
  //Check xem đã win hay chưa
  const hasWon = isSolved(tiles)

  return (
    <>
      <ul style={style} className="board">
        {tiles.map((tile, index) => (
          <Tile
            key={tile}
            index={index}
            imgUrl={imgUrl}
            tile={tile}
            width={pieceWidth}
            height={pieceHeight}
            handleTileClick={handleTileClick}
          />
        ))}
      </ul>
      {hasWon && isStarted && <div>Puzzle solved 🧠 🎉</div>}
      {!isStarted ?
        (<button onClick={() => handleStartClick()}>Start game</button>) :
        (<button onClick={() => handleShuffleClick()}>Restart game</button>)}
    </>
  );
}

export default Board;