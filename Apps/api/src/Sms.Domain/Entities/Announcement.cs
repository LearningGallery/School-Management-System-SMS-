using System;
namespace Sms.Domain.Entities;

public class Announcement
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string Priority { get; set; } = string.Empty; // Low, Medium, High, Urgent
    public string TargetAudience { get; set; } = string.Empty; // All, Students, Teachers, Parents
    public int CreatedByUserId { get; set; }
    public DateTime PublishDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
