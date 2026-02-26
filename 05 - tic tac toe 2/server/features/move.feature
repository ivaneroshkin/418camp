#language: en
Feature: Tic-Tac-Toe

  Scenario: Player move
    Given empty field
    And player 1 moves
    When player moves to cell 1, 1
    Then field becomes "100|000|000"
    When player moves to cell 2, 2
    Then field becomes "100|020|000"
    When player moves to cell 3, 1
    Then field becomes "101|020|000"

  Scenario: Player move to occupied cell
    Given field "100|200|102"
    And player 1 moves
    When player moves to cell 1, 2
    Then error is returned
    And field becomes "100|200|102"
    When player moves to cell 2, 2
    Then field becomes "100|210|102"

  Scenario: Determine winner by vertical
    Given field "102|120|002"
    And player 1 moves
    When player moves to cell 1, 3
    Then field becomes "102|120|102"
    And player 1 wins

  Scenario: Determine winner by horizontal
    Given field "101|022|001"
    And player 2 moves
    When player moves to cell 1, 2
    Then field becomes "101|222|001"
    And player 2 wins

  Scenario: Determine winner by diagonal from left to right
    Given field "000|210|201"
    And player 1 moves
    When player moves to cell 1, 1
    Then field becomes "100|210|201"
    And player 1 wins

  Scenario: Determine winner by diagonal from right to left
    Given field "112|120|000"
    And player 2 moves
    When player moves to cell 1, 3
    Then field becomes "112|120|200"
    And player 2 wins

  Scenario: Draw
    Given field "121|112|202"
    And player 1 moves
    When player moves to cell 2, 3
    Then field becomes "121|112|212"
    And draw
