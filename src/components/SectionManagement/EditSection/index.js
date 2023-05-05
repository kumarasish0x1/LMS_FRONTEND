import React from 'react';
import { Form, Input, Button, message } from 'antd';
import MainLayout from '../../common/MainLayout';
import fetchAPI from '../../../utils/api';
import { useCurrentUserContext } from '../../../providers/CurrentUserProvider';
import './index.css';

const EditSection = (props) => {
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleEditSection = async (values) => {
        values['sectionOrder'] = props.section.SectionOrder;
        const sectionId = props.section.SectionID;
        const courseId = props.courseId;
        try {
            await fetchAPI(`/courses/${courseId}/sections/${sectionId}`, 'PUT', values);
            message.success('Section update successfully!');
            props.toggleEditSection();
            props.onSectionEdited();
        } catch (error) {
            setErrorMessage(error.message);
            console.error('Failed to update course:', error);
            message.error('Error in updating the section!');
        }
    };
    
    const sectionDetails = {
        sectionTitle: props.section.SectionTitle
    }

    return (
        <MainLayout>
        <div className="edit-section-container">
            <div className="edit-section-form-wrapper">
                <h2>Edit Section</h2>
                <div className='form-container'>
                <Form
                    layout="vertical"
                    onFinish={handleEditSection}
                    initialValues={sectionDetails}
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
                    <Button type="primary" htmlType="submit" className='edit-section-button'>
                        Update
                    </Button>
                    <Button onClick={props.toggleEditSection} className="cancel-button">
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

export default EditSection;