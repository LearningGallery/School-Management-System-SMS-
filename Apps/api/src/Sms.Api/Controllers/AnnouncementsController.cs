using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sms.Domain.Entities;
using Sms.Infrastructure.Data;
using System.Security.Claims;

namespace Sms.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AnnouncementsController : ControllerBase
{
    private readonly AppDbContext _context;

    public AnnouncementsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var announcements = await _context.Announcements
            .Where(a => a.IsActive && (!a.ExpiryDate.HasValue || a.ExpiryDate.Value >= DateTime.UtcNow))
            .OrderByDescending(a => a.PublishDate)
            .ToListAsync();

        return Ok(announcements);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var announcement = await _context.Announcements.FindAsync(id);
        if (announcement == null)
            return NotFound();

        return Ok(announcement);
    }

    [HttpPost]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> Create([FromBody] CreateAnnouncementRequest request)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

        var announcement = new Announcement
        {
            Title = request.Title,
            Content = request.Content,
            Priority = request.Priority,
            TargetAudience = request.TargetAudience,
            CreatedByUserId = userId,
            PublishDate = request.PublishDate,
            ExpiryDate = request.ExpiryDate,
            IsActive = true
        };

        _context.Announcements.Add(announcement);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = announcement.Id }, announcement);
    }
}

public class CreateAnnouncementRequest
{
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string Priority { get; set; } = "Medium";
    public string TargetAudience { get; set; } = "All";
    public DateTime PublishDate { get; set; } = DateTime.UtcNow;
    public DateTime? ExpiryDate { get; set; }
}
