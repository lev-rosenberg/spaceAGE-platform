import { usePlayer, usePlayers } from "@empirica/core/player/classic/react";
import React, { useState } from "react";
import { Button } from "../components/Button";
import { Likert } from "../components/Likert";
import { Avatar } from "../components/Avatar";

export function ExitSurvey({ next }) {
  const player = usePlayer();
  const players = usePlayers() || []; // Default to an empty array if undefined

  const [usefulnessRatings, setUsefulnessRatings] = useState({});
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [feedback, setFeedback] = useState("");
  const [education, setEducation] = useState("");
  const [invitedMembers, setInvitedMembers] = useState([]);
  const [sageFeedback, setSageFeedback] = useState("");

  // Handle ratings for each teammate
  const handleUsefulnessChange = (playerId) => (value) => {
    setUsefulnessRatings((prev) => ({
      ...prev,
      [playerId]: value,
    }));
  };
  // Handle checkbox changes for inviting team members in the future
  const handleCheckboxChange = (playerId) => {
    setInvitedMembers((prev) =>
      prev.includes(playerId)
        ? prev.filter((id) => id !== playerId) // Remove if already selected
        : [...prev, playerId] // Add if not selected
    );
  };

  function handleSubmit(event) {
    event.preventDefault();

    player.set("exitSurvey", {
      age,
      gender,
      feedback,
      education,
      usefulnessRatings,
      invitedMembers,
      sageFeedback,
    });

    next();
  }

  // Filter out the current player from the list of players
  const teammates = players.filter((p) => p.id !== player.id);

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-white text-lg font-bold">
          Please fill out the following survey before exiting.
        </p>

      <form className="mt-12 space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <h3 className="text-lg leading-6 font-medium text-white">Exit Survey</h3>
            <p className="mt-1 text-sm text-white">
              Please answer the following questions about your experience.
            </p>
          </div>

          {teammates.length > 0 ? (
            teammates.map((p) => (
              <div key={p.id} className="flex items-center justify-between">
                <div className="flex items-center"> {/* Flex container for name and avatar */}
                  <Likert
                    labelClassName={`likert-${p.id}-usefulness`}
                    partnerName={p.get("name") || `Player ${p.id}`}
                    partnerId={p.id}
                    usefulness={usefulnessRatings[p.id] || "0"} // Ensure it starts at 0
                    handleUsefulnessChange={handleUsefulnessChange(p.id)}
                  />
                  <Avatar player={p} size="25px" style={{ marginLeft: '100px'}} /> {/* Render the player's avatar with specified size */}
                </div>
              </div>
            ))
          ) : (
            <p className="text-black">No teammates available for feedback.</p> // Optional message if no teammates
          )}
          <Likert
                key={"sage"}
                labelClassName={`likert-sage-usefulness`}
                partnerName="AI assistant Sage"
                partnerId="sage"
                usefulness={usefulnessRatings["sage"] || "0"}
                handleUsefulnessChange={handleUsefulnessChange("sage")}
              />
              <div className="mt-4">
            <label className="block text-sm font-medium text-white">
              Please explain why you rated Sage the way you did:
            </label>
            <textarea
              style={{
                backgroundColor: 'var(--primary-white)',
                color: 'var(--dark-grey)',
                border: '1px solid var(--light-grey)',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                width: '75%',
                boxSizing: 'border-box',
                height: '150px', // Adjust height as needed
              }}
              value={sageFeedback}
              onChange={(e) => setSageFeedback(e.target.value)}
            />
          </div>
              <div className="mt-4">
                <h4 className="text-sm leading-6 font-medium font-bold text-white"> If you had to do one more round of this activity, who would you invite again?</h4>
                <h4 className="text-xs leading-6 font-medium font-bold text-white"> Select all team members:</h4>
                {teammates.map((p) => (
                  <div key={p.id} className="flex items-center">
                  <input 
                    type="checkbox"
                    id={`invite-${p.id}`}
                    checked={invitedMembers.includes(p.id)}
                    onChange={() => handleCheckboxChange(p.id)}
                    />
                    <label htmlFor={`invite-${p.id}`} className="ml-2 text-white">
                      {p.get("name") || `Player ${p.id}`}
                    </label>
                    <Avatar player={p} size="25px" style={{ marginLeft: '100px'}} />
                    </div>
                ))}
                <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="invite-sage"
                checked={invitedMembers.includes("sage")}
                onChange={() => handleCheckboxChange("sage")}
              />
              <label htmlFor="invite-sage" className="ml-2 text-white">Sage</label>
            </div>
          </div>

          <div className="space-y-8 mt-6">
            <label className="block text-sm font-medium text-white">Age</label>
            <input
              type="number"
              style={{
                backgroundColor: 'var(--primary-white)', // Background color
                color: 'var(--dark-grey)', // Text color
                border: '1px solid var(--light-grey)', // Border color
                padding: '0.5rem 1rem', // Padding
                borderRadius: '0.375rem', // Rounded corners
                width: '20%', // Full width
                boxSizing: 'border-box', // Ensure padding doesn't affect total width
              }}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <label className="block text-sm font-medium text-white">Gender</label>
            <input
              type="text"
              style={{
                backgroundColor: 'var(--primary-white)',
                color: 'var(--dark-grey)',
                border: '1px solid var(--light-grey)',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                width: '20%',
                boxSizing: 'border-box',
              }}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />

            <label className="block text-sm font-medium text-white">Feedback</label>
            <textarea
              style={{
                backgroundColor: 'var(--primary-white)',
                color: 'var(--dark-grey)',
                border: '1px solid var(--light-grey)',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                width: '75%',
                boxSizing: 'border-box',
              }}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <div className="mb-12">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

       
