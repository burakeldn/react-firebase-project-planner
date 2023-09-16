import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/init';
import { Link } from 'react-router-dom';

export default function SingleProject() {
  const [projects, setProjects] = useState([]);
  const [showDetails, setShowDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Firestore sorgusu oluştur
        const q = query(collection(db, 'projects'), where('complated', '==', false));

        const querySnapshot = await getDocs(q);
        const projectData = [];
        querySnapshot.forEach((doc) => {
          projectData.push({ id: doc.id, ...doc.data() });
        });
        setProjects(projectData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchData();
  }, []);


  // Proje detayını açma kapama
  const toggleDetails = (project_id) => {
    if (showDetails.includes(project_id)) {
      setShowDetails(showDetails.filter((id) => id !== project_id));
    } else {
      setShowDetails([...showDetails, project_id]);
    }
  };

  // Projeyi firestore dan silme
  const deletePost = async (id) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
      const updatedProjects = [...projects];
      const index = updatedProjects.findIndex((project) => project.id === id);
      if (index !== -1) {
        updatedProjects.splice(index, 1);
        setProjects(updatedProjects);
      }
    } catch (error) {
      console.log('Error deleting document:', error);
    }
  }

  return (
    <div className="project-container">
      {projects.map((project, project_id) => (
        <div className="project-post" key={project_id}>
          <div
            className="post-header"
            onClick={() => toggleDetails(project_id)}
          >
            <p>{project.project_name}</p>
          </div>
          {showDetails.includes(project_id) && (
            <div className="post-body">
              <p>{project.project_details}</p>
              <div className="icons">
                <span className="material-symbols-outlined done">done</span>
                <span className="material-symbols-outlined delete"
                  onClick={() => deletePost(project.id, project_id)} >delete</span>
                <Link to={`/edit/${project_id}`}>
                  <span className="material-symbols-outlined edit">edit</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}