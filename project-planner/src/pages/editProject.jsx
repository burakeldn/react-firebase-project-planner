import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, updateDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/init';

function EditProject() {
  const { project_id } = useParams();
  const [project, setProject] = useState({});
  const navigate = useNavigate(); // useNavigate hook'unu içe aktardık

  useEffect(() => {
    const projectDocRef = doc(db, 'projects', project_id);

    const fetchProject = async () => {
      try {
        const projectSnapshot = await getDocs(projectDocRef);
        if (projectSnapshot.size > 0) {
          setProject(projectSnapshot.docs[0].data());
        } else {
          console.log('Proje bulunamadı');
        }
      } catch (error) {
        console.error('Hata:', error);
      }
    };

    fetchProject();
  }, [project_id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const projectDocRef = doc(db, 'projects', project_id);

    try {
      await updateDoc(projectDocRef, project);

      console.log('Proje güncellendi');
      navigate('/'); // Kullanıcıyı projelerin olduğu sayfaya yönlendirin
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  return (
    <div>
      <h2>Proje Düzenle</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="projectName">Proje Adı:</label>
          <input
            type="text"
            id="projectName"
            value={project.project_name || ''}
            onChange={(e) => setProject({ ...project, project_name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="projectDetails">Proje Detayları:</label>
          <textarea
            id="projectDetails"
            value={project.project_details || ''}
            onChange={(e) => setProject({ ...project, project_details: e.target.value })}
          />
        </div>
        <button type="submit">Kaydet</button>
      </form>
    </div>
  );
}

export default EditProject;
