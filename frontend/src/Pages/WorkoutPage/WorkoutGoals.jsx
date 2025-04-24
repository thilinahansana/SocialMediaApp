import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { BsPlusCircleFill, BsThreeDotsVertical } from "react-icons/bs";
import WorkoutGoalCreateModal from "../../Components/Workout/WorkoutGoalCreateModal";
import { FaDeleteLeft } from "react-icons/fa6";
import { GoGoal } from "react-icons/go";

const WorkoutGoals = () => {
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const [selectedType, setSelectedType] = useState("daily");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchGoalsByType(selectedType);
  }, [selectedType, startDate, endDate]);

  const fetchGoalsByType = async (type) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `http://localhost:8080/api/workout-goals/${userId}/${type}`
      );

      setGoals(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(`Error fetching goals:`, error);
      // You can add code here to provide feedback to the user about the error
    }
  };

  const handleChangeType = (event) => {
    setSelectedType(event.target.value);
  };

  const handleClick = () => {
    onCreateOpen();
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleDelete = async (goalId) => {
    console.log(`Deleting goal with id ${goalId}`);
    try {
      await axios.delete(`http://localhost:8080/api/workout-goals/${goalId}`);
      fetchGoalsByType(selectedType);
      console.log(`Goal with id ${goalId} deleted`);
    } catch (error) {
      console.error(`Error deleting goal:`, error);
      // You can add code here to provide feedback to the user about the error
    }
  };

  return (
    <div>
      <div>
        <img
          src="https://cdn.pixabay.com/photo/2020/06/10/07/05/yoga-5281457_1280.jpg"
          alt=""
          className="absolute z-0 object-cover w-full h-[89vh]"
        />
      </div>
      <div className="flex justify-start space-x-20">
        <div className="ml-8 flex justify-between items-center space-x-60">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl m-4 font-semibold">My Goals</h1>
            <BsPlusCircleFill
              className="text-4xl text-white z-50"
              onClick={handleClick}
            />
          </div>
          <div className=" items-center">
            <Select value={selectedType} onChange={handleChangeType}>
              <option value="daily">Daily Goals</option>
              <option value="weekly">Weekly Goals</option>
              <option value="monthly">Monthly Goals</option>
            </Select>
          </div>
          <div className="flex items-center">
            <Input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
            />
            {selectedType !== "daily" && (
              <Input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex space-x-4 justify-center">
        <div className="w-[90%]">
          <Card>
            <CardHeader className="bg-blue-100 rounded-t-md">
              <Flex justify="space-between">
                <Heading size="md">
                  {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}{" "}
                  Goals
                </Heading>
                <BsThreeDotsVertical />
              </Flex>
            </CardHeader>
            <CardBody className="bg-blue-100 rounded-b-md">
              {goals.map((goal, goalIndex) => {
                const goalStartDate = new Date(goal.startDate);
                const selectedDate = startDate ? new Date(startDate) : null;

                if (
                  (selectedType === "daily" &&
                    selectedDate &&
                    goalStartDate.getDate() === selectedDate.getDate() &&
                    goalStartDate.getMonth() === selectedDate.getMonth() &&
                    goalStartDate.getFullYear() ===
                      selectedDate.getFullYear()) ||
                  (selectedType !== "daily" &&
                    (!startDate || goalStartDate >= new Date(startDate)) &&
                    (!endDate ||
                      !goal.endDate ||
                      new Date(goal.endDate) <= new Date(endDate)))
                ) {
                  return (
                    <Card key={goalIndex} mb={4}>
                      <CardBody>
                        <FaDeleteLeft
                          className="text-red-500 text-4xl float-end cursor-pointer"
                          onClick={() => handleDelete(goal.id)}
                        />
                        <div className="flex">
                          <div className="mr-4">
                            <GoGoal className="relative top-5 text-4xl" />
                          </div>
                          <Table size="" variant="">
                            <Thead>
                              <Tr>
                                <Th width="25%">Name</Th>
                                <Th width="25%">Description</Th>
                                <Th width="25%">Target</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {goal.activities.map(
                                (activity, activityIndex) => (
                                  <Tr key={activityIndex}>
                                    <Td width="25%">{activity.name}</Td>
                                    {activity.name == "Running" && (
                                      <Td width="25%">-</Td>
                                    )}
                                    {activity.name == "Weight Lifting" && (
                                      <Td width="25%">
                                        {activity.sets} <span>Sets</span>
                                      </Td>
                                    )}
                                    {activity.name == "Yoga" && (
                                      <Td width="25%">-</Td>
                                    )}
                                    {activity.name == "Swimming" && (
                                      <Td width="25%">-</Td>
                                    )}
                                    <Td width="25%">
                                      {activity.target}{" "}
                                      <span>{activity.unit}</span>
                                    </Td>
                                  </Tr>
                                )
                              )}
                            </Tbody>
                          </Table>
                        </div>
                      </CardBody>
                    </Card>
                  );
                } else {
                  return null;
                }
              })}
            </CardBody>
          </Card>
        </div>
      </div>
      <WorkoutGoalCreateModal isOpen={isCreateOpen} onClose={onCreateClose} />
    </div>
  );
};

export default WorkoutGoals;
