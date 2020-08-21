# Проект 5. Крестики-нолики 2

Крестики-нолики — логическая игра между двумя противниками на квадратном поле 3 на 3 клетки. Один из игроков играет «крестиками», второй — «ноликами».

Игроки по очереди ставят на свободные клетки поля 3х3 знаки (один всегда крестики, другой всегда нолики). Первый, выстроивший в ряд 3 своих фигуры по вертикали, горизонтали или диагонали, выигрывает. Первый ход делает игрок, ставящий крестики.

Обычно по завершении партии выигравшая сторона зачёркивает чертой свои три знака (нолика или крестика), составляющих сплошной ряд.

## Запуск игры

1. запуск сервера:

```sh
cd server/
npm i
npm start
```

2. запуск клиента:

```sh
cd client/
npm i
npm start
```

## Запуск тестов

```sh
cd server/
npm test
```