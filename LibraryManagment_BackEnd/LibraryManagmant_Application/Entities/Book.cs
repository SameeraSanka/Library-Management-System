using System.ComponentModel.DataAnnotations;

namespace LibraryManagmant_API.Entities
{
    public class Book
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        [StringLength(100, ErrorMessage = "Description cannot exceed 100 characters.")]
        public string? Description { get; set; }
        public required string Author { get; set; }

    }
}
