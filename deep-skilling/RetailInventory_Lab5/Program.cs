using Microsoft.EntityFrameworkCore;
using RetailInventory;
using RetailInventory.Models;

using var context = new AppDbContext();

// Retrieve all products
var products = await context.Products.ToListAsync();

Console.WriteLine("All Products:");
Console.WriteLine("----------------");

foreach (var p in products)
{
    Console.WriteLine($"{p.ProductName} - ₹{p.Price}");
}

// Find Product by ID
var product = await context.Products.FindAsync(1);

if (product != null)
{
    Console.WriteLine($"\nFound Product: {product.ProductName}");
}
else
{
    Console.WriteLine("\nProduct not found.");
}

// First Product with Price > 5000
var expensive = await context.Products
    .FirstOrDefaultAsync(p => p.Price > 5000);

if (expensive != null)
{
    Console.WriteLine($"Expensive Product: {expensive.ProductName}");
}
else
{
    Console.WriteLine("No expensive product found.");
}