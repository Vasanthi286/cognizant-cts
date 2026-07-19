using NUnit.Framework;
using System;
using UserManagerLib;

namespace UserManagerLib.Tests
{
    [TestFixture]
    public class UserManagerTests
    {
        private User userManager;

        [SetUp]
        public void Setup()
        {
            userManager = new User();
        }

        [Test]
        public void CreateUser_ValidPAN_DoesNotThrowException()
        {
            User user = new User
            {
                Id = Guid.NewGuid(),
                FirstName = "John",
                LastName = "Smith",
                EmailId = "john@test.com",
                PANCardNo = "ABCDE1234F"
            };

            Assert.DoesNotThrow(() => userManager.CreateUser(user));
        }

        [Test]
        public void CreateUser_NullPAN_ThrowsNullReferenceException()
        {
            User user = new User
            {
                PANCardNo = null
            };

            Assert.Throws<NullReferenceException>(() => userManager.CreateUser(user));
        }

        [Test]
        public void CreateUser_EmptyPAN_ThrowsNullReferenceException()
        {
            User user = new User
            {
                PANCardNo = ""
            };

            Assert.Throws<NullReferenceException>(() => userManager.CreateUser(user));
        }

        [Test]
        public void CreateUser_InvalidPANLength_ThrowsFormatException()
        {
            User user = new User
            {
                PANCardNo = "ABC123"
            };

            Assert.Throws<FormatException>(() => userManager.CreateUser(user));
        }
    }
}