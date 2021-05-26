Feature: Scaffolder

  Scenario: Scaffold
    When the project is scaffolded
    Then the expected files are generated
    And the scripts are defined
