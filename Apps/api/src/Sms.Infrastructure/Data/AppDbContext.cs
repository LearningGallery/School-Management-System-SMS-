using Microsoft.EntityFrameworkCore;
using Sms.Domain.Entities;

namespace Sms.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<Teacher> Teachers { get; set; }
    public DbSet<Classroom> Classrooms { get; set; }
    public DbSet<AttendanceSession> AttendanceSessions { get; set; }
    public DbSet<AttendanceRecord> AttendanceRecords { get; set; }
    public DbSet<Grade> Grades { get; set; }
    public DbSet<FeePayment> FeePayments { get; set; }
    public DbSet<Announcement> Announcements { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(e => e.Email).HasMaxLength(255).IsRequired();
            entity.Property(e => e.PasswordHash).HasMaxLength(500).IsRequired();
            entity.Property(e => e.FirstName).HasMaxLength(100).IsRequired();
            entity.Property(e => e.LastName).HasMaxLength(100).IsRequired();
            entity.Property(e => e.Role).HasMaxLength(50).IsRequired();
        });

        // Student
        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.StudentNumber).IsUnique();
            entity.Property(e => e.StudentNumber).HasMaxLength(50).IsRequired();

            entity.HasOne(e => e.User)
                .WithOne(u => u.Student)
                .HasForeignKey<Student>(e => e.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Classroom)
                .WithMany(c => c.Students)
                .HasForeignKey(e => e.ClassroomId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Teacher
        modelBuilder.Entity<Teacher>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.EmployeeNumber).IsUnique();
            entity.Property(e => e.EmployeeNumber).HasMaxLength(50).IsRequired();

            entity.HasOne(e => e.User)
                .WithOne(u => u.Teacher)
                .HasForeignKey<Teacher>(e => e.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Classroom
        modelBuilder.Entity<Classroom>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.HasOne(e => e.Teacher)
                .WithMany(t => t.Classrooms)
                .HasForeignKey(e => e.TeacherId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // AttendanceSession
        modelBuilder.Entity<AttendanceSession>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.HasOne(e => e.Classroom)
                .WithMany(c => c.AttendanceSessions)
                .HasForeignKey(e => e.ClassroomId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Teacher)
                .WithMany(t => t.AttendanceSessions)
                .HasForeignKey(e => e.TeacherId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // AttendanceRecord
        modelBuilder.Entity<AttendanceRecord>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.HasOne(e => e.AttendanceSession)
                .WithMany(s => s.AttendanceRecords)
                .HasForeignKey(e => e.AttendanceSessionId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Student)
                .WithMany(s => s.AttendanceRecords)
                .HasForeignKey(e => e.StudentId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Grade
        modelBuilder.Entity<Grade>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.HasOne(e => e.Student)
                .WithMany(s => s.Grades)
                .HasForeignKey(e => e.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.Property(e => e.Score).HasPrecision(5, 2);
            entity.Property(e => e.MaxScore).HasPrecision(5, 2);
        });

        // FeePayment
        modelBuilder.Entity<FeePayment>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.HasOne(e => e.Student)
                .WithMany(s => s.FeePayments)
                .HasForeignKey(e => e.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.Property(e => e.Amount).HasPrecision(10, 2);
        });


        // Announcement
        modelBuilder.Entity<Announcement>(entity =>
        {
            entity.HasKey(e => e.Id);
        });

        // Seed data
        SeedData(modelBuilder);
    }

    private void SeedData(ModelBuilder modelBuilder)
    {
        // Seed admin user
        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Email = "admin@schoolsms.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                FirstName = "Super",
                LastName = "Admin",
                Role = "SuperAdmin",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new User
            {
                Id = 2,
                Email = "teacher@schoolsms.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Teacher@123"),
                FirstName = "John",
                LastName = "Doe",
                Role = "Teacher",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new User
            {
                Id = 3,
                Email = "student@schoolsms.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Student@123"),
                FirstName = "Jane",
                LastName = "Smith",
                Role = "Student",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            }
        );

        // Seed teacher
        modelBuilder.Entity<Teacher>().HasData(
            new Teacher
            {
                Id = 1,
                UserId = 2,
                EmployeeNumber = "T001",
                FirstName = "John",
                LastName = "Doe",
                Subject = "Mathematics",
                PhoneNumber = "+65 9123 4567",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            }
        );

        // Seed classroom
        modelBuilder.Entity<Classroom>().HasData(
            new Classroom
            {
                Id = 1,
                Name = "Grade 10-A",
                Grade = "10",
                Section = "A",
                Capacity = 40,
                TeacherId = 1,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            }
        );

        // Seed student
        modelBuilder.Entity<Student>().HasData(
            new Student
            {
                Id = 1,
                UserId = 3,
                StudentNumber = "S2024001",
                FirstName = "Jane",
                LastName = "Smith",
                DateOfBirth = new DateTime(2008, 5, 15),
                Gender = "Female",
                Address = "123 Singapore Street",
                PhoneNumber = "+65 8123 4567",
                ClassroomId = 1,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            }
        );

        // Seed announcement
        modelBuilder.Entity<Announcement>().HasData(
            new Announcement
            {
                Id = 1,
                Title = "Welcome to School SMS",
                Content = "Welcome to our new School Management System. Please update your profile information.",
                Priority = "Medium",
                TargetAudience = "All",
                CreatedByUserId = 1,
                PublishDate = DateTime.UtcNow,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            }
        );
    }
}
