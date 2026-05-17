using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sms.Domain.Entities;
using Sms.Infrastructure.Data;

namespace Sms.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AttendanceController : ControllerBase
{
    private readonly AppDbContext _context;

    public AttendanceController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("sessions")]
    public async Task<IActionResult> GetSessions([FromQuery] DateTime? date, [FromQuery] int? classroomId)
    {
        var query = _context.AttendanceSessions
            .Include(s => s.Classroom)
            .Include(s => s.Teacher)
            .Include(s => s.AttendanceRecords)
            .AsQueryable();

        if (date.HasValue)
            query = query.Where(s => s.Date.Date == date.Value.Date);

        if (classroomId.HasValue)
            query = query.Where(s => s.ClassroomId == classroomId.Value);

        var sessions = await query
            .Select(s => new
            {
                s.Id,
                s.Date,
                s.Subject,
                s.StartTime,
                s.EndTime,
                ClassroomName = s.Classroom.Name,
                TeacherName = $"{s.Teacher.FirstName} {s.Teacher.LastName}",
                TotalRecords = s.AttendanceRecords.Count,
                PresentCount = s.AttendanceRecords.Count(r => r.Status == "Present")
            })
            .OrderByDescending(s => s.Date)
            .ToListAsync();

        return Ok(sessions);
    }

    [HttpPost("sessions")]
    [Authorize(Roles = "Teacher,Admin,SuperAdmin")]
    public async Task<IActionResult> CreateSession([FromBody] CreateAttendanceSessionRequest request)
    {
        var session = new AttendanceSession
        {
            ClassroomId = request.ClassroomId,
            TeacherId = request.TeacherId,
            Date = request.Date,
            Subject = request.Subject,
            StartTime = request.StartTime,
            EndTime = request.EndTime
        };

        _context.AttendanceSessions.Add(session);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSessions), new { id = session.Id }, session);
    }

    [HttpPost("records")]
    [Authorize(Roles = "Teacher,Admin,SuperAdmin")]
    public async Task<IActionResult> MarkAttendance([FromBody] List<AttendanceRecordRequest> records)
    {
        var attendanceRecords = records.Select(r => new AttendanceRecord
        {
            AttendanceSessionId = r.AttendanceSessionId,
            StudentId = r.StudentId,
            Status = r.Status,
            Remarks = r.Remarks
        }).ToList();

        _context.AttendanceRecords.AddRange(attendanceRecords);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Attendance marked successfully", count = attendanceRecords.Count });
    }
}

public class CreateAttendanceSessionRequest
{
    public int ClassroomId { get; set; }
    public int TeacherId { get; set; }
    public DateTime Date { get; set; }
    public string Subject { get; set; } = string.Empty;
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
}

public class AttendanceRecordRequest
{
    public int AttendanceSessionId { get; set; }
    public int StudentId { get; set; }
    public string Status { get; set; } = string.Empty;
    public string? Remarks { get; set; }
}
