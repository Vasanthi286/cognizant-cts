using RetailInventory;
using RetailInventory.Models;

using var db = new AppDbContext();

db.Database.EnsureCreated();

var category = new Category
{
    CategoryName = "Electronics"
};

db.Categories.Add(category);
db.SaveChanges();

var product = new Product
{
    ProductName = "Laptop",
    Price = 55000,
    CategoryId = category.CategoryId
};

db.Products.Add(product);
db.SaveChanges();

Console.WriteLine("Category and Product added successfully!");