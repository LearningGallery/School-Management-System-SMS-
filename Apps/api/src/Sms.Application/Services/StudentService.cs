using Microsoft.EntityFrameworkCore;
using Sms.Application.DTOs.Students;
using Sms.Domain.Entities;
using Sms.Infrastructure.Data;

namespace Sms.Application.Services;

public class StudentService
{
    private readonly AppDbContext _context;

    public StudentService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<StudentDto>> GetAllAsync()
    {
        return await _context.Students
            .Include(s => s.Classroom)
            .Select(s => new StudentDto
            {
                Id = s.Id,
                StudentNumber = s.StudentNumber,
                FirstName = s.FirstName,
                LastName = s.LastName,
                DateOfBirth = s.DateOfBirth,
                Gender = s.Gender,
                Address = s.Address,
                PhoneNumber = s.PhoneNumber,
                AvatarUrl = s.AvatarUrl,
                ClassroomId = s.ClassroomId,
                ClassroomName = s.Classroom != null ? s.Classroom.Name : null,
                IsActive = s.IsActive
            })
            .ToListAsync();
    }

    public async Task<StudentDto?> GetByIdAsync(int id)
    {
        return await _context.Students
            .Include(s => s.Classroom)
            .Where(s => s.Id == id)
            .Select(s => new StudentDto
            {
                Id = s.Id,
                StudentNumber = s.StudentNumber,
                FirstName = s.FirstName,
                LastName = s.LastName,
                DateOfBirth = s.DateOfBirth,
                Gender = s.Gender,
                Address = s.Address,
                PhoneNumber = s.PhoneNumber,
                AvatarUrl = s.AvatarUrl,
                ClassroomId = s.ClassroomId,
                ClassroomName = s.Classroom != null ? s.Classroom.Name : null,
                IsActive = s.IsActive
            })
            .FirstOrDefaultAsync();
    }

    public async Task<StudentDto> CreateAsync(CreateStudentRequest request)
    {
        // Create user account
        var user = new User
        {
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Student@123"), // Default password
            FirstName = request.FirstName,
            LastName = request.LastName,
            Role = "Student",
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        // Generate student number
        var studentCount = await _context.Students.CountAsync();
        var studentNumber = $"S{DateTime.UtcNow.Year}{(studentCount + 1):D4}";

        // Create student
        var student = new Student
        {
            UserId = user.Id,
            StudentNumber = studentNumber,
            FirstName = request.FirstName,
            LastName = request.LastName,
            DateOfBirth = request.DateOfBirth,
            Gender = request.Gender,
            Address = request.Address,
            PhoneNumber = request.PhoneNumber,
            ClassroomId = request.ClassroomId,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        _context.Students.Add(student);
        await _context.SaveChangesAsync();

        return new StudentDto
        {
            Id = student.Id,
            StudentNumber = student.StudentNumber,
            FirstName = student.FirstName,
            LastName = student.LastName,
            DateOfBirth = student.DateOfBirth,
            Gender = student.Gender,
            Address = student.Address,
            PhoneNumber = student.PhoneNumber,
            ClassroomId = student.ClassroomId,
            IsActive = student.IsActive
        };
    }
}
