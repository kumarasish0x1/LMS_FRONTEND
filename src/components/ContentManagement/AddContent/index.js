import React from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import MainLayout from '../../common/MainLayout';
import fetchAPI from '../../../utils/api';
import { useCurrentUserContext } from '../../../providers/CurrentUserProvider';
import './index.scss';

const { Option } = Select;

const AddContent = (props) => {
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleAddContent = async (values) => {
        values['ContentOrder'] = props.currentOrder;
        console.log(values);

        try {
          await fetchAPI(`/courses/${props.course.CourseID}/sections/${props.section.SectionID}/contents`, 'POST', values);
          message.success('Section added successfully!');
            props.toggleAddContent();
            props.onContentAdded();
        } catch (error) {
            setErrorMessage(error.message);
            console.error('Failed to add course:', error);
            message.error('Error in adding the section!');
        }
      };
      
    return (
        <MainLayout>
        <div className="add-content-container">
            <div className="add-content-form-wrapper">
                <h2>Add Content</h2>
                <div className='form-container'>
                <Form
                    layout="vertical"
                    onFinish={handleAddContent}
                >
                    <Form.Item
                        label="Content Title"
                        name="ContentTitle"
                        rules={[{ required: true, message: 'Please input the content title!' }]}
                    >
                        <Input placeholder="Content Title" className="small-font-input" />
                    </Form.Item>
                    <Form.Item
                        label="Content Type"
                        name="ContentType"
                        rules={[{ required: true, message: 'Please select the content type!' }]}
                    >
                        <Select placeholder="Select content type" className="small-font-input">
                            <Option value="video">Video</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Content URL"
                        name="ContentUrl"
                        rules={[{ required: true, message: 'Please input the content URL!' }]}
                    >
                        <Input placeholder="Content URL" className="small-font-input" />
                    </Form.Item>
                    <Form.Item>
                        {errorMessage ? <div className="error-message">{errorMessage}</div> : ''}
                        <Button type="primary" htmlType="submit" className='add-content-button'>
                        Add Content
                        </Button>
                        <Button onClick={props.toggleAddContent} className="cancel-button">
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

export default AddContent;