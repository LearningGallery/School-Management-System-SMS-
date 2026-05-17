using System;
using System.Collections.Generic;
namespace Sms.Domain.Entities;

public class AttendanceSession
{
    public int Id { get; set; }
    public int ClassroomId { get; set; }
    public int TeacherId { get; set; }
    public DateTime Date { get; set; }
    public string Subject { get; set; } = string.Empty;
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation
    public Classroom Classroom { get; set; } = null!;
    public Teacher Teacher { get; set; } = null!;
    public ICollection<AttendanceRecord> AttendanceRecords { get; set; } = new List<AttendanceRecord>();
}
