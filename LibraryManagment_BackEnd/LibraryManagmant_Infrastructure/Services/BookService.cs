using LibraryManagmant_API.Data;
using LibraryManagmant_API.Entities;
using LibraryManagmant_API.Entities.Dto;
using LibraryManagmant_API.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagmant_API.Services
{
    public class BookService : IBookService
    {

        private readonly ApplicationDbContext _db;
        public BookService(ApplicationDbContext db)
        {
            _db = db;
        }
        public async Task<Book> AddBookAsync( BookDto bookDto)
        {
            var book = new Book
            {
                Title = bookDto.Title,
                Author = bookDto.Author,
                Description = bookDto.Description,
            };
            await _db.Books.AddAsync(book);
            await _db.SaveChangesAsync();

            return book;
        }

        public async Task<bool> DeleteBookAsync(int id)
        {
            var book = await _db.Books.FindAsync(id);

            if (book != null)
            {
                _db.Books.Remove(book);
                await _db.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<List<Book>> GetAllBookAsync()
        {
            return await _db.Books.ToListAsync();
        }

        public async Task<Book> GetBookByIdAsync(int id)
        {
            return await _db.Books.FindAsync(id);
        }

        public async Task<Book> UpdateBookAsync(int id, BookDto bookDto)
        {
            var book = await _db.Books.FindAsync(id);

            if (book != null)
            {
                book.Title = bookDto.Title;
                book.Author = bookDto.Author;
                book.Description = bookDto.Description;

                _db.Books.Update(book);
                await _db.SaveChangesAsync();

                return book;
            }

            return null;
        }
    }
}
