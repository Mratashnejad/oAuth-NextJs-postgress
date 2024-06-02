import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface EmergencyContactTabProps {
  emergencyContact: { name: string, relationship: string, phoneNumber: string };
  setEmergencyContact: React.Dispatch<React.SetStateAction<{ name: string, relationship: string, phoneNumber: string }>>;
  handleSaveEmergencyInfo: () => Promise<void>;
}

const EmergencyContactTab: React.FC<EmergencyContactTabProps> = ({ emergencyContact, setEmergencyContact, handleSaveEmergencyInfo }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Contact</CardTitle>
        <CardDescription>Edit or update your emergency contact information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor='emergencyName'>Name:</Label>
          <Input
            type='text'
            id='emergencyName'
            value={emergencyContact.name}
            onChange={(e) => setEmergencyContact(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor='emergencyRelationship'>Relationship:</Label>
          <Input
            type='text'
            id='emergencyRelationship'
            value={emergencyContact.relationship}
            onChange={(e) => setEmergencyContact(prev => ({ ...prev, relationship: e.target.value }))}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor='emergencyPhoneNumber'>Phone Number:</Label>
          <Input
            type='text'
            id='emergencyPhoneNumber'
            value={emergencyContact.phoneNumber}
            onChange={(e) => setEmergencyContact(prev => ({ ...prev, phoneNumber: e.target.value }))}
          />
        </div>
        <Button onClick={handleSaveEmergencyInfo}>Save</Button>
      </CardContent>
    </Card>
  );
};

export default EmergencyContactTab;
