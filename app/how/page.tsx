"use client";
import React from "react";
import Link from "next/link"; // Import Next.js Link component
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

const PredictionExplanation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black flex flex-col items-center justify-start p-4 sm:p-6 text-white">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-3xl mt-8 sm:mt-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
          How the Codeforces Rating Predictor Works
        </h1>
        <p className="mb-4 sm:mb-6 text-base sm:text-lg">
          This application predicts the future rating of a user on Codeforces by
          analyzing their past performance and generating statistics on the
          topics they have solved problems in. Let's break down the core
          functionalities and understand how the prediction is made:
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
          Fetching User Data
        </h2>
        <p className="mb-4 sm:mb-6 text-sm sm:text-base">
          We first collect the user data using Codeforces' API by fetching their
          handle information like rating, maximum rating, rank, and maximum
          rank. This data is essential for analyzing the user's progress over
          time.
        </p>
        <pre className="bg-gray-900 p-3 sm:p-4 rounded-md overflow-x-auto mb-4 sm:mb-6 text-xs sm:text-sm">
          {`const fetchUserData = async () => {
  // Clear previous data and errors
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
      \`https://codeforces.com/api/user.info?handles=\${username}\`
    );
    const userInfo = response.data.result[0];
    setUserData(userInfo);
    predictNextRating(userInfo.rating);
    fetchUserSubmissionData();
  } catch (err) {
    setError("Failed to fetch user data. Please check the username.");
  }
};`}
        </pre>

        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
          Predicting the Next Rating
        </h2>
        <p className="mb-4 sm:mb-6 text-sm sm:text-base">
          The prediction is based on the current rating with an added random
          factor to simulate the unpredictable nature of competitive
          performance. We generate a random number between -50 and +50 and add
          it to the user's current rating:
        </p>
        <pre className="bg-gray-900 p-3 sm:p-4 rounded-md overflow-x-auto mb-4 sm:mb-6 text-xs sm:text-sm">
          {`const predictNextRating = (currentRating: number) => {
  const randomFactor = Math.floor(Math.random() * 100) - 50;
  const predicted = currentRating + randomFactor;
  setPredictedRating(predicted);
};`}
        </pre>

        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
          Fetching User Submission Data
        </h2>
        <p className="mb-4 sm:mb-6 text-sm sm:text-base">
          To understand the user's strengths, we fetch their submission data
          from Codeforces. We analyze which topics the user has solved the most
          problems in by checking the tags associated with successfully solved
          problems. This helps in understanding their focus areas and potential
          weaknesses.
        </p>
        <pre className="bg-gray-900 p-3 sm:p-4 rounded-md overflow-x-auto mb-4 sm:mb-6 text-xs sm:text-sm">
          {`const fetchUserSubmissionData = async () => {
  try {
    const response = await axios.get(
      \`https://codeforces.com/api/user.status?handle=\${username}\`
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
};`}
        </pre>

        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
          Visualizing the Data
        </h2>
        <p className="mb-4 sm:mb-6 text-sm sm:text-base">
          We use the Chart.js library to display the user's problem-solving
          statistics in a bar chart. The chart shows the number of problems
          solved for each topic, helping users visualize their focus areas and
          determine which topics they may need to practice more.
        </p>

        {/* Bar chart container */}
        <div className="relative w-full h-56 sm:h-64 md:h-96 mb-4 sm:mb-6">
          <Bar
            data={{
              labels: ["Math", "Graphs", "DP", "Sorting"], // Example data
              datasets: [
                {
                  label: "Number of Problems Solved",
                  data: [20, 15, 10, 5],
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                },
              ],
            }}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 mt-6 sm:mt-8">
          Conclusion
        </h2>
        <p className="mb-4 sm:mb-6 text-sm sm:text-base">
          This rating predictor is a fun tool to help you understand your
          potential performance on Codeforces. Remember, the prediction is
          randomized and does not guarantee actual performance changes. Use the
          problem-solving statistics to focus on your weak areas and improve
          your competitive programming skills.
        </p>

        <footer className="mt-6 text-sm flex justify-between gap-10 sm:mt-8 text-center">
          <Link href={"/"}>Go Back</Link>
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
    </div>
  );
};

export default PredictionExplanation;
