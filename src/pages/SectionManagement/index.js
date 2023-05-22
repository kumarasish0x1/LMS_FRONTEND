import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Row, Col, Button, message, Modal } from "antd";
import { useState, useEffect } from "react";
import MainLayout from "../../components/common/MainLayout";
import { Link, useParams } from "react-router-dom";
import fetchAPI from "../../utils/api";
import './index.scss';
import LoadingContent from "../../components/common/LoadingContent";
import AddSection from "../../components/SectionManagement/AddSection";
import EditSection from "../../components/SectionManagement/EditSection";
import { EditOutlined, DeleteOutlined, EyeOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const SectionManagement = () => {
    const [course, setCourse] = useState(null);
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAddSection, setShowAddSection] = useState(false);
    const [showEditSection, setShowEditSection] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [sectionVideos, setSectionVideos] = useState([]);
    const { courseId } = useParams();

    const fetchCourse = async () => {
        try {
          const response = await fetchAPI(`/courses/${courseId}`);
          setCourse(response.data);
        } catch (error) {
          console.error("Failed to fetch course:", error);
        }
    };

    const fetchContents = async (sectionId) => {
        try {
          const response = await fetchAPI(`/courses/${courseId}/sections/${sectionId}/contents`);
          return response.data;
        } catch (error) {
          console.error('Failed to fetch contents:', error);
        }
      };
      

    const fetchSections = async () => {
        try {
            const response = await fetchAPI(`/courses/${courseId}/sections`);
            console.log(response);
            setSections(response.data);

            const newSectionVideos = [];
            for (const section of response.data) {
              const contents = await fetchContents(section.SectionID);
              const videoCount = contents.filter(content => content.ContentType === 'video').length;
              newSectionVideos[section.SectionID] = videoCount;
            }
            setSectionVideos(newSectionVideos);
        } catch (error) {
            console.error('Failed to fetch sections:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
      
          await Promise.all([
            fetchCourse(),
            fetchSections(),
          ]);
      
          setLoading(false);
        };
      
        fetchData();
      }, [courseId]);

    const toggleAddSection = () => {
        setShowAddSection(!showAddSection);
    };

    const toggleEditSection = () => {
        setShowEditSection(!showEditSection);
    }

    const handleSectionAdded = () => {
        fetchSections();
    }

    const handleSectionEdited = () => {
        fetchSections();
    }

    const editSection = (section) => {
        setSelectedSection(section);
        setShowEditSection(true);
    }

    const showDeleteConfirm = (SectionID) => {
        Modal.confirm({
            title: 'Confirm Delete?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                deleteSection(SectionID);
            },
        });
    };

    const deleteSection = async (SectionID) => {
        try {
            await fetchAPI(`/courses/${courseId}/sections/${SectionID}`, 'DELETE');
            message.success("Delete course successfully!");
            fetchSections();
        } catch (error) {
            console.error('Failed to delete course:', error);
            message.error("Error in Deleting the Course!");
        }
    };

    const onDragStart = () => {
        setIsDragging(true);
    };
      
    const onDragEnd = async (result) => {
        const { source, destination } = result;
      
        // If the drag event was canceled or the item was dropped outside the list, do nothing
        if (!destination) {
          setIsDragging(false);
          return;
        }
      
        // If the item was dropped at the same position, do nothing
        if (source.index === destination.index) {
          setIsDragging(false);
          return;
        }
      
        // Create a new array with the reordered sections
        const newSections = Array.from(sections);
        const [removed] = newSections.splice(source.index, 1);
        newSections.splice(destination.index, 0, removed);
      
        // Update the sections state with the reordered sections
        setSections(newSections);
      
        // Set the dragging state back to false
        setIsDragging(false);

        await updateSectionOrder(newSections);
    };    
    
    const updateSectionOrder = async (newSections) => {
        try {
            // Iterate through the reordered sections and update their order in the database
            for (let i = 0; i < newSections.length; i++) {
                const section = newSections[i];
                const updatedSection = {
                    sectionTitle: section.SectionTitle,
                    sectionOrder: i
                };

                console.log('U: ', updatedSection);
        
                // Send a PUT request to the API with the updated section
                await fetchAPI(`/courses/${courseId}/sections/${section.SectionID}`, 'PUT', updatedSection);
            }
    
            // Display a success message
            message.success("Section order updated successfully!");
        } catch (error) {
            console.error("Failed to update section order:", error);
            message.error("Error in updating section order!");
        }
    };
    

    if (showAddSection) {
        return <AddSection courseId={courseId} currentOrder={sections.length} toggleAddSection={toggleAddSection} onSectionAdded={handleSectionAdded} />;
    }

    if (showEditSection && selectedSection) {
        return <EditSection  courseId={courseId} section={selectedSection} toggleEditSection={toggleEditSection} onSectionEdited={handleSectionEdited} />
    }

    if (loading) {
        return (
            <MainLayout>
                <LoadingContent />
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <div className="section-management-wrapper">
                <div className="sticky-container">
                    <Row>
                        <Col span={24} className="section-management-header">
                            <h1>Section Management</h1>
                            <h3 className="course-section">{course.CourseTitle}</h3>
                            <Link to={`/instructor/courses/`} className="back-button">
                                <Button
                                    type="primary"
                                >
                                    Back to Course Management
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row className="add-course-section">
                        <Col span={2} className="add-section-button">
                            <Button 
                                type="primary"
                                onClick={toggleAddSection}
                            >
                                Add Section
                            </Button>
                        </Col>
                    </Row>
                </div>
                <Row className={`section-container${isDragging ? ' dragging' : ''}`}>
                    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                        <Droppable droppableId="sectionsList">
                            {(provided) => (
                                <div 
                                    ref={provided.innerRef} 
                                    {...provided.droppableProps}
                                    className="droppable-container"
                                >
                                    {sections.map((section, index) => {
                                        return (
                                            <Draggable key={section.SectionID} draggableId={`section-${section.SectionID}`} index={index}>
                                                {(provided, snapshot) => (
                                                    <Col
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        xs={24} sm={24} md={24} lg={24} xl={24}
                                                        className={`section-item${snapshot.isDragging ? ' dragging' : ''}`}
                                                    >
                                                        <div className="manage-section">
                                                            <Link to={`/instructor/courses/${courseId}/sections/${section.SectionID}/contents`}>
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
                                                                onClick={() => editSection(section)}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                icon={<DeleteOutlined />}
                                                                type="primary"
                                                                danger
                                                                className="action-button delete-button"
                                                                onClick={() => showDeleteConfirm(section.SectionID)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </div>
                                                        <h3 className="section-title">{section.SectionTitle}</h3>
                                                        <h4 className="content-details">Videos: {sectionVideos[section.SectionID] || 0}</h4>
                                                    </Col>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Row>
            </div>
        </MainLayout>
    )
}

export default SectionManagement;