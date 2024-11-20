import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "../../interfaces/Book";
import BookService from "../../services/BookService";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import AuthService from "../../services/AuthService";

const ViewBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await BookService.getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const logout = () => {
    AuthService.logout();
    navigate("/");
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await BookService.deleteBook(id);
        fetchBooks();

        Swal.fire({
          title: "Deleted!",
          text: "The book has been deleted.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an error deleting the book.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      console.error("Error deleting book:", error);
    }
  };

  return (
    <>
      <h1 className="text-center pt-5">Library Management System</h1>
      <div className="m-4">
        <Table className="text-center" striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.description}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => navigate(`/books/edit/${book.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(book.id || 0)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button
          variant="danger"
          onClick={() => logout()}
          className="position-absolute top-0 end-0 m-3"
        >
          Logout
        </Button>

        <div className="d-flex justify-content-end mt-3">
          <Button
            variant="primary"
            onClick={() => navigate("/books/add")}
            className="ms-3  px-4"
          >
            Add Book
          </Button>
        </div>
      </div>
    </>
  );
};

export default ViewBooks;
