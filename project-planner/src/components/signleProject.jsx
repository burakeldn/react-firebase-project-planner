import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/init';
import { Link } from 'react-router-dom';

export default function SingleProject() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'projects'));

        const querySnapshot = await getDocs(q);
        const projectData = [];

        querySnapshot.forEach((doc) => {
          projectData.push({ id: doc.id, ...doc.data() });
        });

        setProjects(projectData);
      } catch (error) {
        console.error('Hata:', error);
      }
    };

    fetchData();
  }, []);


  const showProjectDetails = (project) => {
    if (selectedProject.includes(project)) {
      setSelectedProject(selectedProject.filter((id) => id !== project));
    } else {
      setSelectedProject([...selectedProject, project]);
    }
  };


  const deleteProject = async (projectId) => {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
      setProjects(projects.filter((project) => project.id !== projectId));
    } catch (error) {
      console.log('Error deleting document:', error);
    }
  }



  const markProjectAsDone = async (projectId) => {
    try {

      await updateDoc(doc(db, 'projects', projectId), {
         project_completed: true,
       });

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId
            ? { ...project, project_completed: true }
            : project
        )
      );
    } catch (error) {
      console.error('Hata:', error);
    }
  };
  



  return (
    <div className="project-container">
      {projects.map((project) => (
        <div key={project.id} onClick={() => showProjectDetails(project)}>
          <h3>{project.project_name}</h3>
          {selectedProject.includes(project) && (
            <div>
              <p>{project.project_details}</p>
              <div className="icons">
                <span className="material-symbols-outlined done"
                 onClick={() => markProjectAsDone(project.id)}
                >done</span>
                <span className="material-symbols-outlined delete"
                onClick={() => deleteProject(project.id)}
                >delete</span>
                <Link to={`/edit/${project.id}`}>
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
