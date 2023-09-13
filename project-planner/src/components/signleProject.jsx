import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/init';

export default function SingleProject() {
  const [projects, setProjects] = useState([]);
  const [showDetails, setShowDetails] = useState([]);
  const [headerColor, setHeaderColor] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
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

  const toggleHeaderColor = (project_id) => {
    const newHeaderColor = { ...headerColor };

    if (newHeaderColor[project_id]) {
      delete newHeaderColor[project_id];
    } else {
      newHeaderColor[project_id] = true;
    }

    setHeaderColor(newHeaderColor);

    // Done'a tıklandığında details kapat
    setShowDetails((prevShowDetails) => prevShowDetails.filter((id) => id !== project_id));
  };

  return (
    <div className="project-container">
      {projects.map((project, project_id) => (
        <div className="project-post" key={project_id}>
          <div
            className={`post-header ${
              headerColor[project_id] ? 'post-header-done' : ''
            }`}
            onClick={() => toggleDetails(project_id)}
            id={`header-${project_id}`}
          >
            <p>{project.project_name}</p>
          </div>
          {showDetails.includes(project_id) && (
            <div className="post-body">
              <p>{project.project_details}</p>
              <div className="icons">
                <span
                  className="material-symbols-outlined done"
                  onClick={() => toggleHeaderColor(project_id)}
                >
                  done
                </span>
                <span className="material-symbols-outlined delete">delete</span>
                <span className="material-symbols-outlined edit">edit</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
