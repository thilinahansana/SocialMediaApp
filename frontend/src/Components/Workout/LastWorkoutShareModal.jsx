import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { FaInstagram, FaRunning, FaSwimmer } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { GrYoga } from "react-icons/gr";
import axios from "axios";

const LastWorkoutPostModal = ({ onClose, isOpen, lastWorkout }) => {
  const [postContent, setPostContent] = useState("");
  if (!lastWorkout || !lastWorkout.activities) {
    return null; // Render nothing if lastWorkout is undefined or has no activities
  }

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const userId = localStorage.getItem("userId");
  const handlePost = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/last-workout-posts/${userId}`,
        {
          description: postContent,
          type: "workout",
          date: new Date().toISOString(),
          activities: lastWorkout.activities,
        }
      );
      console.log("Post created successfully:", response.data);
      setPostContent(""); // Clear the post content after successful post
      onClose(); // Close the modal after successful post
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Modal size={"2xl"} onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <div>
            <div className="flex items-center justify-between text-2xl">
              <h1 className="text-3xl font-semibold">Create Post</h1>
              <FaInstagram />
            </div>

            <Textarea
              placeholder="What's on your mind?"
              className="mt-4 mb-4"
              size="md"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />

            <Stack spacing={4}>
              <Card size="xs">
                <CardBody>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Name</Th>
                          <Th>Details</Th>
                          <Th>Duration</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {/* Render last workout activities */}
                        {lastWorkout.activities.map((activity, index) => (
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
                              {/* Render activity details */}
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
                              {/* Render activity duration */}
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
                  </TableContainer>
                </CardBody>
              </Card>
              <Button colorScheme="blue" size="lg" onClick={handlePost}>
                Post
              </Button>
            </Stack>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LastWorkoutPostModal;
