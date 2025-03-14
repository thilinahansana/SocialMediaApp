import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  Select,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaRunning } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { GrYoga } from "react-icons/gr";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { FaRegShareFromSquare } from "react-icons/fa6";

import { BiChat, BiLike, BiShare } from "react-icons/bi";
import WorkoutProfileUpdateModal from "../../Components/Workout/WorkoutProfileUpdateModal";
import { TbActivityHeartbeat } from "react-icons/tb";
import { useParams } from "react-router-dom";
import WorkoutProfileSaveModal from "../../Components/Workout/WorkoutProfileSaveModal";
import axios from "axios";

const WorkoutStatus = () => {
  const { username } = useParams();
  const {
    isOpen: isSaveOpen,
    onOpen: onSaveOpen,
    onClose: onSaveClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [bmi, setBmi] = useState();
  const [calories, setCalories] = useState();

  const handleUpdate = () => {
    onUpdateOpen();
  };

  const handleSave = () => {
    onSaveOpen();
  };

  const handleHeight = (e) => {
    setHeight(e.target.value);
  };
  const handleWeight = (e) => {
    setWeight(e.target.value);
  };
  const handleBmi = (e) => {
    setBmi(e.target.value);
  };
  const handleCalories = (e) => {
    setCalories(e.target.value);
  };
  const Id = localStorage.getItem("workoutProfileId");
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/workoutprofile/${Id}`)
      .then((response) => {
        // Update state with the fetched data
        setHeight(response.data.height);
        setWeight(response.data.weight);
        setBmi(response.data.bmi);
        setCalories(response.data.calories);
      })
      .catch((error) => {
        console.error("Error fetching workout profile:", error);
      });
  }, []); // Add an empty array as the second argument to run the effect only once on mount

  return (
    <div>
      <div className="flex">
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_1280.jpg"
            alt=""
            className="absolute z-0 object-cover w-full h-[89vh]"
          />
        </div>

        <Card maxW="md" className="m-8 mt-20  w-[50%] rounded-md">
          <CardHeader className="bg-blue-100 rounded-t-md">
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar
                  name="Segun Adebayo"
                  src="https://media.istockphoto.com/id/1398758305/photo/happy-young-intern-girl-looking-at-camera-smiling-getting-job.jpg?s=612x612&w=0&k=20&c=ufqqRkVOq-qQJ-uXoklmdQ2KDsR7k3OP9cMSquJFk9o="
                />

                <Box>
                  <Heading size="sm">Segun Adebayo</Heading>
                  <Text>Creator, Chakra UI</Text>
                </Box>
              </Flex>
              <IconButton
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                icon={<BsThreeDotsVertical />}
              />
            </Flex>
          </CardHeader>

          <CardBody className="bg-blue-100 rounded-b-md">
            <div>
              <label htmlFor="" className="font-semibold">
                Height
              </label>
              <Input
                onChange={handleHeight}
                value={height}
                disabled
                className="border-2 border-blue-500 "
              ></Input>
            </div>
            <div className="mt-4">
              <label htmlFor="" className="font-semibold">
                Weight
              </label>
              <Input onChange={handleWeight} value={weight} disabled></Input>
            </div>
            <div className="mt-4">
              <label htmlFor="" className="font-semibold mt-4">
                Bmi
              </label>
              <Input onChange={handleBmi} value={bmi} disabled></Input>
            </div>
            <div className="mt-4">
              <label htmlFor="" className="font-semibold">
                Calories
              </label>
              <Input
                onChange={handleCalories}
                value={calories}
                disabled
              ></Input>
            </div>
            {!weight && !height && !bmi && !calories && (
              <Button onClick={handleSave} className="text-4xl mt-4 float-end">
                Save
              </Button>
            )}
            {calories && (
              <Button
                onClick={handleUpdate}
                className="text-4xl mt-4 float-end bg-blue-500"
              >
                Update
              </Button>
            )}
          </CardBody>
        </Card>
        <div className="ml-10 mt-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <TbActivityHeartbeat className="z-10" />
              <h1 className="text-2xl m-4 font-semibold z-10">
                Workout Status
              </h1>
              <hr />
            </div>

            <div className="float-end">
              <Select placeholder="Select option">
                <option value="option1">Daily</option>
                <option value="option2">Weekly</option>
                <option value="option3">Monthly</option>
              </Select>
            </div>
          </div>
          <div>
            <Stack>
              <Card size="md">
                <CardBody className="bg-blue-100 rounded-md">
                  <div className="">
                    <TableContainer>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>Name</Th>
                            <Th>Goal</Th>
                            <Th>Archievment</Th>
                            <Th>Status</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td>
                              <div className="flex">
                                <FaRunning className="text-xl" />
                                <h2 className="ml-2 font-semibold">Running</h2>
                              </div>
                            </Td>
                            <Td>
                              10 <span>(km)</span>
                            </Td>
                            <Td>
                              {" "}
                              12 <span>(km)</span>
                            </Td>
                            <Td>
                              <TiTick className="font-bold text-green-600 text-xl" />
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>
                              <div className="flex">
                                <GiWeightLiftingUp className="text-xl" />
                                <h2 className="ml-2 font-semibold">
                                  Weight Lifting
                                </h2>
                              </div>
                            </Td>
                            <Td>
                              <Flex justify="space-between">
                                <Text>10 Reps</Text>
                              </Flex>
                              <Flex justify="space-between">
                                <Text>Using 3 Sets</Text>
                              </Flex>
                            </Td>
                            <Td>
                              <Flex justify="space-between">
                                <Text>8 Reps</Text>
                              </Flex>
                              <Flex justify="space-between">
                                <Text>Using 3 Sets</Text>
                              </Flex>
                            </Td>

                            <Td>
                              <IoClose className="font-bold text-red-600 text-xl" />
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>
                              <div className="flex">
                                <GrYoga className="text-xl" />
                                <h2 className="ml-2 font-semibold">Yoga</h2>
                              </div>
                            </Td>
                            <Td>
                              <Text>1 Hour</Text>
                            </Td>
                            <Td>
                              <Text>1 Hour</Text>
                            </Td>
                            <Td>
                              <TiTick className="font-bold text-green-600 text-xl" />
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                      <div className="float-end m-4 text-2xl cursor-pointer">
                        <FaRegShareFromSquare className="text-blue-500" />
                      </div>
                    </TableContainer>
                  </div>
                  <Text></Text>
                </CardBody>
              </Card>
            </Stack>
          </div>
        </div>
      </div>
      <WorkoutProfileUpdateModal
        isUpdateOpen={isUpdateOpen}
        onUpdateClose={onUpdateClose}
        workoutId={Id}
      />
      <WorkoutProfileSaveModal
        isSaveOpen={isSaveOpen}
        onSaveClose={onSaveClose}
      />
    </div>
  );
};

export default WorkoutStatus;
