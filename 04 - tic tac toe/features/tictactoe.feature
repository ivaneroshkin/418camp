#language: en
Feature: Tic-Tac-Toe

  Scenario: Player move
    Given an empty field
    And player 1 is moving
    When the player moves to cell 1, 1
    Then the field becomes "100|000|000"
    When the player moves to cell 2, 2
    Then the field becomes "100|020|000"
    When the player moves to cell 3, 1
    Then the field becomes "101|020|000"

  Scenario: Player move to an occupied cell
    Given the field "100|200|102"
    And player 1 is moving
    When the player moves to cell 1, 2
    Then an error is returned
    And the field becomes "100|200|102"
    When the player moves to cell 2, 2
    Then the field becomes "100|210|102"

  Scenario: Determine winner by vertical
    Given the field "102|120|002"
    And player 1 is moving
    When the player moves to cell 1, 3
    Then the field becomes "102|120|102"
    And player 1 wins

  Scenario: Determine winner by horizontal
    Given the field "101|022|001"
    And player 2 is moving
    When the player moves to cell 1, 2
    Then the field becomes "101|222|001"
    And player 2 wins

  Scenario: Determine winner by diagonal left to right
    Given the field "000|210|201"
    And player 1 is moving
    When the player moves to cell 1, 1
    Then the field becomes "100|210|201"
    And player 1 wins

  Scenario: Determine winner by diagonal right to left
    Given the field "112|120|000"
    And player 2 is moving
    When the player moves to cell 1, 3
    Then the field becomes "112|120|200"
    And player 2 wins

  Scenario: Draw
    Given the field "121|112|202"
    And player 1 is moving
    When the player moves to cell 2, 3
    Then the field becomes "121|112|212"
    And it's a draw
