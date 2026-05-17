using System;
using System.Collections.Generic;
namespace Sms.Domain.Entities;

public class AttendanceRecord
{
    public int Id { get; set; }
    public int AttendanceSessionId { get; set; }
    public int StudentId { get; set; }
    public string Status { get; set; } = string.Empty; // Present, Absent, Late, Excused
    public string? Remarks { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation
    public AttendanceSession AttendanceSession { get; set; } = null!;
    public Student Student { get; set; } = null!;
}
