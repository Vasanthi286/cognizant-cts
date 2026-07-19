using RetailInventory;
using RetailInventory.Models;

using var db = new AppDbContext();

var products = db.Products.ToList();

Console.WriteLine("Products List:");
Console.WriteLine("------------------------");

foreach (var product in products)
{
    Console.WriteLine($"ID: {product.ProductId}");
    Console.WriteLine($"Name: {product.ProductName}");
    Console.WriteLine($"Price: {product.Price}");
    Console.WriteLine($"Stock: {product.Stock}");
    Console.WriteLine("------------------------");
}