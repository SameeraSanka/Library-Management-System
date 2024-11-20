using LibraryManagmant_API.Entities;
using LibraryManagmant_API.Entities.Dto;

namespace LibraryManagmant_API.Services.Interface
{
    public interface IBookService
    {
        Task<List<Book>> GetAllBookAsync();
        Task<Book> GetBookByIdAsync(int id);
        Task<Book> AddBookAsync(BookDto bookDto);
        Task<Book> UpdateBookAsync(int id, BookDto bookDto);
        Task<bool> DeleteBookAsync(int id);
    }
}
