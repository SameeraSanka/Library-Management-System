import axios from "axios";
import { Book } from "../interfaces/Book";
import config from "../config";
import AuthService from "./AuthService";

const BookService = {
  getBooks: async () => {
    const token = AuthService.getToken();
    const response = await axios.get<Book[]>(`${config.API_URL}/api/Book`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  addBook: async (book: Book) => {
    const token = AuthService.getToken();
    const response = await axios.post<Book>(
      `${config.API_URL}/api/Book`,
      book,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },

  updateBook: async (book: Book) => {
    const token = AuthService.getToken();
    const response = await axios.put<Book>(
      `${config.API_URL}/api/Book/${book.id}`,
      book,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },

  deleteBook: async (id: number) => {
    const token = AuthService.getToken();
    await axios.delete(`${config.API_URL}/api/Book/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  
  getBookById: async (id: number): Promise<Book> => {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.API_URL}/api/Book/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default BookService;
