using NUnit.Framework;
using AccountsManagerLib;
using System;

namespace AccountsManagerLib.Tests
{
    [TestFixture]
    public class AccountsManagerTests
    {
        private AccountsManager manager;

        [SetUp]
        public void Setup()
        {
            manager = new AccountsManager();
        }

        [Test]
        public void ValidateUser_ValidUser1_ReturnsWelcomeMessage()
        {
            string result = manager.ValidateUser("user_11", "secret@user11");

            Assert.That(result, Is.EqualTo("Welcome user_11!!!"));
        }

        [Test]
        public void ValidateUser_ValidUser2_ReturnsWelcomeMessage()
        {
            string result = manager.ValidateUser("user_22", "secret@user22");

            Assert.That(result, Is.EqualTo("Welcome user_22!!!"));
        }

        [Test]
        public void ValidateUser_InvalidCredentials_ReturnsInvalidMessage()
        {
            string result = manager.ValidateUser("abc", "123");

            Assert.That(result, Is.EqualTo("Invalid user id/password"));
        }

        [Test]
        public void ValidateUser_EmptyUserId_ThrowsFormatException()
        {
            Assert.That(() => manager.ValidateUser("", "secret@user11"),
                Throws.TypeOf<FormatException>());
        }

        [Test]
        public void ValidateUser_EmptyPassword_ThrowsFormatException()
        {
            Assert.That(() => manager.ValidateUser("user_11", ""),
                Throws.TypeOf<FormatException>());
        }

        [Test]
        public void ValidateUser_BothEmpty_ThrowsFormatException()
        {
            Assert.That(() => manager.ValidateUser("", ""),
                Throws.TypeOf<FormatException>());
        }
    }
}