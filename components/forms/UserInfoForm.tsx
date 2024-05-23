import React, { useEffect, useState } from 'react';
import { UserData } from '../../types/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import  languages  from '@/public/data/languages.json'

interface Language {
  id: string,
  label : string,
}

interface UserInfoFormProps {
  userData: UserData;
  onSave: (data: UserData) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ userData, onSave }) => {
  const [name, setName] = useState(userData.name || '');
  const [family, setFamily] = useState(userData.family || '');
  const [email, setEmail] = useState(userData.email || '');
  const [bio, setBio] = useState(userData.bio || '');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(Array.isArray(userData.language) ? userData.language : ['English']);
  const [isEditing, setIsEditing] = useState<boolean>(localStorage.getItem('isEditing') === 'true');

  useEffect(() => {
    localStorage.setItem('isEditing', isEditing.toString());
  }, [isEditing]);

  const handleSaveClick = () => {
    onSave({
      ...userData,
      name,
      family,
      email,
      bio,
      language: selectedLanguages,
    });
    setIsEditing(false);
  };

  const handleLanguageChange = (language: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedLanguages((prev) => [...prev, language]);
    } else {
      setSelectedLanguages((prev) => prev.filter((lang) => lang !== language));
    }
  };

  return (
    <form>
      <div>
        <Label htmlFor='name'>Name:</Label>
        <Input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          readOnly={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="family">Family:</Label>
        <Input
          type="text"
          id="family"
          value={family}
          onChange={(e) => setFamily(e.target.value)}
          readOnly={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="bio">Bio:</Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          readOnly={!isEditing}
        />
      </div>
      <div>
        <Label>Languages</Label>
        {languages.map((lang) => (
          <div key={lang.id} className="flex items-center space-x-2">
            <Checkbox
              id={lang.id}
              checked={selectedLanguages.includes(lang.id)}
              onCheckedChange={(isChecked) => handleLanguageChange(lang.id, isChecked as boolean)}
              disabled={!isEditing}
            />
            <Label htmlFor={lang.id}>{lang.label}</Label>
          </div>
        ))}
      </div>
      {isEditing ? (
        <Button type="button" onClick={handleSaveClick}>Save</Button>
      ) : (
        <Button type="button" onClick={() => setIsEditing(true)}>Edit</Button>
      )}
    </form>
  );
};

export default UserInfoForm;
