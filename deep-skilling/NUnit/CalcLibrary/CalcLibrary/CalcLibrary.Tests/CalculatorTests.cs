using NUnit.Framework;
using System;
using CalcLibrary;

namespace CalcLibrary.Tests
{
    [TestFixture]
    public class CalculatorTests
    {
        private SimpleCalculator calculator;

        [SetUp]
        public void Setup()
        {
            calculator = new SimpleCalculator();
        }

        // Addition
        [TestCase(10, 20, 30)]
        [TestCase(5, 5, 10)]
        [TestCase(-5, 5, 0)]
        public void TestAddition(double a, double b, double expected)
        {
            double actual = calculator.Addition(a, b);
            Assert.That(actual, Is.EqualTo(expected));
        }

        // Subtraction
        [TestCase(20, 10, 10)]
        [TestCase(15, 5, 10)]
        [TestCase(5, 10, -5)]
        public void TestSubtraction(double a, double b, double expected)
        {
            double actual = calculator.Subtraction(a, b);
            Assert.That(actual, Is.EqualTo(expected));
        }

        // Multiplication
        [TestCase(10, 2, 20)]
        [TestCase(5, 5, 25)]
        [TestCase(-2, 3, -6)]
        public void TestMultiplication(double a, double b, double expected)
        {
            double actual = calculator.Multiplication(a, b);
            Assert.That(actual, Is.EqualTo(expected));
        }

        // Division
        [TestCase(20, 2, 10)]
        [TestCase(15, 3, 5)]
        [TestCase(9, 3, 3)]
        public void TestDivision(double a, double b, double expected)
        {
            double actual = calculator.Division(a, b);
            Assert.That(actual, Is.EqualTo(expected));
        }

        // Division by Zero
        [Test]
        public void TestDivisionByZero()
        {
            var ex = Assert.Throws<ArgumentException>(() =>
            {
                calculator.Division(10, 0);
            });

            Assert.That(ex.Message, Is.EqualTo("Second Parameter Can't be Zero"));
        }

        // AllClear Test
        [Test]
        public void TestAddAndClear()
        {
            calculator.Addition(10, 20);

            Assert.That(calculator.GetResult, Is.EqualTo(30));

            calculator.AllClear();

            Assert.That(calculator.GetResult, Is.EqualTo(0));
        }
    }
}