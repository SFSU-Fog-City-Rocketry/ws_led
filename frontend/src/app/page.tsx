"use client";
import {
  ChakraProvider,
  Heading,
  FormLabel,
  Switch,
  FormControl,
  Box,
  Center,
  Flex,
  Card,
  CardBody,
  CardHeader,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

let ws = new WebSocket("ws://localhost:5000/&?isLight=false");
export default function Home() {
  const [connectionState, setConnectionState] = useState("Not Connected");
  var [pinState, setPinState] = useState(false);
  
  ws.onopen = (e) => {
    setConnectionState("Connected");
  };
  ws.onerror = function (e) {
    setConnectionState("Error when connecting");
  };
  ws.onclose = function (e) {
    console.log(e.code);
    setConnectionState("Not Connected");
  };
  var toggleSwitch = () => {
    var pinStatus = "";
    pinState == true ? (pinStatus = "LOW") : (pinStatus = "HIGH");
    ws.send(JSON.stringify({ payload: pinStatus }));
    setPinState(!pinState)
    console.log(pinState)
  };
  
  useEffect(() => {
    
   

    document.title = connectionState;
  });
  
  

  return (
    <ChakraProvider>
      <Flex
        width={"100vw"}
        height={"50vh"}
        alignContent={"center"}
        justifyContent={"center"}
      >
        <Center>
          <Box>
            <Box marginBottom="3vh">
              <Heading size="sm" as="h6">
                {connectionState}
              </Heading>
              <p>🚀 Arduino Test Rocket 2023</p>
            </Box>
            {connectionState === "Connected" && (
              <Card variant={"outline"}>
                <CardHeader>
                  <Heading size="sm" as="h5">
                    Pin Control
                  </Heading>
                </CardHeader>
                <CardBody>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel
                      id="connection-status"
                      htmlFor="email-alerts"
                      mb="0"
                    >
                      Set Pin High
                    </FormLabel>
                    <Switch id="email-alerts" onChange={toggleSwitch} />
                  </FormControl>
                </CardBody>
              </Card>
            )}
          </Box>
        </Center>
      </Flex>
    </ChakraProvider>
  );
}