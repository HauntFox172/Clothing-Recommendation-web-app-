# Используйте официальный образ .NET SDK для сборки
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Копируем csproj и восстанавливаем зависимости
COPY ../*.sln .
COPY WeatherClothingApp.csproj .
RUN dotnet restore

# Копируем все файлы и собираем проект
COPY . .
RUN dotnet publish -c Release -o out

# Используем образ .NET для запуска
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "WeatherClothingApp.dll"]