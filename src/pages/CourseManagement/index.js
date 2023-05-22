import { Row, Col, Button, message, Modal } from "antd";
import { useEffect, useState } from "react";
import MainLayout from "../../components/common/MainLayout";
import fetchAPI from '../../utils/api';
import { EditOutlined, DeleteOutlined, EyeOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import AddCourse from '../../components/CourseManagement/AddCourse';
import EditCourse from '../../components/CourseManagement/EditCourse';
import { useCurrentUserContext } from '../../providers/CurrentUserProvider';
import LoadingContent from '../../components/common/LoadingContent';
import { Link } from "react-router-dom";
import './index.scss';

const CourseManagement = () => {
    const { currentUser } = useCurrentUserContext();
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddCourse, setShowAddCourse] = useState(false);
    const [showEditCourse, setShowEditCourse] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const toggleAddCourse = () => {
        setShowAddCourse(!showAddCourse);
    };

    const toggleEditCourse = () => {
        setShowEditCourse(!showEditCourse);
    }

    const handleCourseAdded = () => {
        fetchCourses();
    }

    const handleCourseEdited = () => {
        fetchCourses();
    }

    useEffect(() => {
        fetchCourses();
    }, [currentUser]);

    const fetchCourses = async () => {
        setLoading(true);
        if (currentUser) {
            try {
                const response = await fetchAPI(`/courses/users/${currentUser}/courses`);
                console.log(response);
                setCourses(response.data);
            } catch (error) {
                console.error('Failed to fetch courses:', error);
                message.error("Error in Fetching Courses!");
            }
        }
        setLoading(false);
    };


    const filteredCourses = courses.filter(course =>
        course.CourseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.CourseCategory.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const showDeleteConfirm = (CourseID) => {
        Modal.confirm({
            title: 'Confirm Delete?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                deleteCourse(CourseID);
            },
        });
    };

    const deleteCourse = async (CourseID) => {
        try {
            await fetchAPI(`/courses/${CourseID}`, 'DELETE');
            message.success("Delete course successfully!");
            fetchCourses();
        } catch (error) {
            console.error('Failed to delete course:', error);
            message.error("Error in Deleting the Course!");
        }
    };

    const editCourse = async (CourseID) => {
        setSelectedCourseId(CourseID);
        setShowEditCourse(true);
    }

    if (showEditCourse && selectedCourseId) {
        return <EditCourse courseId={selectedCourseId} toggleEditCourse={toggleEditCourse} onCourseEdited={handleCourseEdited} />
    }

    if (showAddCourse) {
        return <AddCourse toggleAddCourse={toggleAddCourse} onCourseAdded={handleCourseAdded} />;
    }

    if (loading) {
        return (
            <MainLayout>
                <LoadingContent />
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="course-management-wrapper">
                <div className="sticky-container">
                    <Row>
                        <Col span={24} className="course-management-header">
                            <h1>Course Management</h1>
                        </Col>
                    </Row>
                    <Row className="add-course-section">
                        <Col span={2} className="add-course-button">
                            <Button
                                type="primary"
                                onClick={toggleAddCourse}
                            >
                                Add Course
                            </Button>
                        </Col>
                        <Col span={5} className="filter-course">
                            <input type="text" placeholder="Search a course" onChange={handleSearch} />
                        </Col>
                    </Row>
                </div>
                <Row gutter={[16, 16]} className="course-container">
                    {filteredCourses.map((course, index) => {
                        return (
                            <Col
                                key={index}
                                xs={24} sm={24} md={24} lg={24} xl={24}
                                className="course-item"
                            >
                                <div className="course-item-container">
                                    <div className="manage-course">
                                        <Link to={`/instructor/courses/${course.CourseID}/sections`}>
                                            <Button
                                                icon={<EyeOutlined />}
                                                type="default"
                                                className="action-button"
                                            >
                                                View
                                            </Button>
                                        </Link>
                                        <Button
                                            icon={<EditOutlined />}
                                            type="primary"
                                            className="action-button"
                                            onClick={() => editCourse(course.CourseID)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            icon={<DeleteOutlined />}
                                            type="primary"
                                            danger
                                            className="action-button delete-button"
                                            onClick={() => showDeleteConfirm(course.CourseID)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                    <h3 className="course-title">{course.CourseTitle}</h3>
                                    <div className="course-category">{course.CourseCategory}</div>
                                    <div className="course-description">{course.CourseDescription}</div>
                                </div>
                            </Col>
                        );
                    }
                    )}
                </Row>
            </div>
        </MainLayout>
    )
}

export default CourseManagement;