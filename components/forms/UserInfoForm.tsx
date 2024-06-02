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
} from "@/components/ui/dialog";
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
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(localStorage.getItem('isEditing') === 'true');

  useEffect(() => {
    localStorage.setItem('isEditing', isEditing.toString());
  }, [isEditing]);

  useEffect(() => {
    if (avatar) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(avatar);
    } else {
      setAvatarPreview(null);
    }
  }, [avatar]);

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
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col items-center">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="w-32 h-32 rounded-full mb-4 object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-full mb-4 bg-gray-200 flex items-center justify-center text-gray-500">
              No Avatar
            </div>
          )}
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <span className="text-blue-500">Upload Avatar</span>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setAvatar(e.target.files[0]);
                }
              }}
            />
          </label>
        </div>
        <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 mt-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <Label className="text-lg font-semibold text-gray-800 dark:text-white">Name:</Label>
                <div className="text-gray-700 dark:text-gray-300">{name}</div>
              </div>
              <div className="mb-4">
                <Label className="text-lg font-semibold text-gray-800 dark:text-white">Family:</Label>
                <div className="text-gray-700 dark:text-gray-300">{family}</div>
              </div>
              <div className="mb-4">
                <Label className="text-lg font-semibold text-gray-800 dark:text-white">Email:</Label>
                <div className="text-gray-700 dark:text-gray-300">{email}</div>
              </div>
              <div className="mb-4 col-span-2">
                <Label className="text-lg font-semibold text-gray-800 dark:text-white">Bio:</Label>
                <div className="text-gray-700 dark:text-gray-300">{bio}</div>
              </div>
              <div className="mb-4 col-span-2">
                <Label className="text-lg font-semibold text-gray-800 dark:text-white">Selected Languages:</Label>
                <div className="flex flex-wrap">
                  {languages
                    .filter((lang) => selectedLanguages.includes(lang.id))
                    .map((lang) => (
                      <div key={lang.id} className="text-gray-700 dark:text-gray-300 mr-4 mb-2">
                        {lang.label}
                      </div>
                    ))}
                </div>
              </div>
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
      </div>
    </div>
  );
};

export default UserInfoForm;
