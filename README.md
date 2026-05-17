# School Management System

Enterprise-grade School Management System built with **Azure cloud-native services**, deployed via **Terraform**, featuring custom JWT authentication.

![Architecture](https://img.shields.io/badge/Azure-Container_Apps-blue)
![Terraform](https://img.shields.io/badge/IaC-Terraform-purple)
![.NET](https://img.shields.io/badge/.NET-8.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)

## 🏗️ Architecture

### Infrastructure Components
- **Azure Front Door Standard** - Global routing, HTTPS, path-based routing
- **Azure Container Apps** - Serverless container hosting (Web, API, Worker)
- **Azure Container Registry** - Private Docker registry
- **Azure SQL Database** - Relational data store
- **Azure Storage Account** - Document/file storage
- **Application Insights** - APM and monitoring
- **Log Analytics** - Centralized logging

### Application Stack
- **Backend**: .NET 8 Web API (Clean Architecture)
- **Frontend**: Next.js 14 (App Router, TypeScript)
- **Worker**: .NET 8 Background Service
- **Authentication**: Custom JWT (bcrypt password hashing)
- **Database**: SQL Server with EF Core

## 📁 Repository Structure

```
school-management-system/
├── infra/                   # Terraform IaC
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   ├── provider.tf
│   ├── versions.tf
│   └── modules/             # Reusable Terraform modules
├── apps/
│   ├── api/                 # .NET 8 API
│   ├── web/                 # Next.js frontend
│   └── worker/              # Background worker
├── scripts/                 # Deployment automation
└── .github/workflows/       # CI/CD pipelines
```

## 🚀 Quick Start

### Prerequisites
- Azure subscription with Contributor access
- Azure CLI installed
- Terraform >= 1.7.0
- Docker Desktop
- .NET 8 SDK (for local development)
- Node.js 20+ (for local development)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/school-management-system.git
cd school-management-system
```

### 2. Bootstrap Infrastructure
```bash
# Login to Azure
az login

# Run bootstrap script
chmod +x scripts/bootstrap.sh
./scripts/bootstrap.sh
```

### 3. Deploy Infrastructure
```bash
cd infra

# Review plan
terraform plan

# Apply
terraform apply
```

### 4. Deploy Applications
```bash
# Build and push containers
chmod +x scripts/deploy.sh
cd ..
./scripts/deploy.sh
```

### 5. Access Application
```bash
cd infra
terraform output frontdoor_endpoint
```

Visit the Front Door endpoint in your browser.

## 🔐 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@schoolsms.com | Admin@123 |
| Teacher | teacher@schoolsms.com | Teacher@123 |
| Student | student@schoolsms.com | Student@123 |

## 🎯 Features

### Implemented Modules
- ✅ User Management (Role-based)
- ✅ Student Information System
- ✅ Teacher Management
- ✅ Classroom Management
- ✅ Attendance Tracking
- ✅ Grade Management
- ✅ Fee Payment Tracking
- ✅ Announcements

### Planned Features
- 📅 Timetable/Schedule Management
- 📊 Advanced Analytics Dashboard
- 📱 Mobile App (React Native)
- 🔔 Real-time Notifications (SignalR)
- 📄 Report Generation (PDF)
- 📧 Email Integration
- 🗂️ Document Management

## 🛠️ Local Development

### Run API Locally
```bash
cd apps/api/src/Sms.Api
dotnet run
```
API will be available at `http://localhost:8080`

### Run Web Locally
```bash
cd apps/web
npm install
npm run dev
```
Web will be available at `http://localhost:3000`

## 📊 Monitoring

Access Application Insights in Azure Portal:
```bash
cd infra
terraform output | grep app_insights
```

## 🧹 Cleanup

To destroy all resources:
```bash
cd infra
terraform destroy
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built for GitHub portfolio demonstration
- Showcases Azure cloud-native architecture
- Demonstrates Terraform IaC best practices
- Enterprise-grade application design patterns

## 📧 Contact
- LinkedIn: [AbuTalha](https://www.linkedin.com/in/Im-AbuTalha)
- GitHub: [LearningGallery](https://github.com/LearningGallery/school-management-system)