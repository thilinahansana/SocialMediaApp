import React, { useEffect, useState } from "react";

import {
  BsBookmark,
  BsBookmarkFill,
  BsEmojiSmile,
  BsThreeDots,
} from "react-icons/bs";
import "./PostCard.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment, FaRunning, FaSwimmer } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import CommentModal from "../Comment/CommentModal";
import {
  Card,
  CardBody,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { GiWeightLiftingUp } from "react-icons/gi";
import { GrYoga } from "react-icons/gr";
import axios from "axios";
const PostCard = ({ activities, date, description, type, Id }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postContent, setPostContent] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/users/`).then((response) => {
      setPostContent(response.data);
      console.log(response.data);
    });
  }, []);

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleLike = () => {
    setIsPostLiked(!isPostLiked);
  };
  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleComment = () => {
    onOpen();
  };

  const handleDelete = (Id) => {
    axios
      .delete(`http://localhost:8080/api/last-workout-posts/${Id}`)
      .then((response) => {
        console.log("Deleted post");
      });
  };

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };
  return (
    <div>
      {type === "workout" ? (
        <div className="border rounded-md w-full">
          <div className="flex justify-between items-center w-full py-4 px-5">
            <div className="flex items-center">
              <img
                className="h-12 w-12 rounded-full"
                src="https://images.pexels.com/photos/1322129/pexels-photo-1322129.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt=""
              />
              <div className="pl-2">
                <p className="font-semibold text-sm">username</p>
                <p className="font-thin text-sm">location</p>
              </div>
            </div>
            <div className="dropdown">
              <BsThreeDots className="dots" onClick={handleClick} />
              <div className="dropdown-content">
                {showDropdown && (
                  <p
                    className="bg-black text-white py-1 px-4 rounded-md cursor-pointer"
                    onClick={handleDelete(Id)}
                  >
                    Delete
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full">
            <Stack spacing={4}>
              <Card size="md" shadow="none">
                <CardBody>
                  <h2 className="text-md  mb-8">{description}</h2>
                  <TableContainer>
                    <Table variant="simple" size="sm">
                      <Thead>
                        <Tr>
                          <Th>Name</Th>
                          <Th>Details</Th>
                          <Th>Duration</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {/* Render last workout activities */}
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
            </Stack>
          </div>
          <div className="flex justify-between items-center w-full px-5 py-4">
            <div className="flex items-center space-x-2">
              {isPostLiked ? (
                <AiFillHeart
                  className="text-2xl hover:opacity-50 cursor-pointer text-red-500"
                  onClick={handleLike}
                />
              ) : (
                <AiOutlineHeart
                  className="text-2xl hover:opacity-50 cursor-pointer"
                  onClick={handleLike}
                />
              )}
              <FaRegComment
                onClick={handleComment}
                className="text-xl hover:opacity-50 cursor-pointer"
              />
              <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer" />
            </div>
            <div className="cursor-pointer">
              {isSaved ? (
                <BsBookmarkFill
                  className="text-xl hover:opacity-50 cursor-pointer"
                  onClick={handleSave}
                />
              ) : (
                <BsBookmark
                  className="text-xl hover:opacity-50 cursor-pointer"
                  onClick={handleSave}
                />
              )}
            </div>
          </div>
          <div className="w-full py-2 px-5">
            <p>10 likes</p>
            <p className="opacity-50 py-2 cursor-pointer">
              view all 10 comments
            </p>
          </div>
          <div className="border border-t w-full ">
            <div className="flex w-full items-center px-5">
              <BsEmojiSmile />
              <input
                className="commentInput"
                type="text"
                placeholder="Add a comment ..."
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="border rounded-md w-full">
          <div className="flex justify-between items-center w-full py-4 px-5">
            <div className="flex items-center">
              <img
                className="h-12 w-12 rounded-full"
                src="https://images.pexels.com/photos/1322129/pexels-photo-1322129.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt=""
              />
              <div className="pl-2">
                <p className="font-semibold text-sm">username</p>
                <p className="font-thin text-sm">location</p>
              </div>
            </div>
            <div className="dropdown">
              <BsThreeDots className="dots" onClick={handleClick} />
              <div className="dropdown-content">
                {showDropdown && (
                  <p className="bg-black text-white py-1 px-4 rounded-md cursor-pointer">
                    Delete
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full">
            <img
              src="https://cdn.pixabay.com/photo/2016/03/27/23/08/woman-1284656_1280.jpg"
              alt=""
            />
          </div>
          <div className="flex justify-between items-center w-full px-5 py-4">
            <div className="flex items-center space-x-2">
              {isPostLiked ? (
                <AiFillHeart
                  className="text-2xl hover:opacity-50 cursor-pointer text-red-500"
                  onClick={handleLike}
                />
              ) : (
                <AiOutlineHeart
                  className="text-2xl hover:opacity-50 cursor-pointer"
                  onClick={handleLike}
                />
              )}
              <FaRegComment
                onClick={handleComment}
                className="text-xl hover:opacity-50 cursor-pointer"
              />
              <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer" />
            </div>
            <div className="cursor-pointer">
              {isSaved ? (
                <BsBookmarkFill
                  className="text-xl hover:opacity-50 cursor-pointer"
                  onClick={handleSave}
                />
              ) : (
                <BsBookmark
                  className="text-xl hover:opacity-50 cursor-pointer"
                  onClick={handleSave}
                />
              )}
            </div>
          </div>
          <div className="w-full py-2 px-5">
            <p>10 likes</p>
            <p className="opacity-50 py-2 cursor-pointer">
              view all 10 comments
            </p>
          </div>
          <div className="border border-t w-full ">
            <div className="flex w-full items-center px-5">
              <BsEmojiSmile />
              <input
                className="commentInput"
                type="text"
                placeholder="Add a comment ..."
              />
            </div>
          </div>
        </div>
      )}
      <CommentModal
        handleLike={handleLike}
        handleSave={handleSave}
        onClose={onClose}
        isOpen={isOpen}
        isPostLiked={isPostLiked}
        isSaved={isSaved}
      />
    </div>
  );
};

export default PostCard;
