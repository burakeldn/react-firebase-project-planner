import React, { useState } from 'react';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { db } from '../firebase/init';

export default function FilterNav({ updateProjects }) {
  const handleFilterChange = async (newFilter) => {
    try {
      let q;

      if (newFilter === 'all') {
        // Tüm projeleri getir
        q = query(collection(db, 'projects'));
      } else if (newFilter === 'ongoing') {
        // Tamamlanmamış projeleri getir
        q = query(collection(db, 'projects'), where('completed', '==', false));
      } else if (newFilter === 'completed') {
        // Tamamlanan projeleri getir
        q = query(collection(db, 'projects'), where('completed', '==', true));
      }

      const querySnapshot = await getDocs(q);
      const projectData = [];

      querySnapshot.forEach((doc) => {
        projectData.push({ id: doc.id, ...doc.data() });
      });

      // Filtrelenmiş projeleri ana bileşene iletmek için updateProjects işlemini çağırın
      updateProjects(projectData);
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  return (
    <div>
      <button onClick={() => handleFilterChange('all')}>Tümü</button>
      <button onClick={() => handleFilterChange('ongoing')}>Devam Eden</button>
      <button onClick={() => handleFilterChange('completed')}>Tamamlanan</button>
    </div>
  );
}
