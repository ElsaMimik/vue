using FluentAutomation;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;
using TechTalk.SpecFlow;
using TestingProject.PageObjects;

namespace TestingProject.Steps
{
    [Binding]
    [Scope(Feature = "SumAmount")]
    public class SumAmountSteps : FluentTest
    {
        private SumAmountPage _sumAmountPage;

        public SumAmountSteps()
        {
            _sumAmountPage = new SumAmountPage(this);            
        }

        [Given(@"go to SumAmount page")]
        public void GivenGoToSumAmountPage()
        {
            _sumAmountPage.Go().WaitUntilLoaded();
        }
        
        [When(@"I enter (.*) and (.*) as first amount and second amount")]
        public void WhenIEnterAndAsInput(int firstAmount, int secondAmount)
        {
            _sumAmountPage.Input(firstAmount, secondAmount);
        }
        
        [Then(@"it should display (.*) as sum total")]
        public void ThenItShouldDisplayOnTheSummary(int total)
        {
            _sumAmountPage.ShouldDisplay(total);
        }
    }
}
