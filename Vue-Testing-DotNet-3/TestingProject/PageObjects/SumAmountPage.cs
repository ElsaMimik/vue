using System;
using FluentAutomation;
using TestingProject.Steps;

namespace TestingProject.PageObjects
{
    public class SumAmountPage : PageObject<SumAmountPage>
    {        
        public SumAmountPage(FluentTest test) : base(test)
        {
            this.Url = "http://localhost:61804/Home/SumAmount";
        }

        public void WaitUntilLoaded()
        {
            I.WaitUntil(() => I.Assert.Exists("#firstAmount"));
        }

        public void Input(int firstAmount, int secondAmount)
        {
            I.Enter(firstAmount).In("#firstAmount");
            I.Enter(secondAmount).In("#secondAmount");
        }

        public void ShouldDisplay(int total)
        {
            I.Assert.Value(total).In("#total");
        }
    }
}