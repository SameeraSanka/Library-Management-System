namespace LibraryManagmant_API.Entities.Dto
{
    public class BookDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public required string Author { get; set; }
    }
}
