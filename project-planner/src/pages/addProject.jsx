import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/init';
import { useNavigate, Link } from 'react-router-dom';

export default function AddProject() {
  const [projectName, setProjectName] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Yeni proje verilerini Firestore'a ekleme
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        project_name: projectName,
        project_details: projectDetails,
        project_completed: false
      });
      console.log('Yeni proje eklendi. Belge kimliği:', docRef.id);

      // Formu temizleme
      setProjectName('');
      setProjectDetails('');

      
      // Sayfayı yeniden yönlendirme
      navigate('/');
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  return (
    <div>
      <h2>Yeni Proje Ekle</h2>
      <Link to="/">
        <button>Ana Sayfaya Dön</button>
      </Link>
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
