import React from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import MainLayout from '../../common/MainLayout';
import fetchAPI from '../../../utils/api';
import { useCurrentUserContext } from '../../../providers/CurrentUserProvider';
import './index.scss';

const { Option } = Select;

const EditContent = (props) => {
    const [errorMessage, setErrorMessage] = React.useState("");

    console.log('Test: ', props.content);

    const handleAddContent = async (values) => {
        values["contentTitle"] = values.ContentTitle;
        values["contentType"] = values.ContentType;
        values["contentUrl"] = values.ContentUrl;
        values["contentOrder"] = 0;

        try {
            await fetchAPI(`/courses/${props.courseId}/sections/${props.sectionId}/contents/${props.content.ContentID}`, 'PUT', values);
            message.success('Content update successfully!');
            props.toggleEditContent();
            props.onContentUpdate();
        } catch (error) {
            setErrorMessage(error.message);
            console.error('Failed to add course:', error);
            message.error('Error in adding the section!');
        }
      };
      
    return (
        <MainLayout>
        <div className="edit-content-container">
            <div className="edit-content-form-wrapper">
                <h2>Edit Content</h2>
                <div className='form-container'>
                <Form
                    layout="vertical"
                    onFinish={handleAddContent}
                    initialValues={props.content}
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
                        <Button type="primary" htmlType="submit" className='update-content-button'>
                            Update
                        </Button>
                        <Button onClick={props.toggleEditContent} className="cancel-button">
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

export default EditContent;