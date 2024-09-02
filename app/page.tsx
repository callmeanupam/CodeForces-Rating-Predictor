"use client";
import React, { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface UserData {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
}

interface TopicStats {
  [topic: string]: number;
}

const Home: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [topicStats, setTopicStats] = useState<TopicStats>({});
  const [predictedRating, setPredictedRating] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const fetchUserData = async () => {
    setError("");
    setUserData(null);
    setPredictedRating(null);
    setTopicStats({});

    if (!username) {
      setError("Please enter a valid Codeforces username.");
      return;
    }

    try {
      const response = await axios.get(
        `https://codeforces.com/api/user.info?handles=${username}`
      );
      const userInfo = response.data.result[0];
      setUserData(userInfo);
      predictNextRating(userInfo.rating);
      fetchUserSubmissionData();
    } catch (err) {
      setError("Failed to fetch user data. Please check the username.");
    }
  };

  const fetchUserSubmissionData = async () => {
    try {
      const response = await axios.get(
        `https://codeforces.com/api/user.status?handle=${username}`
      );
      const submissions = response.data.result;

      const stats: TopicStats = {};
      submissions.forEach((submission: any) => {
        if (submission.verdict === "OK") {
          const tags = submission.problem.tags;
          tags.forEach((tag: string) => {
            stats[tag] = (stats[tag] || 0) + 1;
          });
        }
      });

      setTopicStats(stats);
    } catch (err) {
      console.error("Failed to fetch user submissions.");
    }
  };

  const predictNextRating = (currentRating: number) => {
    const randomFactor = Math.floor(Math.random() * 100) - 50;
    const predicted = currentRating + randomFactor;
    setPredictedRating(predicted);
  };

  const chartData = {
    labels: Object.keys(topicStats),
    datasets: [
      {
        label: "Number of Problems Solved",
        data: Object.values(topicStats),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-6 text-white">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-2xl transition-all duration-300 ease-in-out">
        <h1 className="text-4xl font-bold text-center mb-6">
          Codeforces Rating Predictor
        </h1>
        <input
          type="text"
          placeholder="Enter Codeforces username"
          className="w-full px-4 py-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white placeholder-gray-400 transition duration-300 ease-in-out"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={fetchUserData}
          className="w-full mt-4 px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Predict Rating
        </button>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {userData && (
          <div className="mt-6 p-4 bg-gradient-to-r from-indigo-800 to-purple-700 rounded-md shadow-md transition-all duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold text-center">
              {userData.handle}
            </h2>
            <p className="mt-2">
              Current Rating:{" "}
              <span className="font-bold">{userData.rating}</span>
            </p>
            <p>
              Max Rating:{" "}
              <span className="font-bold">{userData.maxRating}</span>
            </p>
            <p>
              Rank: <span className="font-bold">{userData.rank}</span>
            </p>
            <p>
              Max Rank: <span className="font-bold">{userData.maxRank}</span>
            </p>
            {predictedRating !== null && (
              <p className="mt-4">
                Predicted Next Rating:{" "}
                <span className="font-bold">{predictedRating}</span>
              </p>
            )}
          </div>
        )}
        {Object.keys(topicStats).length > 0 && (
          <div className="mt-6 bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-center mb-4">
              Problem-Solving Statistics
            </h3>
            <div className="h-64">
              <Bar
                data={chartData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Focus Areas:</h4>
              {Object.keys(topicStats).map((topic) => (
                <p key={topic} className="text-sm">
                  {topic}: Useful Resource
                  <a
                    href={`https://www.youtube.com/results?search_query=${topic}+codeforces+problems`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 underline ml-1"
                  >
                    YouTube
                  </a>{" "}
                  or
                  <a
                    href={`https://codeforces.com/problemset?tags=${topic}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 underline ml-1"
                  >
                    Codeforces
                  </a>
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
      <footer className="mt-8 text-center">
        <p>
          Developed by{" "}
          <a
            className="text-indigo-500 hover:text-indigo-400 transition duration-300"
            href="https://anupamshakya.in"
          >
            Anupam Shakya
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
