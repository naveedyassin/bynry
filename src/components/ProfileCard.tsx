import React from 'react';

interface ProfileCardProps {
  name: string;
  photo: string;
  description: string;
  onSummary: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, photo, description, onSummary }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center w-72">
      <img
        src={photo}
        alt={name}
        className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-blue-200"
      />
      <h2 className="text-lg font-semibold mb-2">{name}</h2>
      <p className="text-gray-600 text-center mb-4">{description}</p>
      <button
        onClick={onSummary}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Summary
      </button>
    </div>
  );
};

export default ProfileCard;
