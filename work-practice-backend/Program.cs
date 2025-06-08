using Microsoft.EntityFrameworkCore;
using work_practice_backend.Database;

var builder = WebApplication.CreateBuilder();

string connection = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationContext>(options => options.UseNpgsql(connection));
builder.Services.AddCors();
builder.Services.AddControllers();

var app = builder.Build();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseHttpsRedirection();
app.UseCors(builder => {
    builder.WithHeaders().AllowAnyHeader();
    builder.WithOrigins("http://localhost:5173");
    builder.WithMethods().AllowAnyMethod();
});
app.UseEndpoints(endpoints => endpoints.MapControllers());

app.Run();

