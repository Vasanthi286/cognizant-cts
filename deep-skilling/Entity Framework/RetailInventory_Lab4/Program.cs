using RetailInventory;
using RetailInventory.Models;

using var context = new AppDbContext();

// Create Categories
var electronics = new Category
{
    CategoryName = "Electronics"
};

var groceries = new Category
{
    CategoryName = "Groceries"
};

// Add Categories
await context.Categories.AddRangeAsync(electronics, groceries);
await context.SaveChangesAsync();

// Create Products
var product1 = new Product
{
    ProductName = "Laptop",
    Price = 75000,
    CategoryId = electronics.CategoryId
};

var product2 = new Product
{
    ProductName = "Rice Bag",
    Price = 1200,
    CategoryId = groceries.CategoryId
};

// Add Products
await context.Products.AddRangeAsync(product1, product2);
await context.SaveChangesAsync();

Console.WriteLine("Data inserted successfully!");