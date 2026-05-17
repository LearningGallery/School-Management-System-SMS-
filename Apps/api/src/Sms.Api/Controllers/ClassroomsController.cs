using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sms.Infrastructure.Data;

namespace Sms.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ClassroomsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ClassroomsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var classrooms = await _context.Classrooms
            .Include(c => c.Teacher)
            .Include(c => c.Students)
            .Select(c => new
            {
                c.Id,
                c.Name,
                c.Grade,
                c.Section,
                c.Capacity,
                TeacherName = c.Teacher != null ? $"{c.Teacher.FirstName} {c.Teacher.LastName}" : null,
                StudentCount = c.Students.Count,
                c.IsActive
            })
            .ToListAsync();

        return Ok(classrooms);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var classroom = await _context.Classrooms
            .Include(c => c.Teacher)
            .Include(c => c.Students)
            .Where(c => c.Id == id)
            .Select(c => new
            {
                c.Id,
                c.Name,
                c.Grade,
                c.Section,
                c.Capacity,
                Teacher = c.Teacher != null ? new { c.Teacher.Id, c.Teacher.FirstName, c.Teacher.LastName } : null,
                Students = c.Students.Select(s => new { s.Id, s.FirstName, s.LastName, s.StudentNumber }).ToList(),
                c.IsActive
            })
            .FirstOrDefaultAsync();

        if (classroom == null)
            return NotFound();

        return Ok(classroom);
    }
}
