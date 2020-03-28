#language: ru
Функционал: Крестики нолики

  Сценарий: Ход игрока
    Дано пустое поле
    И ходит игрок 1
    Если игрок ходит в клетку 1, 1
    То поле становится "100|000|000"
    Если игрок ходит в клетку 2, 2
    То поле становится "100|020|000"
    Если игрок ходит в клетку 3, 1
    То поле становится "101|020|000"

  Сценарий: Ход игрока в заполненную клетку
    Дано поле "100|200|102"
    И ходит игрок 1
    Если игрок ходит в клетку 1, 2
    То возвращается ошибка
    И поле становится "100|200|102"
    Если игрок ходит в клетку 2, 2
    То поле становится "100|210|102"

  Сценарий: определение победителя по вертикали
    Дано поле "102|120|002"
    И ходит игрок 1
    Если игрок ходит в клетку 1, 3
    То поле становится "102|120|102"
    И победил игрок 1

  Сценарий: определение победителя по горизонтали
    Дано поле "101|022|001"
    И ходит игрок 2
    Если игрок ходит в клетку 1, 2
    То поле становится "101|222|001"
    И победил игрок 2

  Сценарий: определение победителя по диагонали слева направо
    Дано поле "000|210|201"
    И ходит игрок 1
    Если игрок ходит в клетку 1, 1
    То поле становится "100|210|201"
    И победил игрок 1

  Сценарий: определение победителя по диагонали справа налево
    Дано поле "112|120|000"
    И ходит игрок 2
    Если игрок ходит в клетку 1, 3
    То поле становится "112|120|200"
    И победил игрок 2

  Сценарий: ничья
    Дано поле "121|112|202"
    И ходит игрок 1
    Если игрок ходит в клетку 2, 3
    То поле становится "121|112|212"
    И ничья
