using NUnit.Framework;
using UtilLib;
using System;

namespace UtilLib.Tests
{
    [TestFixture]
    public class UrlHostNameParserTests
    {
        private UrlHostNameParser parser;

        [SetUp]
        public void Setup()
        {
            parser = new UrlHostNameParser();
        }

        [Test]
        public void ParseHostName_HttpUrl_ReturnsHostName()
        {
            string result = parser.ParseHostName("http://www.google.com/search");

            Assert.That(result, Is.EqualTo("www.google.com"));
        }

        [Test]
        public void ParseHostName_HttpsUrl_ReturnsHostName()
        {
            string result = parser.ParseHostName("https://www.microsoft.com/home");

            Assert.That(result, Is.EqualTo("www.microsoft.com"));
        }

        [Test]
        public void ParseHostName_InvalidProtocol_ThrowsFormatException()
        {
            Assert.That(() => parser.ParseHostName("ftp://www.google.com"),
                Throws.TypeOf<FormatException>());
        }
    }
}