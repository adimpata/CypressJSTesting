Feature: End to end store validation

  Scenario: Store products delivery
    Given I open ECommerce Website page
    When I add items to cart
    And I validate the total price of several products
    Then I select the country submit and check the response received

  Scenario: Completing the shopping form
    Given I open ECommerce Website page
    When The form is completed with the details
      | name | gender |
      | bobz | Male |
    Then The form is validated
    And The shop page is selected