import React, { useEffect, useState } from "react";
import StoryCircle from "../../Components/Story/StoryCircle";
import HomeRight from "../../Components/HomeRight/HomeRight";
import PostCard from "../../Components/Post/PostCard";
import axios from "axios";

export const HomePage = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/last-workout-posts/"
        );
        setActivities(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchActivities();

    setInterval(() => {
      fetchActivities();
    }, 1000);
  }, []);

  return (
    <div>
      <div className="mt-10 flex w-[100%] justify-center">
        <div className="w-[44%] px-10">
          <div className="storyDiv flex space-x-2 border p-4 rounded-md justify-start w-full">
            {[1, 2, 3].map((item) => (
              <StoryCircle />
            ))}
          </div>
          <div className="space-y-10 w-full mt-10">
            {activities.map((item) => (
              <PostCard
                key={item._id}
                Id={item.id}
                description={item.description}
                date={item.date}
                type={item.type}
                activities={item.activities}
              />
            ))}
          </div>
        </div>
        <div className="w-[27%]">
          <HomeRight />
        </div>
      </div>
    </div>
  );
};
