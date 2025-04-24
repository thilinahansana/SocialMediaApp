import React, { useEffect, useState } from "react";
import { FaRunning, FaSwimmer } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { GrYoga } from "react-icons/gr";
import { AiFillPlusCircle } from "react-icons/ai";
import WorkoutCreateModal from "../../Components/Workout/WorkoutCreateModal";
import coverimg from "../../assets/WorkoutCover.svg";
import {
  Card,
  CardBody,
  Flex,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { TiTick } from "react-icons/ti";
import { FaDeleteLeft, FaRegShareFromSquare } from "react-icons/fa6";
import { TbActivityHeartbeat } from "react-icons/tb";
import axios from "axios";
import LastWorkoutPostModal from "../../Components/Workout/LastWorkoutShareModal";

const Workout = () => {
  const [activities, setActivities] = useState([]);
  const [workoutDetails, setWorkoutDetails] = useState([]);
  const {
    isOpen: isWorkoutOpen,
    onOpen: onWorkoutCreateOpen,
    onClose: onWorkoutCreateClose,
  } = useDisclosure();

  const {
    isOpen: isPostOpen,
    onOpen: onPostOpen,
    onClose: onPostClose,
  } = useDisclosure();

  const handleCreateClick = () => {
    onWorkoutCreateOpen();
  };

  const handlePostClick = () => {
    onPostOpen();
  };

  const handleDeleteClick = (workoutId) => {
    return () => {
      console.log("Deleting workout with ID:", workoutId);
      axios
        .delete(`http://localhost:8080/api/workouts/${workoutId}`)
        .then((response) => {
          console.log("Workout deleted successfully");
          // Optionally, you can update the state or perform any other actions after successful deletion
        })
        .catch((error) => {
          console.error("Error deleting workout:", error);
          // Handle error if deletion fails
        });
    };
  };

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/workouts/${userId}`
        );
        if (response.data.length > 0) {
          const sortedActivities = response.data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setActivities(sortedActivities[0].activities);
          console.log("Workout details:", activities);
          setWorkoutDetails(response.data);
        }
      } catch (error) {
        console.error("Error fetching workout details:", error);
      }
    };

    fetchWorkoutDetails();
    const interval = setInterval(fetchWorkoutDetails, 5000);

    return () => clearInterval(interval);
  }, [userId]);

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="flex ">
      <div>
        <img
          src={coverimg}
          alt=""
          className="absolute z-0 object-cover w-full h-[89vh]"
        />
      </div>
      <div>
        <div className="m-8">
          <div>
            <Stack>
              <Card size="md">
                <CardBody className="bg-blue-100 rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <TbActivityHeartbeat className="z-10" />
                      <h1 className="text-2xl m-4 font-bold z-10 ">
                        Last Workout
                      </h1>
                      <hr />
                    </div>
                    <div>
                      <AiFillPlusCircle
                        onClick={handleCreateClick}
                        className="text-4xl mr-4 z-10"
                      />
                    </div>
                  </div>
                  <div className="">
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Name</Th>
                          <Th>Details</Th>
                          <Th>Duration</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {activities.map((activity, index) => (
                          <Tr key={index}>
                            <Td>
                              {activity.name === "Running" && (
                                <div className="flex">
                                  <FaRunning className="text-xl" />
                                  <h2 className="ml-2">Running</h2>
                                </div>
                              )}
                              {activity.name === "Weight Lifting" && (
                                <div className="flex">
                                  <GiWeightLiftingUp className="text-xl" />
                                  <h2 className="ml-2">Weight Lifting</h2>
                                </div>
                              )}
                              {activity.name === "Yoga" && (
                                <div className="flex">
                                  <GrYoga className="text-xl" />
                                  <h2 className="ml-2">Yoga</h2>
                                </div>
                              )}
                              {activity.name === "Swimming" && (
                                <div className="flex">
                                  <FaSwimmer className="text-xl" />
                                  <h2 className="ml-2">Swimming</h2>
                                </div>
                              )}
                            </Td>
                            <Td>
                              {activity.name === "Weight Lifting" && (
                                <div>
                                  <span>{activity.reps} Reps</span> <br />
                                  <span className="">
                                    Using {activity.sets} Sets
                                  </span>
                                </div>
                              )}
                              {activity.distance
                                ? `${activity.distance} km`
                                : null}
                              {activity.name === "Swimming" && (
                                <div>
                                  <span>-</span>
                                </div>
                              )}
                              {activity.name === "Yoga" && (
                                <div>
                                  <span>-</span>
                                </div>
                              )}
                            </Td>
                            <Td>
                              {activity.startTime && activity.endTime
                                ? calculateDuration(
                                    activity.startTime,
                                    activity.endTime
                                  )
                                : null}
                            </Td>
                            <Td>
                              <TiTick className="font-bold text-green-600 text-xl" />
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                    <div className="float-end m-4 text-2xl cursor-pointer">
                      <FaRegShareFromSquare onClick={handlePostClick} />
                    </div>
                  </div>
                  <Text></Text>
                </CardBody>
              </Card>
            </Stack>
          </div>
        </div>
      </div>

      <div className="w-[50%] m-4">
        <div>
          <Card size="md" className="m-4">
            <CardBody className="bg-blue-100 rounded-md">
              <h1 className="text-2xl m-4 font-bold z-20">Workout Summery</h1>
              <div className="max-h-[70vh] overflow-auto">
                {workoutDetails.map((workout, index) => (
                  <div key={index}>
                    <div className="flex m-4 justify-between">
                      <div className="flex">
                        <h2 className="font-bold">Date: </h2>
                        <p>{new Date(workout.date).toDateString()}</p>
                      </div>
                      <FaDeleteLeft
                        className="text-2xl text-red-500 cursor-pointer"
                        onClick={handleDeleteClick(workout.id)}
                      />
                    </div>
                    <Table variant="simple" size="sm">
                      <Thead>
                        <Tr>
                          <Th>Name</Th>
                          <Th>Details</Th>
                          <Th>Duration</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {workout.activities.map((activity, index) => (
                          <Tr key={index}>
                            <Td>
                              {activity.name === "Running" && (
                                <div className="flex">
                                  <FaRunning className="text-xl" />
                                  <h2 className="ml-2">Running</h2>
                                </div>
                              )}
                              {activity.name === "Weight Lifting" && (
                                <div className="flex">
                                  <GiWeightLiftingUp className="text-xl" />
                                  <h2 className="ml-2">Weight Lifting</h2>
                                </div>
                              )}
                              {activity.name === "Yoga" && (
                                <div className="flex">
                                  <GrYoga className="text-xl" />
                                  <h2 className="ml-2">Yoga</h2>
                                </div>
                              )}
                              {activity.name === "Swimming" && (
                                <div className="flex">
                                  <FaSwimmer className="text-xl" />
                                  <h2 className="ml-2">Swimming</h2>
                                </div>
                              )}
                            </Td>
                            <Td>
                              {activity.name === "Weight Lifting" && (
                                <div>
                                  <span>{activity.reps} Reps</span> <br />
                                  <span className="">
                                    Using {activity.sets} Sets
                                  </span>
                                </div>
                              )}
                              {activity.distance
                                ? `${activity.distance} km`
                                : null}
                              {activity.name === "Swimming" && (
                                <div>
                                  <span>-</span>
                                </div>
                              )}
                              {activity.name === "Yoga" && (
                                <div>
                                  <span>-</span>
                                </div>
                              )}
                            </Td>
                            <Td>
                              {activity.startTime && activity.endTime
                                ? calculateDuration(
                                    activity.startTime,
                                    activity.endTime
                                  )
                                : null}
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <WorkoutCreateModal
        onClose={onWorkoutCreateClose}
        isOpen={isWorkoutOpen}
      />
      <LastWorkoutPostModal
        isOpen={isPostOpen}
        onClose={onPostClose}
        lastWorkout={workoutDetails[0]}
      />
    </div>
  );
};

export default Workout;
