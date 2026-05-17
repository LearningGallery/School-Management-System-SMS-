using System;
namespace Sms.Domain.Entities;

public class FeePayment
{
    public int Id { get; set; }
    public int StudentId { get; set; }
    public string FeeType { get; set; } = string.Empty; // Tuition, Transport, Library, etc.
    public decimal Amount { get; set; }
    public string Status { get; set; } = string.Empty; // Pending, Paid, Overdue
    public DateTime DueDate { get; set; }
    public DateTime? PaidDate { get; set; }
    public string? PaymentMethod { get; set; }
    public string? TransactionId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation
    public Student Student { get; set; } = null!;
}
