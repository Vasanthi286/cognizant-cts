using NUnit.Framework;
using SeasonsLib;
using System.Collections;

namespace FourSeasonsLib.Tests
{
    [TestFixture]
    public class SeasonTests
    {
        private SeasonTeller seasonTeller;

        [SetUp]
        public void Setup()
        {
            seasonTeller = new SeasonTeller();
        }

        public static IEnumerable SeasonData()
        {
            yield return new TestCaseData("February", "Spring");
            yield return new TestCaseData("March", "Spring");

            yield return new TestCaseData("April", "Summer");
            yield return new TestCaseData("May", "Summer");
            yield return new TestCaseData("June", "Summer");

            yield return new TestCaseData("July", "Monsoon");
            yield return new TestCaseData("August", "Monsoon");
            yield return new TestCaseData("September", "Monsoon");

            yield return new TestCaseData("October", "Autumn");
            yield return new TestCaseData("November", "Autumn");

            yield return new TestCaseData("December", "Winter");
            yield return new TestCaseData("January", "Winter");

            yield return new TestCaseData("Hello", "Invalid Season");
        }

        [Test]
        [TestCaseSource(nameof(SeasonData))]
        public void DisplaySeasonBy_ValidMonth_ReturnsExpectedSeason(string month, string expected)
        {
            string actual = seasonTeller.DisplaySeasonBy(month);

            Assert.That(actual, Is.EqualTo(expected));
        }
    }
}