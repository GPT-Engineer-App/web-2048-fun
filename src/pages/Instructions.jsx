import { Box, Heading, Text } from "@chakra-ui/react";

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
    </Box>
  );
}

export default Instructions;
