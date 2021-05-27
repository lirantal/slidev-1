Feature: Scaffolder

  Scenario: Scaffold
    When the project is scaffolded
    Then the expected files are generated
    And the framework dependencies are installed
    And the scripts are defined
