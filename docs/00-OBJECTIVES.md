# Project Objectives

## Purpose

The School Management System (SMS) project is designed as a complete cloud-native reference implementation for Azure.  
It demonstrates how to build, deploy, and operate an application using:
- Azure-native services,
- Terraform-based infrastructure provisioning,
- containerized application delivery,
- modular documentation and architecture governance.

---

## Primary Objectives

### 1. Build a functional school management platform
The system should provide a working baseline for:
- authentication,
- role-based access,
- student management,
- classroom management,
- attendance tracking,
- announcements,
- background processing.

### 2. Use Infrastructure as Code
All Azure resources must be provisioned using Terraform with:
- reusable modules,
- clear variable definitions,
- consistent outputs,
- environment-specific configuration.

### 3. Use Azure cloud-native services
The implementation should prefer managed Azure services over self-managed infrastructure wherever possible.

### 4. Keep deployment practical for constrained environments
The solution should remain deployable in a test-bed subscription with:
- contributor-only access,
- no Entra ID administration,
- no advanced enterprise networking requirements.

### 5. Produce a portfolio-quality reference implementation
The project should be suitable for:
- GitHub portfolio presentation,
- architecture reviews,
- technical interviews,
- learning and demonstration purposes.

---

## Secondary Objectives

- Minimize operational overhead by using Azure Container Apps.
- Demonstrate clean separation between web, API, and worker services.
- Provide documentation that is understandable by non-developers.
- Support future extension toward production-grade architecture.

---

## Success Criteria

The project is considered successful if:

1. Infrastructure can be deployed successfully using Terraform.
2. API, web, and worker images can be built and deployed to Azure.
3. Users can log in successfully through the web interface.
4. Core modules can be accessed and demonstrated.
5. Documentation is sufficient for another person to understand and replicate the project.

---

## Constraints

This project operates under the following constraints:

- Azure test-bed subscription
- Contributor-only access
- No Entra ID / tenant administration
- Cost-sensitive deployment model
- Demo/portfolio orientation rather than production readiness

---

## Out of Scope for Current Version

The following are intentionally excluded from the current implementation:

- Entra ID / enterprise SSO
- private endpoints and private networking
- service bus / event-driven architecture
- production-grade WAF tuning
- advanced CI/CD promotion pipelines
- disaster recovery and multi-region failover
- formal penetration testing and compliance controls

---

## Intended Audience

This project is intended for:
- cloud engineers,
- solutions architects,
- DevOps practitioners,
- hiring managers and interviewers,
- learners exploring Azure-native architectures.