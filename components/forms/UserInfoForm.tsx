import React, { useState } from 'react';
import { UserData } from '../../types/types';

interface UserInfoFormProps {
    userData : UserData;
    isEditing : boolean;
    onSave : (data : UserData) => void;
}


const UserInfoForm : React.FC<UserInfoFormProps> = ({userData , isEditing , onSave})=>{

    const [name , setName] = useState(userData.name || '');
    const [family , setFamily] = useState(userData.family || '');
    const [email , setEmail]    = useState(userData.email || '');
    const [bio , setBio]    = useState(userData.bio || '');


const handleSaveClick = ()=>{
    onSave({
        ...userData,
        name:name,
        family:family,
        email:email,
        bio:bio,
    })
};

return(
    <form>
        <div>
            <label htmlFor='name'>Name :</label>
            <input 
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly = {!isEditing}
            />
            <div>
        <label htmlFor="family">Family:</label>
        <input
          type="text"
          id="family"
          value={family}
          onChange={(e) => setFamily(e.target.value)}
          readOnly={!isEditing}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly={!isEditing}
        />
      </div>
      <div>
        <label htmlFor="bio">Bio:</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          readOnly={!isEditing}
        />
      </div>
      {isEditing && <button type="button" onClick={handleSaveClick}>Save</button>}
        </div>
    </form>
)

}
export default UserInfoForm;