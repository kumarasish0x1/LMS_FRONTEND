import React, { useState, useEffect } from 'react';
import { Button, notification, message } from 'antd';
import MainLayout from '../../components/common/MainLayout';
import fetchAPI from  '../../utils/api';
import { Link, useParams } from "react-router-dom";
import './index.scss';
import LoadingContent from '../../components/common/LoadingContent';
import {
    ArrowRightOutlined
} from '@ant-design/icons';

const Enroll = () => {
    const [course, setCourse] = useState({ name: '', description: '' });
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [access, setAccess] = useState(false);
    const { courseId } = useParams();

    const fetchCourse = async () => {
        try {
            const response = await fetchAPI(`/courses/${courseId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching course:', error);
        }
    };

    const fetchUser = async () => {
        try {
            const response = await fetchAPI('/users/me');
            return response;
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const enrollCourse = async () => {
        try {
            await fetchAPI(`/courses/${courseId}/users/${user}/enroll`, 'POST');
            notification.success({
                message: 'Enrollment Successful',
                description: 'You have successfully enrolled in the course.',
                placement: 'topRight',
            });
            checkAccess(user);
        } catch (error) {
            console.error('Error enrolling in the course:', error);
            message.error('Failed to enroll in the course');
        }
    };

    const checkAccess = async (userId) => {
        try {
          const response = await fetchAPI(`/courses/users/${userId}/courses/${courseId}/access`);
          setAccess(response.access);
        } catch (error) {
          console.error('Error checking access:', error);
        }
    };

    const fetchData = async () => {
        try {
            const [courseData, userData] = await Promise.all([fetchCourse(), fetchUser()]);
            setCourse(courseData);
            setUser(userData.user.userId);
            checkAccess(userData.user.userId);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        setLoading(false);
    }, [courseId]);

    if (loading) {
        return (
            <MainLayout>
                <LoadingContent />
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <div className='outer-div'>
                <div className='course-enrollment-container'>
                    <div className='left-div'>
                        <div className='enroll-course-name'>{course.CourseTitle}</div>
                        <div className='enroll-course-description'>{course.CourseDescription}</div>
                    </div>
                    <div className='right-div'>
                        {!access && <Button className='enroll-btn' onClick={enrollCourse}>Enroll</Button>}
                        {access && (
                            <Link to={`/course/${courseId}/contents`}>
                                <Button className='go-to-course-btn'>
                                    Go To Course <ArrowRightOutlined />
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Enroll;