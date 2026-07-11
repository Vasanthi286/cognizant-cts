using Moq;
using NUnit.Framework;
using CustomerCommLib;

namespace CustomerCommLib.Tests
{
    public class UnitTest1
    {
        [Test]
        public void SendMailToCustomer_ReturnsTrue()
        {
            // Arrange
            var mockMailSender = new Mock<IMailSender>();

            mockMailSender
                .Setup(x => x.SendMail(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(true);

            CustomerComm customerComm = new CustomerComm(mockMailSender.Object);

            // Act
            bool result = customerComm.SendMailToCustomer();

            // Assert
            Assert.That(result, Is.True);

            mockMailSender.Verify(
                x => x.SendMail(It.IsAny<string>(), It.IsAny<string>()),
                Times.Once);
        }
    }
}