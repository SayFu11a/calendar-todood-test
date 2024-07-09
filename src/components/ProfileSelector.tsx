// src/components/ProfileSelector.tsx
import React, { useState } from 'react';
import { useProfile } from '../contexts/ProfileContext';

const ProfileSelector: React.FC = () => {
  const { profiles, currentProfile, setCurrentProfile, addProfile } = useProfile();
  const [newProfileName, setNewProfileName] = useState('');

  const handleAddProfile = () => {
    if (newProfileName.trim()) {
      addProfile(newProfileName);
      setNewProfileName('');
    }
  };

  return (
    <div className="profile-selector">
      <select
        value={currentProfile ? currentProfile.id : ''}
        onChange={(e) => setCurrentProfile(profiles.find(p => p.id === Number(e.target.value))!)}
      >
        {profiles.map((profile) => (
          <option key={profile.id} value={profile.id}>
            {profile.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={newProfileName}
        onChange={(e) => setNewProfileName(e.target.value)}
        placeholder="New Profile"
      />
      <button onClick={handleAddProfile}>Add Profile</button>
    </div>
  );
};

export default ProfileSelector;
