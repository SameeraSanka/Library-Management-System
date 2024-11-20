import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Book } from "../../interfaces/Book";
import BookService from "../../services/BookService";
import { Form, Button, Card, Container } from "react-bootstrap";
import Swal from "sweetalert2";

const UpdateBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<Partial<Book>>({});
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    author: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const book = await BookService.getBookById(Number(id));
      setFormData(book);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  const validateFields = () => {
    const newErrors = { title: "", description: "", author: "" };
    if (!formData.title?.trim()) newErrors.title = "Title is required.";
    if (!formData.description?.trim())
      newErrors.description = "Description is required.";
    else if (formData.description?.length > 100)
      newErrors.description = "Description cannot exceed 100 characters.";
    if (!formData.author?.trim()) newErrors.author = "Author is required.";
    setErrors(newErrors);
    return !newErrors.title && !newErrors.description && !newErrors.author;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    try {
      await BookService.updateBook({ id: Number(id), ...formData } as Book);
      Swal.fire({
        title: "Success!",
        text: "Book updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/books");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong, please try again.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const handleCancel = () => {
    navigate("/books");
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>
          <h4>Update Book</h4>
        </Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                isInvalid={!!errors.title}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formAuthor" className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Author"
                value={formData.author || ""}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                isInvalid={!!errors.author}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.author}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                isInvalid={!!errors.description}
                required
                maxLength={100}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="success" type="submit" className="me-2">
              Update Book
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UpdateBook;
