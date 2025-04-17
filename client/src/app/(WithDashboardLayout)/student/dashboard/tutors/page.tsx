import TutorList from '@/components/modules/dashboard/student/TutorList';
import { fetchTutorListForStudent } from '@/services/TutorService';
import React from 'react';

const TutorListPage = async () => {
    const tutors = await fetchTutorListForStudent()
    return (
        <TutorList tutorList={tutors.data}/>
    );
};

export default TutorListPage;