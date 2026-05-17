FROM mcr.microsoft.com/dotnet/runtime:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["worker/src/Sms.Worker/Sms.Worker.csproj", "worker/src/Sms.Worker/"]
RUN dotnet restore "worker/src/Sms.Worker/Sms.Worker.csproj"

COPY . .
WORKDIR "/src/worker/src/Sms.Worker"
RUN dotnet build "Sms.Worker.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Sms.Worker.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Sms.Worker.dll"]
