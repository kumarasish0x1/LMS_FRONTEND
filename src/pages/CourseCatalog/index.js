import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import { Link } from 'react-router-dom';
import MainLayout from "../../components/common/MainLayout";
import fetchAPI from  '../../utils/api';
import LoadingContent from '../../components/common/LoadingContent';
import './index.scss'

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await fetchAPI('/courses');
        if (response.length !== 0 && response.status === "success") {
            setCourses(response.data);
            setLoading(false);
        }
        
      } catch (error) {
        console.error('Error fetching courses:', error.message);
      }
    };

    getCourses();
  }, []);

if (loading) {
  return (
      <MainLayout>
          <LoadingContent />
      </MainLayout>
  );
}

  console.log("Courses", courses);  

  return (
        <MainLayout>
            <div className='full-width-white-background'>
                <Row className='course-container course-catalog-page'>
                    {courses.map(course => (
                        <Link key={course.CourseID} to={`/course/${course.CourseID}`}>
                            <div
                                className='course-card'
                            onClick={() => {/* handle course selection here */}}
                            >
                                <div className='empty-div'></div>
                                <div className='course-details'>
                                    <h3 className='course-title'>{course.CourseTitle}</h3>
                                    <p className='category'>{course.CourseCategory}</p>
                                    <p className='description'>{course.CourseDescription}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </Row>
            </div>
        </MainLayout>
  );
};

export default CourseCatalog;
