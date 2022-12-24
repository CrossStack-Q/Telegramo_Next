import { Box, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useState } from "react";
import ConversationModal from "./Modal/Modal";

interface ConversationsListProps {
  session : Session
}

const ConversationsList: React.FC<ConversationsListProps> = ({session}) => {


  const [isOpen, setIsOpen] = useState(false);

  const onOpen = ()=> setIsOpen(true);
  const onClose = ()=> setIsOpen(false);

  return <Box width="100%" >
    <Box py={2} px={4} mb={4} bg="blackAlpha.300" borderRadius={4} cursor="pointer" onClick={onOpen} >
      <Text className="text-center font-medium" color="whiteAlpha.800" >
        Find or start a connversation
      </Text>
    </Box>
    <ConversationModal session={session} isOpen={isOpen} onClose={onClose} />
  </Box> ;
};

export default ConversationsList;
