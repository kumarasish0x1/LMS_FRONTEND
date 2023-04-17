import React from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import MainLayout from '../../common/MainLayout';
import fetchAPI from '../../../utils/api';
import { useCurrentUserContext } from '../../../providers/CurrentUserProvider';
import './index.css';

const AddCourse = (props) => {
    const { currentUser } = useCurrentUserContext();
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleAddCourse = async (values) => {
        values['UserID'] = currentUser;
        try {
          await fetchAPI('/courses', 'POST', values);
          message.success('Course added successfully!');
        props.toggleAddCourse();
        props.onCourseAdded();
        } catch (error) {
            setErrorMessage(error.message);
          console.error('Failed to add course:', error);
          message.error('Error in adding the course!');
        }
      };

      const categories = ['Programming', 'Other'];
      
    return (
        <MainLayout>
        <div className="add-course-container">
            <div className="add-course-form-wrapper">
                <h2>Add Course</h2>
                <div className='form-container'>
                <Form
                    layout="vertical"
                    onFinish={handleAddCourse}
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
                    <Button type="primary" htmlType="submit" className='add-course-button'>
                    Add Course
                    </Button>
                    <Button onClick={props.toggleAddCourse} className="cancel-button">
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

export default AddCourse;