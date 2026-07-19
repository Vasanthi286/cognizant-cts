using CollectionsLib;
using NUnit.Framework;
using NUnit.Framework.Legacy;
using System.Linq;

namespace CollectionsLib.Tests
{
    [TestFixture]
    public class EmployeeManagerTests
    {
        private EmployeeManager manager;

        [SetUp]
        public void Setup()
        {
            manager = new EmployeeManager();
        }

        [Test]
        public void GetEmployees_NoNullValues_ReturnsTrue()
        {
            var employees = manager.GetEmployees();

            CollectionAssert.AllItemsAreNotNull(employees);
        }

        [Test]
        public void GetEmployees_EmployeeId100Exists_ReturnsTrue()
        {
            var employees = manager.GetEmployees();

            Assert.That(employees.Any(e => e.EmpId == 100), Is.True);
        }

        [Test]
        public void GetEmployees_UniqueEmployees_ReturnsTrue()
        {
            var employees = manager.GetEmployees();

            var uniqueEmployees = employees.Distinct().ToList();

            Assert.That(uniqueEmployees.Count, Is.EqualTo(employees.Count));
        }

        [Test]
        public void GetEmployees_CollectionsAreEqual_ReturnsTrue()
        {
            var employees1 = manager.GetEmployees();
            var employees2 = manager.GetEmployeesWhoJoinedInPreviousYears();

            CollectionAssert.AreEqual(employees1, employees2);
        }
    }
}