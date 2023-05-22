import { Row, Col, Button, message, Modal } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import MainLayout from "../../components/common/MainLayout";
import { Link, useParams } from "react-router-dom";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import LoadingContent from "../../components/common/LoadingContent";
import fetchAPI from "../../utils/api";
import ReactPlayer from 'react-player';
import AddContent from "../../components/ContentManagement/AddContent";
import EditContent from "../../components/ContentManagement/EditContent";
import './index.scss';

const ContentManagement = () => {
    const [course, setCourse] = useState(null);
    const [ section, setSection ] = useState(null);
    const [ contents, setContents ] = useState([]);
    const { courseId, sectionId } = useParams();
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [selectedContentUrl, setSelectedContentUrl] = useState('');
    const [showAddContent, setShowAddContent] = useState(false);
    const [showEditContent, setShowEditContent] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const showModal = (url) => {
        setSelectedContentUrl(url);
        setVisible(true);
    };
      
    const handleCancel = () => {
        setVisible(false);
    };

    const toggleAddContent = () => {
        setShowAddContent(!showAddContent);
    };
    
    const toggleEditContent = () => {
        setShowEditContent(!showEditContent);
    }

    const handleContentUpdate = () => {
        fetchContents();
    }

    const handleContentAdded = () => {
        fetchContents();
    }

    const editContent = (content) => {
        setSelectedContent(content);
        setShowEditContent(true);
    }

    const showDeleteConfirm = (ContentID) => {
        Modal.confirm({
            title: 'Confirm Delete?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                deleteContent(ContentID);
            },
        });
    };

    const deleteContent = async (ContentID) => {
        try {
            await fetchAPI(`/courses/${courseId}/sections/${sectionId}/contents/${ContentID}`, 'DELETE');
            message.success("Delete course successfully!");
            fetchContents();
        } catch (error) {
            console.error('Failed to delete course:', error);
            message.error("Error in Deleting the Course!");
        }
    };

    const fetchCourse = async () => {
        try {
          const response = await fetchAPI(`/courses/${courseId}`);
          setCourse(response.data);
        } catch (error) {
          console.error("Failed to fetch course:", error);
        }
    };
    
    const fetchSection = async () => {
        try {
          const response = await fetchAPI(`/courses/${courseId}/sections/${sectionId}`);
          setSection(response.data);
        } catch (error) {
          console.error("Failed to fetch course:", error);
        }
    };

    const fetchContents = async () => {
        try {
            const response = await fetchAPI(`/courses/${courseId}/sections/${sectionId}/contents`);
            console.log(response);
            setContents(response.data);
        } catch (error) {
            console.error('Failed to fetch sections:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
      
          await Promise.all([
            fetchCourse(),
            fetchSection(),
            fetchContents(),
          ]);
      
          setLoading(false);
        };
      
        fetchData();
      }, [courseId]);

    const onDragStart = () => {
        setIsDragging(true);
    };
      

    const onDragEnd = async (result) => {
        if (!result.destination) {
            setIsDragging(false);
            return;
        }
    
        const reorderedContents = Array.from(contents);
        const [removed] = reorderedContents.splice(result.source.index, 1);
        reorderedContents.splice(result.destination.index, 0, removed);
        setContents(reorderedContents);
        setIsDragging(false);

        await updateContentOrder(reorderedContents);
    };

    const updateContentOrder = async (newContents) => {
        try {
            // Iterate through the reordered sections and update their order in the database
            for (let i = 0; i < newContents.length; i++) {
                const content = newContents[i];
                const updatedContent = {
                    ...content,
                    contentOrder: i,
                    contentTitle: content.ContentTitle,
                    contentType: content.ContentType,
                    contentUrl: content.ContentUrl
                };
        
                // Send a PUT request to the API with the updated section
                await fetchAPI(`/courses/${courseId}/sections/${sectionId}/contents/${content.ContentID}`, 'PUT', updatedContent);
            }
    
            // Display a success message
            message.success("Section order updated successfully!");
        } catch (error) {
            console.error("Failed to update section order:", error);
            message.error("Error in updating section order!");
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <LoadingContent />
            </MainLayout>
        )
    }

    if (showAddContent) {
        return <AddContent toggleAddContent={toggleAddContent} course={course} section={section} onContentAdded={handleContentAdded} currentOrder={contents.length} />;
    }

    if (showEditContent && selectedContent) {
        return <EditContent content={selectedContent} courseId={courseId} sectionId={sectionId} toggleEditContent={toggleEditContent} onContentUpdate={handleContentUpdate} />
    }

    return (
        <MainLayout>
            <div className="content-management-wrapper">
                <div className="sticky-container">
                    <Row>
                        <Col span={24} className="content-management-header">
                            <h1>Content Management</h1>
                            <h3 className="course-section">Course - {course.CourseTitle}</h3>
                            <span className="stylish-slash"></span>
                            <h3 className="section-content">{section.SectionTitle}</h3>
                            <div className="back-button">
                                <Link to={`/instructor/courses/${courseId}/sections`}>
                                    <Button
                                        type="primary"
                                    >
                                        Back to Section Management
                                    </Button>
                                </Link>
                                </div>
                        </Col>
                    </Row>
                    <Row className="add-section-content">
                        <Col span={2} className="add-content-button">
                            <Button 
                                type="primary"
                                onClick={toggleAddContent}
                            >
                                Add Content
                            </Button>
                        </Col>
                    </Row>
                </div>

                <Modal
                    title="Content Preview"
                    open={visible}
                    onCancel={handleCancel}
                    footer={null}
                    width={720}
                >
                    <ReactPlayer
                        className="custom-player"
                        url={selectedContentUrl}
                        controls
                        width="100%"
                        height="360px"
                    />
                </Modal>

                <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    <Droppable droppableId="contents">
                        {(provided) => (
                            <Row
                                className={`content-container${isDragging ? ' dragging' : ''}`}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {contents.map((content, index) => (
                                    <Draggable
                                        key={content.ContentID}
                                        draggableId={`content-${content.ContentID}`}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <Col
                                                className="content-item"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className="content-section content-preview">
                                                    <Button 
                                                        className="button btn-preview"
                                                        onClick={() => showModal(content.ContentUrl)}
                                                    >
                                                        Preview
                                                    </Button>
                                                </div>
                                                <div className="content-section content-main">
                                                    <h3 className="conent-title">{content.ContentTitle}</h3>
                                                    <p className="content-url">{content.ContentUrl}</p>
                                                </div>
                                                <div className="content-section content-manage">
                                                    <Button 
                                                        icon={<EditOutlined />} 
                                                        type="primary" 
                                                        className="button btn-edit"
                                                        onClick={() => editContent(content)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button 
                                                        icon={<DeleteOutlined />} 
                                                        type="primary" 
                                                        danger
                                                        className="button btn-delete"
                                                        onClick={() => showDeleteConfirm(content.ContentID)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </Col>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Row>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </MainLayout>
    )
}

export default ContentManagement;