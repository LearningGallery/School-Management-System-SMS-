using System;
namespace Sms.Domain.Entities;

public class Grade
{
    public int Id { get; set; }
    public int StudentId { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string Term { get; set; } = string.Empty; // "Q1", "Q2", "Q3", "Q4"
    public int AcademicYear { get; set; }
    public decimal Score { get; set; }
    public decimal MaxScore { get; set; }
    public string? Remarks { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation
    public Student Student { get; set; } = null!;
}
