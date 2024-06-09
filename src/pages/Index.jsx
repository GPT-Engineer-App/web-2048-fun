import React, { useState, useEffect } from "react";
import { Container, VStack, HStack, Box, Text, Button, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaUndo } from "react-icons/fa";

const SIZE = 8;

const getInitialGrid = () => {
  const grid = Array(SIZE)
    .fill(null)
    .map(() => Array(SIZE).fill(0));
  addRandomTile(grid);
  addRandomTile(grid);
  return grid;
};

const addRandomTile = (grid) => {
  const emptyTiles = [];
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (grid[i][j] === 0) emptyTiles.push([i, j]);
    }
  }
  if (emptyTiles.length === 0) return;
  const [x, y] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  grid[x][y] = Math.random() < 0.9 ? 2 : 4;
};

const cloneGrid = (grid) => grid.map((row) => row.slice());

const moveLeft = (grid) => {
  let moved = false;
  for (let i = 0; i < SIZE; i++) {
    let row = grid[i].filter((val) => val);
    for (let j = 0; j < row.length - 1; j++) {
      if (row[j] === row[j + 1]) {
        row[j] *= 2;
        row[j + 1] = 0;
      }
    }
    row = row.filter((val) => val);
    while (row.length < SIZE) row.push(0);
    if (grid[i].some((val, idx) => val !== row[idx])) moved = true;
    grid[i] = row;
  }
  return moved;
};

const rotateGrid = (grid) => {
  const newGrid = Array(SIZE)
    .fill(null)
    .map(() => Array(SIZE).fill(0));
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      newGrid[j][SIZE - 1 - i] = grid[i][j];
    }
  }
  return newGrid;
};

const move = (grid, direction) => {
  let moved = false;
  for (let i = 0; i < direction; i++) grid = rotateGrid(grid);
  moved = moveLeft(grid);
  for (let i = 0; i < (4 - direction) % 4; i++) grid = rotateGrid(grid);
  return { grid, moved };
};

const checkGameOver = (grid) => {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (grid[i][j] === 0) return false;
      if (i > 0 && grid[i][j] === grid[i - 1][j]) return false;
      if (j > 0 && grid[i][j] === grid[i][j - 1]) return false;
    }
  }
  return true;
};

const getCellColor = (value) => {
  switch (value) {
    case 2:
      return "gray.200";
    case 4:
      return "gray.300";
    case 8:
      return "orange.300";
    case 16:
      return "orange.400";
    case 32:
      return "orange.500";
    case 64:
      return "orange.600";
    case 128:
      return "yellow.300";
    case 256:
      return "yellow.400";
    case 512:
      return "yellow.500";
    case 1024:
      return "green.300";
    case 2048:
      return "green.400";
    default:
      return "gray.200";
  }
};

const Index = () => {
  const [grid, setGrid] = useState(getInitialGrid());
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const toast = useToast();

  const handleMove = (direction) => {
    const newGrid = cloneGrid(grid);
    const { grid: movedGrid, moved } = move(newGrid, direction);
    if (moved) {
      addRandomTile(movedGrid);
      setHistory([...history, { grid: cloneGrid(grid), score }]);
      setGrid(movedGrid);
      setScore(score + movedGrid.flat().reduce((acc, val) => acc + val, 0) - grid.flat().reduce((acc, val) => acc + val, 0));
      if (checkGameOver(movedGrid)) {
        toast({
          title: "Game Over",
          description: "No more moves available.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") handleMove(3);
    if (e.key === "ArrowRight") handleMove(0);
    if (e.key === "ArrowDown") handleMove(1);
    if (e.key === "ArrowLeft") handleMove(2);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history.pop();
      setGrid(lastState.grid);
      setScore(lastState.score);
      setHistory(history);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [grid, score, history]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">2048 Game</Text>
        <Text>Score: {score}</Text>
        <VStack spacing={1}>
          {grid.map((row, rowIndex) => (
            <HStack key={rowIndex} spacing={1}>
              {row.map((cell, cellIndex) => (
                <motion.div key={cellIndex} layout initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                  <Box width="60px" height="60px" display="flex" justifyContent="center" alignItems="center" bg={getCellColor(cell)} borderRadius="md">
                    <Text fontSize="xl" fontWeight="bold">
                      {cell !== 0 && cell}
                    </Text>
                  </Box>
                </motion.div>
              ))}
            </HStack>
          ))}
        </VStack>
        <Button leftIcon={<FaUndo />} onClick={handleUndo} colorScheme="teal" variant="solid">
          Undo
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
