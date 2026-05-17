FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["src/Sms.Api/Sms.Api.csproj", "src/Sms.Api/"]
COPY ["src/Sms.Application/Sms.Application.csproj", "src/Sms.Application/"]
COPY ["src/Sms.Domain/Sms.Domain.csproj", "src/Sms.Domain/"]
COPY ["src/Sms.Infrastructure/Sms.Infrastructure.csproj", "src/Sms.Infrastructure/"]
RUN dotnet restore "src/Sms.Api/Sms.Api.csproj"
COPY . .
WORKDIR "/src/src/Sms.Api"
RUN dotnet build "Sms.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Sms.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Sms.Api.dll"]
