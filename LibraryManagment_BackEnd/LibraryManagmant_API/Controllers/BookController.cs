using LibraryManagmant_API.Entities.Dto;
using LibraryManagmant_API.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagmant_API.Controllers
{
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;
        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet(Name = "GetAllBook")]
        public async Task<IActionResult> GetAllBook()
        {
            var books = await _bookService.GetAllBookAsync();
            if (books != null)
            {
                return Ok(books);
            }
            return NotFound();
        }

        [HttpGet("{id:int}", Name = "GetBook")]
        public async Task<IActionResult> GetBook(int id)
        {
            var book = await _bookService.GetBookByIdAsync(id);
            if (book != null)
            {
                return Ok(book);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> AddBook(BookDto bookDto)
        {
            var book = await _bookService.AddBookAsync(bookDto);
            return Ok(book);
        }

        [HttpPut("{id:int}", Name = "UpdateBook")]
        public async Task<IActionResult> UpdateBook(int id, BookDto bookDto)
        {
            var book = await _bookService.UpdateBookAsync(id, bookDto);
            if (book != null)
            {
                return Ok(book);
            }
            return NotFound();
        }

        [HttpDelete("{id:int}", Name = "DeleteBook")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var result = await _bookService.DeleteBookAsync(id);
            if (result)
            {
                return Ok();
            }
            return NotFound();
        }

    }
}
