using System;
using System.Collections.Generic;
namespace Sms.Domain.Entities;

public class Classroom
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Grade { get; set; } = string.Empty; // "1", "2", ... "12"
    public string Section { get; set; } = string.Empty; // "A", "B", "C"
    public int Capacity { get; set; }
    public int? TeacherId { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation
    public Teacher? Teacher { get; set; }
    public ICollection<Student> Students { get; set; } = new List<Student>();
    public ICollection<AttendanceSession> AttendanceSessions { get; set; } = new List<AttendanceSession>();
}
