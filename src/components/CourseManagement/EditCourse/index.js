import {useState, useEffect} from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import MainLayout from '../../common/MainLayout';
import fetchAPI from '../../../utils/api';
import { useCurrentUserContext } from '../../../providers/CurrentUserProvider';
import LoadingContent from '../../common/LoadingContent';
import './index.css';


const EditCourse = ({courseId, toggleEditCourse, onCourseEdited}) => {
    const { currentUser } = useCurrentUserContext();
    const [errorMessage, setErrorMessage] = useState("");
    const [form] = Form.useForm();
    const [courseDetails, setCourseDetails] = useState({});
    const [loading, setLoading] = useState(true);

    const handleAddCourse = async (values) => {
        values['UserID'] = currentUser;
        try {
          await fetchAPI(`/courses/${courseId}`, 'PUT', values);
          message.success('Course update successfully!');
          toggleEditCourse();
          onCourseEdited();
        } catch (error) {
            setErrorMessage(error.message);
          console.error('Failed to add course:', error);
          message.error('Error in updating the course!');
        }
      };

      useEffect(() => {
        const fetchCourseDetails = async () => {
          try {
            const courseData = await fetchAPI(`/courses/${courseId}`);
            setCourseDetails({
                CourseTitle: courseData.data.CourseTitle,
                CourseCategory: courseData.data.CourseCategory,
                CourseDescription: courseData.data.CourseDescription,
            });
            setLoading(false);
          } catch (error) {
            console.error('Failed to fetch course details:', error);
          }
        };
    
        fetchCourseDetails();
      }, [courseId, form]);

      const categories = ['Programming', 'Other'];

    if (loading) {
        return (
            <MainLayout>
                <LoadingContent />
            </MainLayout>
        )
    };

    return (
        <MainLayout>
        <div className="edit-course-container">
            <div className="edit-course-form-wrapper">
                <h2>Edit Course</h2>
                <div className='form-container'>
                <Form
                    layout="vertical"
                    onFinish={handleAddCourse}
                    form={form}
                    initialValues={courseDetails}
                >
                <Form.Item
                    label="Course Title"
                    name="CourseTitle"
                    rules={[{ required: true, message: 'Please input the course title!' }]}
                >
                    <Input placeholder="Course Title" className="small-font-input" />
                </Form.Item>

                <Form.Item
                label="Course Category"
                name="CourseCategory"
                rules={[{ required: true, message: 'Please select a course category!' }]}
                >
                <Select placeholder="Select a course category" className="small-font-input" >
                    {categories.map((category, index) => (
                    <Select.Option key={index} value={category}>
                        {category}
                    </Select.Option>
                    ))}
                </Select>
                </Form.Item>

                <Form.Item
                    label="Course Description"
                    name="CourseDescription"
                    rules={[{ required: true, message: 'Please input the course description!' }]}
                >
                    <Input.TextArea placeholder="Course Description" className="small-font-input" />
                </Form.Item>

                <Form.Item>
                    {errorMessage ? <div className="error-message">{errorMessage}</div> : ''}
                    <Button type="primary" htmlType="submit" className='edit-course-button'>
                        Update
                    </Button>
                    <Button 
                        className="cancel-button"
                        onClick={() => { toggleEditCourse() }}
                    >
                        Cancel
                    </Button>
                </Form.Item>
                </Form>
            </div>
            </div>
        </div>
        </MainLayout>
    )
}

export default EditCourse;