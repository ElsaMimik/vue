@web
Feature: SumAmount

Scenario: Sum 2 amount correctly
        Given go to SumAmount page
        When I enter 7 and 8 as first amount and second amount
        Then it should display 15 as sum total
