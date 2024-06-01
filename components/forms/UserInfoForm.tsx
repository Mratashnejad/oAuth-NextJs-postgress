import React, { useEffect, useState } from 'react';
import { UserData } from '../../types/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import languages from '@/public/data/languages.json';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from '@/components/ui/card';

interface Language {
  id: string;
  label: string;
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
    setIsEditing(false); // Close the dialog after saving
  };

  const handleLanguageChange = (language: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedLanguages((prev) => [...prev, language]);
    } else {
      setSelectedLanguages((prev) => prev.filter((lang) => lang !== language));
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <div className="mb-4">
            <Label>Name:</Label>
            <div>{name}</div>
          </div>
          <div className="mb-4">
            <Label>Family:</Label>
            <div>{family}</div>
          </div>
          <div className="mb-4">
            <Label>Email:</Label>
            <div>{email}</div>
          </div>
          <div className="mb-4">
            <Label>Bio:</Label>
            <div>{bio}</div>
          </div>
          <div className="mb-4">
            <Label>Selected Languages:</Label>
            {languages
              .filter((lang) => selectedLanguages.includes(lang.id))
              .map((lang) => (
                <div key={lang.id}>
                  {lang.label}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogTrigger asChild>
          <Button>Edit</Button>
        </DialogTrigger>
        <DialogContent className="shadow-md p-4 bg-white rounded-lg">
          <div className="mb-4">
            <Label>Name:</Label>
            <Input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <Label>Family:</Label>
            <Input
              type="text"
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <Label>Email:</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <Label>Bio:</Label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <Label>Languages:</Label>
            {languages.map((lang) => (
              <div key={lang.id} className="flex items-center space-x-2">
                <Checkbox
                  id={lang.id}
                  checked={selectedLanguages.includes(lang.id)}
                  onCheckedChange={(isChecked) => handleLanguageChange(lang.id, isChecked as boolean)}
                />
                <Label htmlFor={lang.id}>{lang.label}</Label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSaveClick}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserInfoForm;
