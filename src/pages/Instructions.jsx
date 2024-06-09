import { Box, Heading, Text, Button } from "@chakra-ui/react";
import introJs from "intro.js";
import "intro.js/introjs.css";

function Instructions() {
  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        How to Play the Game
      </Heading>
      <Text fontSize="lg" mb={3}>
        Welcome to the game! Here are the instructions to get you started:
      </Text>
      <Text fontSize="md" mb={2}>
        1. Step one: Do this.
      </Text>
      <Text fontSize="md" mb={2}>
        2. Step two: Do that.
      </Text>
      <Text fontSize="md" mb={2}>
        3. Step three: Win the game!
      </Text>
      <Button onClick={() => introJs().start()} colorScheme="teal" mt={4}>
        Start Guide
      </Button>
    </Box>
  );
}

export default Instructions;
