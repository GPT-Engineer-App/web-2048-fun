import { Box, Flex, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <Box bg="teal.500" p={4}>
      <Flex justify="space-between">
        <Link as={NavLink} to="/" color="white" fontSize="lg" mr={4}>
          Home
        </Link>
        <Link as={NavLink} to="/instructions" color="white" fontSize="lg">
          Instructions
        </Link>
      </Flex>
    </Box>
  );
}

export default Navigation;
