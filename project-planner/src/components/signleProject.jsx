import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
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
          projectData.push(doc.data());
        });
        setProjects(projectData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchData();
  }, []);

  const toggleDetails = (project_id) => {
    if (showDetails.includes(project_id)) {
      setShowDetails(showDetails.filter((id) => id !== project_id));
    } else {
      setShowDetails([...showDetails, project_id]);
    }
  };


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
                <span className="material-symbols-outlined delete">delete</span>
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