import React from 'react';
import { Form, Input, Button, message } from 'antd';
import MainLayout from '../../common/MainLayout';
import fetchAPI from '../../../utils/api';
import { useCurrentUserContext } from '../../../providers/CurrentUserProvider';
import './index.css';

const AddSection = (props) => {
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleAddSection = async (values) => {
        values['sectionOrder'] = props.currentOrder;
        console.log(values);
        try {
          await fetchAPI(`/courses/${props.courseId}/sections`, 'POST', values);
          message.success('Section added successfully!');
            props.toggleAddSection();
            props.onSectionAdded();
        } catch (error) {
            setErrorMessage(error.message);
            console.error('Failed to add course:', error);
            message.error('Error in adding the section!');
        }
      };
      
    return (
        <MainLayout>
        <div className="add-section-container">
            <div className="add-section-form-wrapper">
                <h2>Add Section</h2>
                <div className='form-container'>
                <Form
                    layout="vertical"
                    onFinish={handleAddSection}
                >
                <Form.Item
                    label="Section Title"
                    name="sectionTitle"
                    rules={[{ required: true, message: 'Please input the section title!' }]}
                >
                    <Input placeholder="Section Title" className="small-font-input" />
                </Form.Item>
                <Form.Item>
                    {errorMessage ? <div className="error-message">{errorMessage}</div> : ''}
                    <Button type="primary" htmlType="submit" className='add-section-button'>
                    Add Section
                    </Button>
                    <Button onClick={props.toggleAddSection} className="cancel-button">
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

export default AddSection;