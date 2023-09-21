import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/init';

function EditProject() {
  const { project_id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({ project_name: '', project_details: '' }); // Varsayılan değerlerle başlatın.

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectDocRef = doc(db, 'projects', project_id);
        const projectSnapshot = await getDoc(projectDocRef);
        if (projectSnapshot.exists()) {
          setProject(projectSnapshot.data());
        } else {
          // Veriler yüklenmediğinde kullanıcıya bekleme mesajı verebilirsiniz.
          return <div>Bekleyin, veriler yükleniyor...</div>;
        }
        
        if (projectSnapshot.exists()) {
          // Firestore'dan alınan verileri state'e atayın
          const projectData = projectSnapshot.data();
          setProject({
            project_name: projectData.project_name,
            project_details: projectData.project_details,
          });
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
      // Kullanıcının yaptığı düzenlemeleri alın
      const updatedProject = {
        project_name: project.project_name,
        project_details: project.project_details,
      };

      // Firestore'da güncelleme yapın
      await updateDoc(projectDocRef, updatedProject);

      console.log('Proje güncellendi');
      navigate('/'); // Kullanıcıyı projelerin olduğu sayfaya yönlendir
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  return (
    <div>
      <h2>Proje Düzenle</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="projectName">Proje Adi:</label>
          <input
            type="text"
            id="projectName"
            value={project.project_name}
            onChange={(e) => setProject({ ...project, project_name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="projectDetails">Proje Detaylari:</label>
          <textarea
            id="projectDetails"
            value={project.project_details}
            onChange={(e) => setProject({ ...project, project_details: e.target.value })}
          />
        </div>
        <button type="submit">Kaydet</button>
      </form>
    </div>
  );
}

export default EditProject;
