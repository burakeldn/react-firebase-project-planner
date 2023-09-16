import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/init';
import { useNavigate } from 'react-router-dom';

export default function AddProject() {
  const [projectName, setProjectName] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Yeni proje verilerini Firestore'a ekle
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        project_name: projectName,
        project_details: projectDetails,
        complated: false
      });
      console.log('Yeni proje eklendi. Belge kimliği:', docRef.id);

      // Formu temizle
      setProjectName('');
      setProjectDetails('');

      
      // Sayfayı yeniden yönlendir
      navigate('/'); // Projelerin olduğu sayfaya geri dön
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  return (
    <div>
      <h2>Yeni Proje Ekle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectName">Proje Adı:</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="projectDetails">Proje Ayrıntıları:</label>
          <textarea
            id="projectDetails"
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
          />
        </div>
        <button type="submit">Proje Ekle</button>
      </form>
    </div>
  );
}
